# 감정 일기장
> 오늘 하루 감정을 담아 일기를 작성 할 수 있다.

<br />

# 링크

[gh-pages 배포](https://kimoony.github.io/my-emotion-diary/)  
[firebase 배포](https://kimoony-udemy-project.web.app)

<br />

# 기능사항

- 일기 작성
- 일기 수정
- 일기 삭제
- 일기 최신순/과거순 혹은 좋은/나쁜감정 필터

<br />

# 개발환경 및 기술스택

- node: v16.13.2  
- npm: 8.1.2  
- HTML, CSS, JavaScript
- React
- firebase
  - hosting


<br />

# 배포
- GitHub
  - `package.json` scripts 수정
    ```js
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "deploy": "gh-pages -d build",
      "predeploy": "npm run build"
    },
    ```
  - gh-pages 설치
    ```zsh
    $ npm install gh-pages --save-dev
    ```
  - `.env.local` 파일 만들고 GitHub token 입력  
  [참고](https://yakjeon.tistory.com/99)
  - GitHub Repository 에 gh-pages branch 생성
  - 루트 디렉토리에서 npm run deploy 실행  

- firebase
  - 빌드하기
    ```zsh
    $ npm run build
    ``` 
  - [firebase](https://firebase.google.com/) 접속
  - 메인 화면에 시작하기 > 프로젝트 추가 > 프로젝트 명 입력
  - hosting 에 들어가서 시작하기 > firebase-tools 설치 
    ```zsh
    $ npm install -g firebase-tools
    ```
  - 루트 디렉토리에서 google login 후 프로젝트 시작
    ```zsh
    $ firebase login
    ```
    ```zsh
    $ firebase init
    ```
  - `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`, 선택 스페이스 바 누르고 엔터
  - `Use an existing project`, 선택
  - `kimoony-react-project`, firebase project 선택 
  - `What do you want to use as your public directory? build`, [build] 입력
  - single-page app 질문에 `y`
  - Set up automatic builds and deploys with GitHub? 질문에 `n`
  - File build/index.html already exists. Overwrite? 질문에 `y`
  - 완료되면 firebase hosting 페이지에서 콘솔로 이동하고 맨 아래에 다른 사이트 추가 클릭
  - 본인이 원하는 사이트 명 입력
  - `firebase.json` 파일에 들어가서 hosting 객체 안에 `"site": [사이트명],` 입력 
  - 다시 빌드 해준다.
    ```zsh
    $ npm run build
    ```
      - firebase deploy 실행
    ```zsh
    $ firebase deploy
    ```
  - [링크](https://kimoony-udemy-project.web.app)


<br />

# 작성자

👨‍💻 김 훈
- GitHub: [@kimoony](https://github.com/kimoony)