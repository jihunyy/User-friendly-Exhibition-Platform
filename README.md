# Atelier

## 👪 Teammates
- Team name: **올인원 전시회 플랫폼, 아뜰리에(Atelier)**
- **jihun Lee**: School of Policy in HYU   
- **Jihyun Lee**: School of Information System in HYU 
- **Sunkyu Kim**: School of Business in HYU

## 💡 Prototype
**Overall Flow**
![Image](https://user-images.githubusercontent.com/80081987/171654340-6ddbbaaf-c2c3-4292-a435-ff7201d50657.png)

**Entire Logic**: Overall UI logic for our Atelier service
![Image](https://user-images.githubusercontent.com/80081987/171654399-21958ae2-cf32-4dcb-94b8-fe173c51fea7.png)

**Main Page**: Introduce our all-in-one exhibition platform service, allow user login & logout and starting service
![Image](https://user-images.githubusercontent.com/80081987/171654546-a047d28d-e0c1-4f00-be6e-a44cf52967f9.png)

**Create Page**: Make user's own exhibition during 4 steps
![Image](https://user-images.githubusercontent.com/80081987/171654478-cfb59ae2-3098-4fec-95e5-9c042b98daa2.png)

**Recommend Page**: Get recommended offline exhibition related to user's own exhibition
![Image](https://user-images.githubusercontent.com/80081987/171654600-2b99b899-d32b-4e08-9513-74aa4894c205.png)

**Online Exhibition Page**: List of online exhibitions by others
![Image](https://user-images.githubusercontent.com/80081987/171654668-ebd73601-b5cd-47bf-9fd3-c99a0604d6ef.png)

**Offline Exhibition Page**: List of offline exhibitions by crawling
![Image](https://user-images.githubusercontent.com/80081987/171654704-25fc91ac-65df-4dea-b2fb-c1932a2baaf1.png)

## 🚂 Pipeline
### 1. User sign up and Login at main page
### 2. Make user's own online exhibition or look around at other's
### 3. If you make your exhibition, it consits of 4 steps 
Step 1: Register exhibition titles, posters and hashtags   
Step 2: Register exhibition photos and descriptions   
Step 3: Select exhibition BGM   
Step 4: Select exhibition photo templates
### 4. Check completed exhibitions and recommended offline exhibitions
by KR-WordRank, Konlpy, Gensim with Word2vec, Numpy
