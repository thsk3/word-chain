# 끝말잇기 게임
<p align="center"><img width="500" alt="image" src="https://github.com/user-attachments/assets/289168f2-070c-4deb-adba-6a84fb9f2f1a"></p>
<p align="center"><img width="500" alt="image" src="https://github.com/user-attachments/assets/028161e5-ca95-4792-a111-9b923db5b82d"></p>
<p align="center"><img width="500" alt="image" src="https://github.com/user-attachments/assets/ba071e3f-d7c8-4923-a602-fc92dfc67793"></p>

## 1. 게임 규칙
  - 제한시간(10초) 이내에 제시된 단어의 마직막 글자로 시작하는 단어를 입력한다.
  - 단어의 길이는 2글자 이상이어야 한다.
  - 단어의 품사는 명사여야 한다.
  - 잘못된 단어를 입력해도 3번은 봐주며 다음과 같은 상황에서 소모된다. 
    - 중복된 단어 입력
    - 존재하지 않는 단어를 입력
    - 제한 시간 초과
  - 단어를 올바르게 이었거나 틀리면 점수 가산, 감산이 된다.
    - 올바른 단어 입력시 +10점
    - 중복된 단어 입력시 -10점
    - 없는 단어 입력시 -30점
  - 두음 법칙이 적용된다.
    - 두음 법칙이 적용되는 마지막 글자는 단어 옆에 두음법칙이 적용된 글자가 함께 표시된다.
## 2. CORS 에러 해결법
크롬 확장 프로그램 Allow CORS:Access-Control-Allow-Origin 활용
- 로컬 환경에서만 테스트할 것이기 때문에 이를 활용했다.
- 서버 신경쓸 필요 없이 다음 링크에서 설치하고 활성화만 시켜주면 된다.
- <a href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?utm_source=ext_app_menu">설치 링크</a>
<img width="887" alt="image" src="https://github.com/user-attachments/assets/3d37e7da-84e9-4bbb-9581-2011de26923e">
<img width="300" alt="image" src="https://github.com/user-attachments/assets/e76e1f03-d23b-4f11-8ce5-b2c35788c667">
<img width="300" alt="image" src="https://github.com/user-attachments/assets/224b3725-d3a5-4b1f-affd-3cd386a9f73f">

## 3. API
### key 발급 방법
  - <a href="https://stdict.korean.go.kr/openapi/openApiInfo.do">국입국어원 표준국어대사</a>
  - 링크에서 회원 가입 후 키 발급 
