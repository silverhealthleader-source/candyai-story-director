# StoryForge Prompt Studio

동화책과 짧은 영상 기획을 위한 AI 스토리보드/프롬프트 작성 웹 앱입니다. 사용자가 스토리 내용과 주인공·등장인물 정보를 입력하면 캐릭터 시트 생성 프롬프트, FLOW, Midjourney, Kling, HeyGen용 이미지 프롬프트와 영상 프롬프트, 수노 배경음악 프롬프트와 가사를 영어/한국어로 함께 작성합니다. 시각 스타일은 전문 동화책 제작에 어울리는 다양한 옵션을 제공하고, 장면 수는 3~50장면, 영상 길이는 6초~3분 범위에서 선택 또는 직접 입력할 수 있습니다. JPG, PNG, WebP, GIF, AVIF, HEIC, TIFF, BMP, SVG 등 다양한 레퍼런스 이미지를 최대 5개까지 선택해 프롬프트 조건에 반영할 수 있습니다. 음악 스타일은 클래식, K-pop, 국악, 다큐멘터리, 재즈, EDM 등 52가지 버튼형 옵션으로 선택할 수 있고, 예시 채우기는 동화·다큐·전통·환경·과학·문화·역사·생활·교육·종교·기독교·불교·광고·여행·인터뷰 분야별 버튼을 통해 각 분야 5개 예시 중 하나를 랜덤으로 채웁니다.

이 앱은 이미지와 영상을 직접 생성하지 않습니다. 대신 각 생성 도구에 복사해 사용할 수 있는 전문 프롬프트 패키지를 만듭니다.

## 1. 기술 스택

- Frontend: HTML, CSS, JavaScript
- Backend: Vercel Serverless Functions(Python)
- AI: OpenAI Responses API
- Deploy: GitHub + Vercel

## 2. 프로젝트 구조

```text
.
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ app.js
├─ api/
│  └─ index.py
├─ docs/
│  └─ service_plan.md
├─ screenshots/
├─ requirements.txt
├─ vercel.json
├─ .env.example
└─ README.md
```

## 3. VS Code에서 열기부터 실행까지

아래 순서대로 하면 됩니다. 중간 단계를 건너뛰지 마세요.

### 3.1 폴더 열기

1. 컴퓨터에서 **VS Code**를 실행합니다.
2. 왼쪽 위 메뉴에서 **File**을 누릅니다.
3. **Open Folder...**를 누릅니다.
4. 아래 폴더를 선택합니다.

```text
C:\Users\holyk\OneDrive\바탕 화면\~ing\문서\코디세이
```

5. **폴더 선택** 버튼을 누릅니다.
6. VS Code 왼쪽 탐색기에 `index.html`, `css`, `js`, `api`, `docs`가 보이면 성공입니다.

### 3.2 터미널 열기

1. VS Code 위쪽 메뉴에서 **Terminal**을 누릅니다.
2. **New Terminal**을 누릅니다.
3. 아래쪽에 터미널 창이 열립니다.
4. 터미널 앞부분에 `코디세이` 폴더명이 보이면 준비 완료입니다.

### 3.3 로컬 화면 실행

터미널에 아래 명령어를 그대로 입력하고 Enter를 누릅니다.

```bash
python -m http.server 8000
```

브라우저 주소창에 아래 주소를 입력합니다.

```text
URL: https://candyai-story-director-****.vercel.app
```

화면이 열리면 홈, 프롬프트 작성, 스토리보드, 프롬프트, 음악 프롬프트, 캐릭터시트 메뉴를 눌러 봅니다.

주의: 이 방법은 화면 확인용입니다. 실제 AI 프롬프트 작성 API는 Vercel 배포 후 환경 변수를 등록해야 안정적으로 확인할 수 있습니다.

### 3.4 서버 끄기

터미널에서 `Ctrl` 키를 누른 상태로 `C`를 누릅니다.

## 4. 환경 변수 설정

`.env.example`을 참고해 Vercel 프로젝트 환경 변수에 아래 값을 등록합니다.

