import re
import sys
import time
import numpy as np
import pandas as pd
import gensim
from embedding import WordVector
from uploading import Uploader



class Finder():
    def __init__(self, user_tags, embedding, embedding_type):
        self.user_tags = user_tags        
        
        if embedding_type == 1:
            self.word2vec_model = embedding.word2vec_model
        elif embedding_type == 2:
            self.fasttext_model = embedding.fasttext_model
        elif embedding_type == 3:
            self.glove_model = embedding.glove_model
        
        
    def cos_sim(self, a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    
    def compare_word2vec(self, embeddings):
        score = 0
        cnt = 0
        
        for tag in self.user_tags:
            try:
                vector = self.word2vec_model.wv[tag]
                
                for embedding in embeddings:
                    if cnt == 5: break
                    if len(embedding) == 1: continue
                    else:
                        sim = self.cos_sim(vector, embedding)
                        score += sim * (1-cnt*0.2)
                        cnt += 1
            except:
                continue
        return score
                   
        
    def compare_fasttext(self, embeddings):
        score = 0
        cnt = 0
        
        for tag in self.user_tags:
            try:
                vector = self.fasttext_model.wv[tag]
                
                for embedding in embeddings:
                    if cnt == 5: break
                    if len(embedding) == 1: continue
                    else:
                        sim = self.cos_sim(vector, embedding)
                        score += sim * (1-cnt*0.2)
                        cnt += 1
            except:
                continue
        return score
    
    
    def compare_glove(self, embeddings):
        score = 0
        cnt = 0
        
        for tag in self.user_tags:
            try:
                vector = self.glove_model[tag]
                
                for embedding in embeddings:
                    if cnt == 5: break
                    if len(embedding) == 1: continue
                    else:
                        sim = self.cos_sim(vector, embedding)
                        score += sim * (1-cnt*0.2)
                        cnt += 1
            except:
                continue
        return score
    
    
    def recommend_exhibition(self, data, embedding_col):
        embedding_col = list(embedding_col)
        recommend_idx1 = embedding_col.index(max(embedding_col))
        #recommend_idx2 = embedding_col.index(sorted(set(embedding_col), reverse=True)[1])
        return data.iloc[recommend_idx1]



if __name__ == "__main__":
    # 오프라인 전시회 정보 불러오기
    uploader = Uploader()
    data = uploader.get_all_info('offline_exhibition')
    
    
    # 온라인 전시회 정보 가져오기
    userid   = sys.argv[1]     # 해당 유저 id
    onlineid = sys.argv[2]     # 해당 온라인 전시회 id
    tag1 = sys.argv[3]         # 해당 온라인 전시회 태그 3개
    tag2 = sys.argv[4]
    tag3 = sys.argv[5]
    
    
    # 사용자 태그에 따른 전시회 추천
    embedding_type = int(sys.argv[6])
    user_tag = [tag1, tag2, tag3]
    
    if embedding_type == 1:
        embedding        = WordVector(1)
        recommender      = Finder(user_tag, embedding, embedding_type)
        data['word2vec'] = data['keyword']
        data['word2vec'] = data['word2vec'].apply(embedding.word2vec_vectors)
        data['word2vec'] = data['word2vec'].apply(recommender.compare_word2vec)
        recommended = recommender.recommend_exhibition(data, data['word2vec'])
        
    elif embedding_type == 2:
        embedding        = WordVector(2)
        recommender      = Finder(user_tag, embedding, embedding_type)
        data['fasttext'] = data['keyword']
        data['fasttext'] = data['fasttext'].apply(embedding.fasttext_vectors)
        data['fasttext'] = data['fasttext'].apply(recommender.compare_fasttext)
        recommended = recommender.recommend_exhibition(data, data['fasttext'])
        
    elif embedding_type == 3:
        embedding     = WordVector(3)
        recommender   = Finder(user_tag, embedding, embedding_type)
        data['glove'] = data['keyword']
        data['glove'] = data['glove'].apply(embedding.glove_vectors)
        data['glove'] = data['glove'].apply(recommender.compare_glove)
        recommended = recommender.recommend_exhibition(data, data['glove'])

    
    # 추천된 전시회 DB 업로드
    recommended['keyword'] = re.sub(r'[\[\]\']', '', recommended['keyword'])
    uploader.upload_recommend(userid, recommended)