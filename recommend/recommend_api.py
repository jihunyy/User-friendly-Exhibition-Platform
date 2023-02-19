import re
from embedding import WordVector
from comparing import Finder
from uploading import Uploader
from flask import Flask, request
app = Flask(__name__)



@app.route('/', methods=['POST'])
def recommend_exhibition():
    # 온라인 전시회 정보 가져오기
    args = request.get_json()
    onlineid = args['onlineid']     # 해당 온라인 전시회 id
    tag1     = args['tag1']         # 해당 온라인 전시회 태그 3개
    tag2     = args['tag2']
    tag3     = args['tag3']
        
    # 사용자 태그에 따른 전시회 추천
    user_tags = [tag1, tag2, tag3]
    
    recommender      = Finder(user_tags, embedding, 1)
    data['word2vec'] = data['keyword']
    data['word2vec'] = data['word2vec'].apply(embedding.word2vec_vectors)
    data['word2vec'] = data['word2vec'].apply(recommender.compare_word2vec)
    recommended = recommender.recommend_exhibition(data, data['word2vec'])
    '''
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
    '''

    # 추천된 전시회 DB 업로드
    recommended['keyword'] = re.sub(r'[\[\]\']', '', recommended['keyword'])
    uploader.upload_recommend(onlineid, recommended)
    return '플라스크로 추천된 전시회를 DB에 업로드하였습니다.'

@app.route('/recommended-exhibition-without-db', methods=['POST'])
def recommend_exhibition_without_db():
    # 온라인 전시회 정보 가져오기
    args = request.get_json()
    tag1     = args['tag1']         # 해당 온라인 전시회 태그 3개
    tag2     = args['tag2']
    tag3     = args['tag3']
        
    # 사용자 태그에 따른 전시회 추천
    user_tags = [tag1, tag2, tag3]
    
    recommender      = Finder(user_tags, embedding, 1)
    data['word2vec'] = data['keyword']
    data['word2vec'] = data['word2vec'].apply(embedding.word2vec_vectors)
    data['word2vec'] = data['word2vec'].apply(recommender.compare_word2vec)
    recommended = recommender.recommend_exhibition(data, data['word2vec'])
    '''
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
    '''
    return recommended.to_dict()



if __name__ == "__main__":
    # 오프라인 전시회 정보 불러오기
    uploader = Uploader()
    data = uploader.get_all_info('offline_exhibition')
    
    
    # 사전훈련된 word2vec
    embedding = WordVector(1)
    
        
    # 플라스크 앱 실행
    app.run(host='0.0.0.0', port=8000)