```text
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

API 키는 코드, README, 스크린샷, GitHub 커밋에 절대 노출하지 않습니다.

## 5. GitHub 업로드 순서

1. GitHub에 로그인합니다.
2. 오른쪽 위 `+` 버튼을 누릅니다.
3. **New repository**를 누릅니다.
4. Repository name에 예시처럼 입력합니다.

```text
storyforge-prompt-studio
```

5. Public 또는 Private을 선택합니다. 과제 제출용이면 교수자 안내에 맞춥니다.
6. **Create repository**를 누릅니다.
7. VS Code 터미널에서 아래 명령어를 차례대로 실행합니다.

```bash
git add .
git commit -m "feat: build AI storyboard prompt studio"
git branch -M main
git remote add origin 깃허브에서_복사한_저장소_URL
git push -u origin main
```

이미 `remote origin`이 있다고 나오면 아래 명령어를 사용합니다.

```bash
git remote set-url origin 깃허브에서_복사한_저장소_URL
git push -u origin main
```

## 6. Vercel 배포 순서

1. Vercel에 로그인합니다.
2. **Add New...** 또는 **New Project**를 누릅니다.
3. GitHub 저장소 `storyforge-prompt-studio`를 선택합니다.
4. Framework Preset은 **Other** 또는 자동 감지 상태로 둡니다.
5. Environment Variables에 아래 2개를 추가합니다.

```text
OPENAI_API_KEY
OPENAI_MODEL
```

6. `OPENAI_API_KEY` 값에는 본인의 OpenAI API 키를 넣습니다.
7. `OPENAI_MODEL` 값에는 아래 값을 넣습니다.

```text
gpt-4.1-mini
```

8. **Deploy**를 누릅니다.
9. 배포가 끝나면 Vercel URL을 복사합니다.
10. 아래 칸에 붙여 넣습니다.

배포 URL: 제출 전 Vercel URL을 여기에 입력하세요.

## 7. AI 기능 동작 흐름

1. 사용자가 작품 아이디어와 등장인물 메모를 입력합니다.
2. 필요한 경우 레퍼런스 이미지를 최대 5개까지 선택합니다.
3. `js/app.js`가 입력값과 레퍼런스 이미지 정보를 JSON으로 만들고 `fetch('/api/generate')`로 전송합니다.
4. `api/index.py`가 OpenAI API를 호출합니다.
5. 응답 JSON이 스토리보드, 이미지/영상 프롬프트, 수노 음악 프롬프트, 캐릭터 시트 생성 프롬프트 아코디언에 표시됩니다.

## 8. 테스트 입력 예시

정상 입력:

```text
숲속 우체국을 운영하는 작은 별이 아이들의 잃어버린 꿈을 배달하는 동화
```

등장인물 메모:

```text
루미: 은빛 머리, 노란 우체부 가방, 따뜻한 빛을 내는 작은 별. 조심스럽지만 용감함.
모모: 파란 조끼와 둥근 안경을 쓴 달토끼 조력자. 장난스럽지만 친구를 잘 도와줌.
```

빈 입력 테스트:

```text
스토리 내용을 비운 상태에서 스토리보드와 프롬프트 작성하기 버튼 클릭
```

기대 결과:

```text
스토리 내용을 입력해 주세요. 빈 입력으로는 스토리보드와 프롬프트를 작성할 수 없습니다.
```

## 9. 제출 캡처 제목과 파일명

아래 제목은 과제 문서에 그대로 붙여 넣어도 됩니다.

```markdown
### 캡처 1. 데스크톱 홈 화면
- 파일명: `01_desktop_home.png`
- 설명: StoryForge Prompt Studio의 홈 화면과 주요 메뉴가 보이는 장면
```

```markdown
### 캡처 2. 제작 입력 화면
- 파일명: `02_builder_input.png`
- 설명: 작품 아이디어, 등장인물 메모, 스타일, 도구 선택 입력값이 보이는 장면
```

```markdown
### 캡처 3. 캐릭터 시트 생성 프롬프트 결과
- 파일명: `03_character_sheet_result.png`
- 설명: 주인공과 등장인물의 캐릭터 시트 생성 프롬프트가 영어/한국어로 표시된 장면
```

```markdown
### 캡처 4. 영상 스토리보드와 도구별 프롬프트 결과
- 파일명: `04_storyboard_accordion_result.png`
- 설명: 장면별 아코디언을 펼쳐 이미지 생성 프롬프트와 영상 생성 프롬프트가 보이는 장면
```

```markdown
### 캡처 5. 수노 배경음악 프롬프트 결과
- 파일명: `05_suno_music_prompt_result.png`
- 설명: 수노 음악 스타일과 가사가 영어/한국어로 표시된 장면
```

```markdown
### 캡처 6. 모바일 반응형 화면
- 파일명: `06_mobile_responsive.png`
- 설명: 모바일 크기에서 입력과 버튼이 한 열로 정리되어 보이는 장면
```

```markdown
### 캡처 7. Vercel 배포 완료 화면
- 파일명: `07_vercel_deploy_success.png`
- 설명: Vercel에서 배포가 성공하고 URL이 표시된 장면
```

```markdown
### 캡처 8. GitHub 저장소 화면
- 파일명: `08_github_repository.png`
- 설명: 프로젝트 코드가 GitHub 저장소에 업로드된 장면
```

```markdown
### 캡처 9. AI 코딩 도구 사용 증빙
- 파일명: `09_ai_coding_tool_process.png`
- 설명: AI 코딩 도구와 대화하며 기능을 수정한 과정
```

```markdown
### 캡처 10. 오류 처리 확인
- 파일명: `10_empty_input_error.png`
- 설명: 빈 입력 시 사용자 안내 메시지가 표시된 장면
```

## 10. 제출 패키지 체크리스트

- 배포된 웹 서비스 Vercel URL
- GitHub 저장소 URL
- README.md
- `docs/service_plan.md`
- 데스크톱 스크린샷
- 모바일 스크린샷
- AI 기능 동작 스크린샷
- AI 코딩 도구 사용 과정 스크린샷 또는 대화 로그

## 11. 서비스 기획서 위치

서비스 목적, 타겟 사용자, 페이지 구성, 핵심 기능, 실패 처리 기준은 아래 파일에 정리되어 있습니다.

```text
docs/service_plan.md
```
