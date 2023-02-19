import re
import os, sys
import numpy as np
import pandas as pd
import kss
from konlpy.tag import Okt
from sklearn.preprocessing import normalize
from sklearn.feature_extraction.text import CountVectorizer
from krwordrank.word import KRWordRank
from krwordrank.sentence import summarize_with_sentences



class KeywordMaker:
    def __init__(self):
        self.countvec = CountVectorizer()
        self.stopwords = []
        stopwords_path = './stopwords-ko.txt'
        with open(stopwords_path, 'r', encoding='UTF-8') as file:
            for line in file:
                self.stopwords.append(line.strip())
                
    
    # 글을 문장 단위로 리턴
    def text2sentences(self, text):
        sentences = kss.split_sentences(text)
        return sentences
    
    
    # 문장에서 명사 추출
    def sentences2nouns(self, sentences):
        nouns = []
        for sentence in sentences:
            for word in Okt().nouns(sentence):
                if word in self.stopwords:
                    continue
                if word in nouns:
                    continue
                nouns.append(word)
        return nouns 
    
    
    # 가중치 그래프 생성
    def build_word_graph(self, sentence):
        countvec_mat = normalize(self.countvec.fit_transform(sentence).toarray().astype(float), axis=0)
        vocab = self.countvec.vocabulary_
        return np.dot(countvec_mat.T, countvec_mat), {vocab[word]: word for word in vocab}
    
    
    # 가중치 그래프에 TextRank 적용
    def get_ranks(self, graph, d=0.85):
        A = graph
        matrix_size = A.shape[0]
        for id in range(matrix_size):
            A[id, id] = 0
            link_sum = np.sum(A[:, id])
            if link_sum != 0:
                A[:, id] /= link_sum
            A[:, id] *= -d
            A[id, id] = 1
            
        B = (1-d) * np.ones((matrix_size, 1))
        ranks = np.linalg.solve(A, B)
        return {idx: r[0] for idx, r in enumerate(ranks)}
    
    
    # TextRank 키워드 선정
    def textrank_keywords(self, text, word_num=100):
        sentences = self.text2sentences(text)
        nouns = self.sentences2nouns(sentences)
        
        word_graph, idx2word = self.build_word_graph(nouns)
        word_rank_idx = self.get_ranks(word_graph)
        sorted_word_rank_idx = sorted(word_rank_idx, key=lambda k: word_rank_idx[k], reverse=True)
        
        keywords = []
        index = []
        
        for idx in sorted_word_rank_idx[:word_num]:
            index.append(idx)
        for idx in index:
            keywords.append(idx2word[idx])
        return keywords
    
    
    # KR-WordRank 키워드 선정
    def wordrank_keywords(self, text):
        sentences = self.text2sentences(text)
        if len(text) <= 50:
            nouns = self.sentences2nouns(sentences)
            return nouns
        
        wordrank_extractor = KRWordRank(
            min_count = 1,
            max_length = 5,
            verbose = True
        )

        beta = 0.85
        max_iter = 50

        keywords, rank, graph = wordrank_extractor.extract(sentences, beta, max_iter)
        return list(keywords)
    
    
    # KR-WordRank 핵심 문장 선정
    def wordrank_keysents(self, text):
        try:
            sentences = self.text2sentences(text)
            penalty = lambda x: 0 if (10 <= len(x) <= 70) else 1
            kw, keysent = summarize_with_sentences(sentences, num_keywords=100, num_keysents=5, penalty=penalty)
            return keysent
        except:
            return None



class Cleaner():
    def __init__(self):
        self.okt = Okt()
        self.stopwords = []
        stopwords_path = './stopwords-ko.txt'
        with open(stopwords_path, 'r', encoding='UTF-8') as file:
            for line in file:
                self.stopwords.append(line.strip())
        
        
    def refine_english(self, text):
        # 영문 제거
        text = re.sub(r'[a-zA-Z]*', '', text)
        return text
    
    
    def refine_keywords(self, keywords):
        try:
            # 형태소 분석 및 어간 추출
            morph_kw = []
            for kw in keywords:
                morph = self.okt.morphs(kw, stem=True)
                morph_kw.append(morph)
            morph_kw = list(np.concatenate(np.array(morph_kw).flatten()))  

            # 숫자, 불용어, 불필요한 품사 제거
            refined_kw = []
            for kw in morph_kw:
                pos = self.okt.pos(kw)
                if pos[0][0].isdigit(): continue
                if pos[0][0] in self.stopwords: continue
                if pos[0][1] in ['Adjective', 'Adverb', 'Josa', 'Punctuation', 'Foreign']: continue
                refined_kw.append(pos[0][0])

            # 중복 요소 제거
            final_kw = []
            for kw in refined_kw:
                if kw not in final_kw and len(kw) > 1:
                    final_kw.append(kw)

            if len(final_kw) < 30: return final_kw
            else: return final_kw[:30]
        except:
            return None                         



if __name__ == "__main__":
    # 전시회 정보 불러오기
    filename = ''
    data = pd.read_csv(f'./{filename}', encoding='cp949')
    
    
    # 키워드 추출
    data['설명'] = data['설명'].apply(Cleaner().refine_english)
    
    sys.stdout = open(os.devnull, 'w')
    data['키워드'] = data['설명']
    data['키워드'] = data['키워드'].apply(KeywordMaker().wordrank_keywords)
    data['키워드'] = data['키워드'].apply(Cleaner().refine_keywords)
    data = data.dropna(subset=['키워드'])
    sys.stdout = sys.__stdout__

    data['요약'] = data['설명']
    data['요약'] = data['요약'].apply(KeywordMaker().wordrank_keysents)

    
    # 키워드 정보 저장
    data.to_csv(f'./키워드{filename[4:]}', encoding='utf-8-sig', index=False)
    print(f' {filename} 키워드 추출이 완료되었습니다!')