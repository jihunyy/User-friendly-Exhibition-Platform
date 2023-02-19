import numpy as np



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