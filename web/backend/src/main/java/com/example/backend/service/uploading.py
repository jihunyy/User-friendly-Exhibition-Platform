import pandas as pd
import pymysql



class Uploader():
    def __init__(self):
        self.host     = 'atelier.caejnedfdhpl.ap-northeast-2.rds.amazonaws.com'
        self.user     = 'admin'
        self.password = 'dltmddusqkqh12'
        self.db       = 'atelier1'
        self.connection, self.cursor = self.connect_db()
        
        
    # MySQL 디비 연동
    def connect_db(self):
        connection = pymysql.connect(     
            host     = self.host,
            user     = self.user,
            password = self.password,
            db       = self.db,
            charset  = 'utf8'
        )
        cursor = connection.cursor(pymysql.cursors.DictCursor)         
        return connection, cursor
    
    
    # 데이터 업로드
    def upload_data(self, data):
        for i in range(len(data)):
            # 전시회 정보
            title      = data['제목'][i]
            link       = data['주소'][i]
            start_date = data['시작날짜'][i]
            end_date   = data['종료날짜'][i]
            locate     = data['위치'][i]
            place      = data['장소'][i]
            poster     = data['포스터'][i]
            descript   = data['설명'][i]
            keyword    = data['키워드'][i]
            
            # SQL 작성으로 업로드
            sql = "INSERT INTO offline_exhibition (title, link, start_date, end_date, locate, place, poster, descript, keyword)                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            self.cursor.execute(sql, (title, link, start_date, end_date, locate, place, poster, descript, keyword))
            self.connection.commit()
        
        
    # 추천 결과 업로드
    def upload_recommend(self, userid, recommended):
        # 추천된 전시회 정보
        userid     = userid,                # 해당 유저 id
        onlineid   = recommended['id'],     # 해당 온라인 전시회 id 
        title      = recommended['title'],
        link       = recommended['link'],
        start_date = recommended['start_date'],
        end_date   = recommended['end_date'],
        locate     = recommended['locate'],
        place      = recommended['place'],
        poster     = recommended['poster'],
        descript   = recommended['descript'],
        keywords   = recommended['keyword'],

        # SQL 작성으로 업로드
        sql = "INSERT INTO recommended (userid, onlineid, title, link, start_date, end_date, locate, place, poster, descript, keywords)               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        self.cursor.execute(sql, (userid, onlineid, title, link, start_date, end_date, locate, place, poster, descript, keywords))
        self.connection.commit()
        
        
    # 모든 전시회 불러오기
    def get_all_info(self, table):      
        # SQL 작성으로 불러옴
        sql = f"SELECT * FROM {table}"
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        return pd.DataFrame(data)
        
        
    # 디비 모든 테이블 확인
    def show_all_tables(self):
        sql = "SHOW TABLES"
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        print(result)
        
        
    # 특정 테이블 모든 데이터 제거
    def remove_table_rows(self, table):
        sql = f"TRUNCATE TABLE {table}"
        self.cursor.execute(sql)
        self.connection.commit()



if __name__ == "__main__":
    # 데이터 통합
    #data1 = pd.read_csv(f'./임베딩_아트허브_220404_크롤링.csv')
    #data2 = pd.read_csv(f'./임베딩_인터파크_220418_크롤링.csv')
    #data2 = data2.drop(['설명 번호'], axis=1)
    #data = pd.concat([data1, data2], ignore_index=True)
    #data = data.drop(['요약', 'word2vec', 'fasttext', 'glove'], axis=1)
    #data.to_csv('./DB_220404_220418_크롤링.csv', encoding='utf-8-sig', index=False)
    
    
    # 전시회 정보 불러오기
    #data = pd.read_csv('./DB_220404_220418_크롤링.csv')
    
    
    # 모든 오프라인 전시회 DB 업로드
    #uploader = Uploader()
    #uploader.upload_data(data)