import re
import pandas as pd
from kss import split_sentences
from pykospacing import spacing
from hanspell import spell_checker



class Remover:
    def __init__(self, **kwargs):
        super(Remover, self).__init__(**kwargs)
        
    
    # 공백 제거
    def remove_space(self, text):
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'^\s+', '', text)
        text = re.sub(r'\t', ' ', text)
        text = re.sub(r'\n', ' ', text)
        text = re.sub(r'\r', ' ', text)
        return text
    
    
    # 괄호 안 제거
    def remove_brackets(self, text):
        text = re.sub(r'\([^)]*\)', '', text) 
        text = re.sub(r'\{[^}]*\}', '', text)
        text = re.sub(r'\[[^]]*\]', '', text)
        text = re.sub(r'\<[^>]*\>', '', text)
        return text
    
    
    # 특수문자 제거
    def remove_special_characters(self, text):
        text = re.sub(r'\n\n', ' ', text)
        text = re.sub(r'ⓒ', '', text)
        text = re.sub(r'작가노트', '', text)
        text = re.sub(r'|', '', text)
        text = re.sub(r'\[', '', text)
        text = re.sub(r'\]', '', text)
        text = re.sub(r'-  발췌', '', text)
        return text
    
    
    # url 제거
    def remove_url(self, text):
        text = re.sub(r'링크 :', '', text)
        text = re.sub(r'http[s]?://(?:[\t\n\r\f\v]|[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text) 
        text = re.sub(r'[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)', '', text) 
        return text
    
    
    # 한자 제거
    def remove_chinese(self, text):
        text = re.sub(r'[一-龥]+', '', text)
        return text

        
    # 맞춤법 교정
    def clean_text(self, text):
        sentences = split_sentences(text)
        result = spell_checker.check(sentences)
        text = ''
        for i in range(len(result)):
            text += result[i].checked
        return text



class Denoiser():
    def __init__(self, **kwargs):
        super(Denoiser, self).__init__(**kwargs)
        
        
    # 텍스트(제목) 전처리: 아트허브
    def denoise_arthub_title(self, text):
        idx = text.find(':')
        if idx == -1:
            pass
        else:
            text = text[:idx]

        if len(text) <= 4: return text
        idx = text.find('-')
        if idx == -1:
            pass
        else:
            text = text[:idx]
        return text.strip()
    
    
    # 텍스트(날짜) 전처리
    def denoise_date(self, text):
        text = re.sub(r'~', '', text)
        if pd.isna(text) or text == '미정': return '999998'           # 미정
        if text == '런': return '999997'                              # 오픈런
        if text == '10101' or text == '상시운영': text = '999999'     # 상시운영
        text = int(text)
        text = str(text)
        if len(text) == 8: text = text[2:]
        return text
        
    
    # 텍스트(위치) 전처리
    def denoise_locate(self, text):
        if pd.isna(text): return text
        text = re.sub(r'\([^)]*\)', '', text)
        text = re.sub(r'지도 보기  ⓘ', '', text)
        return text.strip()
    
    
    # 텍스트(장소) 전처리: 인터파크
    def denoise_interpark_place(self, text):
        if pd.isna(text): return text
        text = eval(text)
        new_text = ''
        for ch in text:
            new_text += ch + ' '
        return new_text.strip()
        
        
    # 텍스트(설명) 전처리: 아트허브
    def denoise_arthub_descript(self, text):
        if len(text) != 0:
            text = Remover().remove_space(text)
            text = Remover().remove_brackets(text)
            text = Remover().remove_special_characters(text)
            text = Remover().remove_url(text)
            text = Remover().remove_chinese(text)
            text = spacing(text)
        return text.strip()
        
        
    # 텍스트(설명) 전처리: 인터파크
    def denoise_interpark_descript(self, text):
        if len(text) != 0:
            text = Remover().remove_space(text)
            text = Remover().remove_brackets(text)
            try:
                text = Remover().clean_text(text)        
            except:
                pass
            text = spacing(text)
        return text.strip()



if __name__ == "__main__":
    # 전시회 정보 불러오기
    filename = ''
    data = pd.read_csv(f'./{filename}')
    
    
    # 설명 결측값 제목으로 대체
    empty_idx = list(data['설명'][data['설명'].isnull()].index)
    for idx in empty_idx:
        data['설명'][idx] = data['제목'][idx]
    
    
    # 텍스트 전처리
    data['시작날짜'] = data['시작날짜'].apply(Denoiser().denoise_date)
    data['종료날짜'] = data['종료날짜'].apply(Denoiser().denoise_date)
    data['위치']     = data['위치'].apply(Denoiser().denoise_locate)
    
    if '아트허브' in filename:
        data['제목'] = data['제목'].apply(Denoiser().denoise_arthub_title)
        data['설명'] = data['설명'].apply(Denoiser().denoise_arthub_descript)
    elif '인터파크' in filename:
        data['장소'] = data['장소'].apply(Denoiser().denoise_interpark_place)
        data['설명'] = data['설명'].apply(Denoiser().denoise_interpark_descript)
        
        
    # 전처리된 정보 저장
    data.to_csv(f'./전처리_{filename}', encoding='utf-8-sig', index=False)
    print(f' {filename} 전처리가 완료되었습니다!')
