## 면접어때 프로젝트 소개 
‘면접어때’는 개발자를 위한 면접 준비 플랫폼입니다. 이 서비스는 OpenAI API를 활용하여 사용자가 선택한 포지션과 스킬 또는 원티드 채용 공고 URL을 기반으로 적합한 면접 질문을 10개 생성합니다.
사용자가 질문에 답변하면 ‘면접어때’는 피드백을 제공하여 면접 스킬을 향상 시키는데 도움을 줍니다.

## 개발 기간 
   
- 2023.08.01 ~진행중 (FE2,BE1)



### 🛠 개발 환경 
- Node.js
- TypeScript
- Framework : Nest.js
- Database : MySQL
- Docker
- Github Actions



## 설치 및 실행방법
1.설치 방법
```
$ git clone https://github.com/myeonjeobeottae/server.git
$ cd mjproject 
$ yarn install
```

2.환경변수 설정
```
 cat .env.dev

NODE_ENV=development
PORT=3000
HOST=localhost
DATABASE_HOST=<YOUR MYSQL_HOST>
DATABASE_USER=<YOUR MYSQL>
DATABASE_NAME=<YOUR MYSQL>
DATABASE_PASSWORD=<YOUR MYSQL_PASSWORD>
DATABASE_PORT=<YOUR MYSQL_PORT>
DATABASE_TYPE=mysql
OPENAI_API_KEY=<YOUR OPENAI_API_KEY>
KAKAO_CLIENT_ID=<YOUR kakao Client ID>
KAKAO_REDIRECTURL=<YOUR Redirect URL>
JWT_SECRET_KEY=<YOUR JWT SECRET KEY>
```

3.실행 방법
```
yarn start

docker-compose -f docker-compose-dev.yml up -d --build 
```

## ERD
![스크린샷 2024-01-15 오후 4 48 07](https://github.com/myeonjeobeottae/server/assets/105371325/0344020e-b4ba-460d-8db7-a021b462e986)


## Swagger API 명세 
http://localhost:3000/api <br>
https://interviewee.store/api
