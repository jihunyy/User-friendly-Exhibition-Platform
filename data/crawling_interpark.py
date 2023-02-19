import os
import re
import time
import pandas as pd
from datetime import date
from selenium import webdriver
from image2text import TextGenerator



# 전시회 크롤링: 인터파크
def crawling_interpark():
    # 드라이버 실행
    options = webdriver.ChromeOptions()
    options.headless = True
    options.add_argument('--incognito')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-setuid-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    
    global driver
    driver = webdriver.Chrome('chromedriver.exe', options=options)     
    driver.implicitly_wait(3)
    
    
    # 그날 크롤링한 전시회 목록
    list_title       = []
    list_link        = []
    list_start_date  = []
    list_end_date    = []
    list_locate      = []
    list_place       = []
    list_poster      = []
    list_descript    = []
    list_cropped_num = []


    # 인터파크 - 전시/행사 접속
    interpark_link = 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Eve&SubCa=Eve_O&Sort=4'
    driver.get(interpark_link)
    time.sleep(1)
    
    
    # 주소 정보 크롤링
    list_url = []
    i = 1
    while True:
        try:
            link = driver.find_element_by_xpath(f'/html/body/table/tbody/tr[2]/td[3]/div/div/div[2]/div/table/tbody/tr[{i}]/td[2]/span/a').get_attribute('href')
            list_url.append(link)
            i += 1
        except:
            break
            
            
    # 전시회 정보 크롤링
    for link in list_url:
        driver.get(link)
        time.sleep(1)

        # 팝업 제거
        try:
            popup = driver.find_element_by_xpath('//*[@id="popup-prdGuide"]/div/div[3]/button')
            popup.click()
        except:
            pass
        
        title = driver.find_element_by_xpath('//*[@id="container"]/div[5]/div[1]/div[2]/div[1]/div/div[1]/h2').text
        dates = driver.find_element_by_xpath('//*[@id="container"]/div[5]/div[1]/div[2]/div[1]/div/div[2]/ul/li[2]/div/p').text
        start_date, end_date = separate_dates(dates)

        try:
            place = driver.find_element_by_xpath('//*[@id="container"]/div[5]/div[1]/div[2]/div[1]/div/div[2]/ul/li[1]/div/a').text
            place = separate_place(place)
        except:
            place = None
        if place == '온라인': locate = '온라인'
        else: locate = find_locate()
            
        try:     # 에러 대비 try
            try:
                poster = driver.find_element_by_xpath('//*[@id="container"]/div[5]/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/img').get_attribute('src')
            except:
                poster = None


            # 전시회 설명 크롤링
            try:
                descript_poster = driver.find_element_by_xpath('//*[@id="productMainBody"]/div/div/div/p/strong/img').get_attribute('src')
            except:
                try:
                    descript_poster = driver.find_element_by_xpath('//*[@id="productMainBody"]/div/div/div/p/img').get_attribute('src')
                except:
                    descript_poster = None

            if descript_poster != None:
                TG = TextGenerator(descript_poster)
                descript, sliced_num, cropped_num = TG.slice_img(title)


                # 잘려진 기존 이미지 삭제
                for i in range(sliced_num):
                    cropped_src = os.getcwd() + f'/cropped_{i}.jpg'
                    try:
                        os.remove(cropped_src)
                    except:
                        pass
            else:
                descript = None
                cropped_num = []
        except:
            poster      = None
            descript    = None
            cropped_num = None
        
        
        # 전시회 크롤링 저장
        list_title.append(title)
        list_link.append(link)
        list_start_date.append(start_date)
        list_end_date.append(end_date)
        list_locate.append(locate)
        list_place.append(place)
        list_poster.append(poster)
        list_descript.append(descript)
        list_cropped_num.append(cropped_num)
        print(f' 전시회명 "{title}" 크롤링 완료.')
        
    
    # 그날 크롤링한 전시회 목록 저장
    driver.quit()
    exhibition_interpark = pd.DataFrame({'제목': list_title, '주소': list_link, '시작날짜': list_start_date, '종료날짜': list_end_date,
                                         '위치': list_locate, '장소': list_place, '포스터': list_poster, '설명': list_descript, '설명 번호': list_cropped_num})
    return exhibition_interpark



# 기초 전처리
def separate_dates(dates):
    dates = re.sub(r' ', '', dates)
    dates = re.sub(r'\.', '', dates)
    dates = re.sub(r'~', '', dates)
    
    start_date = dates[:8]
    end_date = dates[8:]
    return start_date[2:], end_date[2:]

def separate_place(place):
    place = re.sub(r'\(자세히\)', '', place)
    return place.split()

def find_locate():
    global driver
    try:
        triangle_in = driver.find_element_by_xpath('//*[@id="container"]/div[5]/div[1]/div[2]/div[1]/div/div[2]/ul/li[1]/div/a/i').click()
        time.sleep(1)
        locate = driver.find_element_by_xpath('//*[@id="popup-info-place"]/div/div[2]/div/div[2]/p/span').text
        triangle_out = driver.find_element_by_xpath('//*[@id="popup-info-place"]/div/div[1]/button').click()
    except:
        locate = '정보 없음'
    return locate

# 오늘 날짜 불러오기
def get_today():
    today = date.today()
    year = str(today.year)
    mon = str(today.month)
    
    if int(mon) < 10:
        mon = '0' + str(mon)
    day = str(today.day)
    if int(day) < 10:
        day = '0' + str(day)
    return year[2:]+mon+day



if __name__ == "__main__":
    # 인터파크 전시회 크롤링
    today = get_today()
    print(f' 인터파크 {today} 크롤링을 시작합니다...')
    exhibition_interpark = crawling_interpark()


    # 인터파크 전시회 저장
    exhibition_interpark.to_csv(f'./인터파크_{today}_크롤링.csv', encoding='utf-8-sig', index=False)
    print(f' 인터파크 {today} 크롤링이 완료되었습니다!')
