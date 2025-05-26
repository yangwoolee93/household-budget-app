# 🐳 도커 개발 환경 설정

> 환경 설정으로 시간 낭비하지 말고 바로 코딩 시작하기!

## 🎯 왜 도커를 사용하나요?

### ✅ 바이브 코딩에 완벽한 이유

- **환경 통일**: 모든 개발자가 동일한 환경에서 작업
- **빠른 시작**: Node.js 버전, 패키지 충돌 걱정 없음
- **클린 환경**: 로컬 환경을 더럽히지 않음
- **즉시 시작**: `docker-compose up` 한 번으로 모든 준비 완료!

### 🚀 30초 만에 개발 환경 준비

```bash
# 1. 도커 컨테이너 시작
docker-compose up -d

# 2. 컨테이너 접속
docker-compose exec app bash

# 3. 바로 개발 시작!
npm run dev
```

## 📁 도커 파일 구조

```
household-budget-app/
├── docker-compose.yml       # 🐳 메인 도커 설정
├── Dockerfile.dev          # 개발용 도커파일
├── .dockerignore           # 도커 무시 파일
├── docs/                   # 📚 문서들
└── budget-app/            # 🚀 앱 개발 폴더 (생성 예정)
```

## 🛠️ 도커 설정 파일들

### 1. docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: budget-app-dev
    ports:
      - "5173:5173" # Vite 개발 서버
      - "9229:9229" # Node.js 디버깅
    volumes:
      - .:/workspace
      - /workspace/node_modules # node_modules 캐시
    working_dir: /workspace
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true # 파일 변경 감지 (Windows/Mac)
    stdin_open: true
    tty: true
    command: bash

  # SQLite는 파일 기반이므로 별도 DB 컨테이너 불필요!
```

### 2. Dockerfile.dev

```dockerfile
FROM node:18-alpine

# 필수 패키지 설치 (Electron 빌드용)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    bash

# 작업 디렉토리 설정
WORKDIR /workspace

# 글로벌 패키지 설치
RUN npm install -g npm@latest

# 포트 노출
EXPOSE 5173 9229

# 기본 명령어
CMD ["bash"]
```

### 3. .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.DS_Store
dist
build
```

## 🚀 사용법

### 1단계: 도커 환경 시작

```bash
# 현재 폴더에서 실행
docker-compose up -d

# 컨테이너 상태 확인
docker-compose ps
```

### 2단계: 컨테이너 접속

```bash
# 개발 컨테이너 접속
docker-compose exec app bash

# 또는 새 터미널에서
docker exec -it budget-app-dev bash
```

### 3단계: 프로젝트 생성 (컨테이너 내부에서)

```bash
# Electron 프로젝트 생성
npm create electron-vite@latest budget-app -- --template react-ts
cd budget-app

# 의존성 설치
npm install
npm install zustand better-sqlite3 @types/better-sqlite3
npm install lucide-react date-fns
npm install -D tailwindcss postcss autoprefixer

# Tailwind 초기화
npx tailwindcss init -p

# 개발 서버 시작
npm run dev
```

### 4단계: 브라우저에서 확인

- **Vite 개발 서버**: http://localhost:5173
- **Electron 앱**: 자동으로 실행됨

## 🔧 개발 워크플로우

### 일반적인 작업 흐름

```bash
# 1. 도커 환경 시작
docker-compose up -d

# 2. 컨테이너 접속
docker-compose exec app bash

# 3. 개발 서버 시작 (컨테이너 내부)
cd budget-app
npm run dev

# 4. 코딩 시작! (로컬 에디터 사용)
# 파일 변경사항이 자동으로 컨테이너에 반영됨
```

### 유용한 명령어들

```bash
# 컨테이너 로그 확인
docker-compose logs -f app

# 컨테이너 재시작
docker-compose restart app

# 컨테이너 정지
docker-compose down

# 컨테이너 + 볼륨 삭제 (완전 초기화)
docker-compose down -v
```

## 🎨 VS Code 통합

### 1. Dev Containers 확장 설치

```bash
# VS Code에서 설치
code --install-extension ms-vscode-remote.remote-containers
```

### 2. .devcontainer/devcontainer.json 생성

```json
{
  "name": "Budget App Dev",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "customizations": {
    "vscode": {
      "extensions": [
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-typescript-next"
      ]
    }
  },
  "postCreateCommand": "npm install",
  "remoteUser": "node"
}
```

### 3. VS Code에서 컨테이너 열기

- `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"

## 🐛 트러블슈팅

### Electron GUI 실행 문제 (중요!) 🖥️

**문제**: `Error: spawn electron ENOENT`

```bash
Error: spawn /workspace/budget-app/node_modules/electron/dist/electron ENOENT
```

**원인**: Electron은 GUI 앱이므로 도커 컨테이너(헤드리스)에서 직접 실행 불가

**해결책 (3가지 옵션)**:

#### Option 1: 웹 개발 모드 (추천) 🌐

```bash
# 컨테이너 내부에서
cd budget-app
npx vite --host 0.0.0.0

# 브라우저에서 접속: http://localhost:5173
# React 앱을 웹에서 개발하고 나중에 Electron으로 패키징
```

#### Option 2: 하이브리드 개발 🔄

```bash
# 도커: 개발 환경 + 빌드
docker-compose exec app bash
cd budget-app
npm install  # 의존성 설치

# 로컬: Electron 실행 (새 터미널)
cd budget-app
npm run dev  # 로컬에서 Electron 실행
```

#### Option 3: 완전 로컬 개발 💻

```bash
# 도커 사용 안함
docker-compose down
cd budget-app
npm run dev
```

### 포트 충돌 시

```bash
# 다른 포트 사용
docker-compose down
# docker-compose.yml에서 포트 변경 후
docker-compose up -d
```

### 권한 문제 (Linux/Mac)

```bash
# 현재 사용자 UID/GID 확인
id

# Dockerfile.dev에 추가
RUN addgroup -g 1000 appgroup && \
    adduser -D -u 1000 -G appgroup appuser
USER appuser
```

### 파일 변경 감지 안됨

```bash
# docker-compose.yml에 이미 설정됨
environment:
  - CHOKIDAR_USEPOLLING=true
```

## 💡 바이브 코딩 팁

### ✅ 도커의 장점

- **빠른 온보딩**: 새 팀원도 5분 만에 개발 시작
- **환경 일관성**: "내 컴퓨터에서는 되는데" 문제 해결
- **클린 개발**: 로컬 환경 오염 방지

### 🎯 주의사항

- **볼륨 마운트**: 코드 변경사항이 실시간 반영
- **포트 매핑**: 5173 포트로 접근
- **SQLite 파일**: 로컬에 저장되어 데이터 유지

---

**🐳 이제 환경 설정 걱정 없이 바로 코딩을 시작할 수 있습니다!**
