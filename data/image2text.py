import os
import time
import numpy as np
import cv2
from PIL import Image
import pytesseract



# 텍스트 추출 클래스
class TextGenerator:
    def __init__(self, img_url):        
        self.img_src = self.download_img(img_url)                 # 이미지 저장 경로
        self.img = cv2.imread(self.img_src, cv2.IMREAD_COLOR)     # 이미지 로드
        self.height, self.width = self.get_imgsize()              # 이미지 세로, 가로 길이
        self.tesseract_src = r'C:\Program Files\Tesseract-OCR\tesseract'     # tesseract 절대경로
        
        
    # 이미지 다운로드 및 저장 경로 설정
    def download_img(self, img_url):
        os.system('curl ' + img_url + ' > now_image.jpg')
        img = Image.open('./now_image.jpg')
        img_src = './now_image.jpg'
        time.sleep(1)
        return img_src
    
    
    # 이미지 길이 리턴
    def get_imgsize(self):
        height, width, channel = self.img.shape
        return height, width
    
    
    # 이미지 잘라서 텍스트 추출
    def slice_img(self, title):
        global img_cut, i
        sliced_num = self.height // 700
        descript = ''
        cropped_num = []                                  # 자른 이미지 번호
        createFolder(f'./interpark descript/{title}')     # 자른 이미지 저장 경로

        # 이미지 자르기
        for i in range(sliced_num+1):
            if i == sliced_num:
                img_cut = self.img[i*700:, 0:self.width]
            else:
                img_cut = self.img[i*700:(i+1)*700, 0:self.width]
            imwrite(f'./interpark descript/{title}/cropped_{i}.jpg', img_cut)

            # 영역 선택
            cv2.imshow('image cutting', img_cut)
            cv2.setMouseCallback('image cutting', onMouse)
            cv2.waitKey()
            cv2.destroyAllWindows()
            time.sleep(1)
            
            # 선택한 영역에서 텍스트화
            cropped_descript = None
            try:
                cropped_descript = self.image2string(f'./cropped_{i}.jpg')
                #print(f' 추출된 설명: {cropped_descript}\n')
                descript += ' ' + cropped_descript.strip()
                cropped_num.append(i)
            except:
                pass
        return descript, sliced_num+1, cropped_num
                
               
    # 이미지 내 텍스트 추출
    def image2string(self, img_src):
        pytesseract.pytesseract.tesseract_cmd = self.tesseract_src
        img = cv2.imread(img_src)
        try:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        except:
            pass
        try:
            img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        except:
            pass

        config = ('-l kor --oem 3 --psm 3')
        return pytesseract.image_to_string(img, config=config)


    
# 자른 이미지 저장 관련
def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        pass    
    
def imwrite(filename, img, params=None):
    try:
        ext = os.path.splitext(filename)[1]
        result, n = cv2.imencode(ext, img, params)
        
        if result:
            with open(filename, mode='w+b') as f:
                n.tofile(f)
            return True
        else:
            return False        
    except Exception as e:
        pass
        return False
    
    
    
# ROI 지정
isDragging = False            
x0, y0, w, h = -1,-1,-1,-1    
blue, red = (255,0,0), (0,0,255)  

def onMouse(event, x, y, flags, param):   
    global img_cut     # 잘라낸 이미지
    global isDragging, x0, y0, i
    
    # 드래그 시작
    if event == cv2.EVENT_LBUTTONDOWN:  
        isDragging = True
        x0 = x
        y0 = y
        
    # 드래그 진행
    elif event == cv2.EVENT_MOUSEMOVE:  
        if isDragging:                  
            img_draw = img_cut.copy()       
            cv2.rectangle(img_draw, (x0, y0), (x, y), blue, 2) 
            cv2.imshow('img', img_draw) 
    
    # 드래그 중지
    elif event == cv2.EVENT_LBUTTONUP:  
        if isDragging:                
            isDragging = False          
            w = x - x0     # 드래그 영역 폭 
            h = y - y0     # 드래그 영역 높이 
            #print(" 잘려진 영역 x:%d, y:%d, w:%d, h:%d" % (x0, y0, w, h))
            
            if w > 0 and h > 0:         
                img_draw = img_cut.copy()   
                cv2.rectangle(img_draw, (x0, y0), (x, y), red, 2) 
                cv2.imshow('img', img_draw) 
                
                roi = img_cut[y0:y0+h, x0:x0+w] 
                cv2.imshow('cropped', roi)  
                cv2.moveWindow('cropped', 0, 0) 
                cv2.imwrite(f'./cropped_{i}.jpg', roi)   
            else:
                pass
