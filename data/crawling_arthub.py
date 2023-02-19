import re
import time
import pandas as pd
from datetime import date
from selenium import webdriver



# 전시회 크롤링: 아트허브
def crawling_arthub():
    # 드라이버 실행
    options = webdriver.ChromeOptions()
    options.headless = True
    options.add_argument('--incognito')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-setuid-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    driver = webdriver.Chrome('chromedriver.exe', options=options)     
    driver.implicitly_wait(3)
    
    
    # 그날 크롤링한 전시회 목록
    list_title      = []
    list_link       = []
    list_start_date = []
    list_end_date   = []
    list_locate     = []
    list_place      = []
    list_poster     = []
    list_descript   = []
    

    # 아트허브 - 현재전시 접속
    arthub_link = 'https://www.arthub.co.kr/sub01/board01_list.htm'
    driver.get(arthub_link)
    time.sleep(1)
    
    
    # 주소 정보 크롤링
    list_url = []
    i = 0
    while True:
        num = i*3 + 1
        try:
            link = driver.find_element_by_css_selector(f'body > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child({num}) > td > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1) > span > a').get_attribute('href')
            list_url.append(link)
            i += 1
        except:
            break
            
            
    # 전시회 정보 크롤링
    for link in list_url:
        driver.get(link)
        time.sleep(1)

        title = driver.find_element_by_xpath('/html/body/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td/table/tbody/tr[4]/td[2]/table/tbody/tr/td/table/tbody/tr[1]/td[2]/span').text
        dates = driver.find_element_by_xpath('/html/body/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td/table/tbody/tr[4]/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[2]/td[3]').text
        start_date, end_date = separate_dates(dates)

        locate = driver.find_element_by_xpath('/html/body/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td/table/tbody/tr[4]/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[6]/td[3]').text
        place = driver.find_element_by_xpath('/html/body/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td/table/tbody/tr[4]/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[5]/td[3]').text
        place = separate_place(place)
        
        try:
            poster = driver.find_element_by_xpath('/html/body/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td/table/tbody/tr[4]/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[3]/a').get_attribute('href')
        except:
            try:
                poster = driver.find_element_by_xpath('/html/body/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr[4]/td[2]/table/tbody/tr/td/p[2]/img').get_attribute('src')
            except:
                poster = None
        
        
        # 전시회 설명 크롤링
        descript = ''    
        num = 6
        passcnt = 0
        while True:
            if passcnt >= 5: break
            try:
                current = driver.find_element_by_css_selector(f'body > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td > p:nth-child({num})').text
                if ('『' not in current) and ('▶' not in current) and ('●' not in current) and ('▲' not in current):
                    descript += ' ' + current.strip()
                num += 1
            except:
                num += 1
                passcnt += 1
                pass
        
        
        # 전시회 크롤링 저장
        list_title.append(title)
        list_link.append(link)
        list_start_date.append(start_date)
        list_end_date.append(end_date)
        list_locate.append(locate)
        list_place.append(place)
        list_poster.append(poster)
        list_descript.append(descript)
        print(f' 전시회명 "{title}" 크롤링 완료.')
        
    
    # 그날 크롤링한 전시회 목록 저장
    driver.quit()
    exhibition_arthub = pd.DataFrame({'제목': list_title, '주소': list_link, '시작날짜': list_start_date, '종료날짜': list_end_date,
                                      '위치': list_locate, '장소': list_place, '포스터': list_poster, '설명': list_descript})
    return exhibition_arthub



# 기초 전처리
def separate_dates(dates):
    dates = re.sub(r' ', '', dates)
    dates = re.sub(r'-', '', dates)
    dates = re.sub(r'▶', '', dates)
    
    start_date = dates[:8]
    end_date = dates[8:]
    if end_date == '미정':
        end_date = None
    elif end_date == '상시운영':
        end_date = '010101'
    return start_date, end_date

def separate_place(place):
    place = re.sub(r'다른전시 보기', '', place)
    place = re.sub(r'\([^)]*\)', '', place)
    return place.strip()

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
    # 아트허브 전시회 크롤링
    today = get_today()
    print(f' 아트허브 {today} 크롤링을 시작합니다...')
    exhibition_arthub = crawling_arthub()


    # 아트허브 전시회 저장
    exhibition_arthub.to_csv(f'./아트허브_{today}_크롤링.csv', encoding='utf-8-sig', index=False)
    print(f' 아트허브 {today} 크롤링이 완료되었습니다!')
