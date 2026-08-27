# StoryForge Prompt Studio

동화책과 짧은 영상 기획을 위한 AI 스토리보드/프롬프트 작성 웹 앱입니다. 사용자가 스토리 내용과 주인공·등장인물 정보를 입력하면 시나리오, 캐릭터 시트 생성 프롬프트, FLOW, Midjourney, Kling, HeyGen용 이미지 프롬프트와 영상 프롬프트, 수노 배경음악 프롬프트와 가사를 영어/한국어로 함께 작성합니다. 생성 속도를 높이기 위해 전체 JSON을 한 번에 만들지 않고 `2. 시나리오 생성 → 3. 캐릭터 시트 프롬프트 생성 → 4. 이미지·영상 프롬프트 생성 → 5. 수노 음악 프롬프트 생성` 순서로 나누어 요청합니다. 시각 스타일은 전문 동화책 제작에 어울리는 다양한 옵션을 제공하고, 장면 수는 3~10장면, 영상 길이는 6초~1분 30초 범위에서 선택 또는 직접 입력할 수 있습니다. 이미지/영상 프롬프트 도구는 기본 선택 없이 사용자가 최대 2개까지만 선택합니다. 수노 음악 옵션도 기본 선택 없이 사용자가 직접 고릅니다. JPG, PNG, WebP, GIF, AVIF, HEIC, TIFF, BMP, SVG 등 다양한 레퍼런스 이미지를 최대 5개까지 선택해 프롬프트 조건에 반영할 수 있습니다. 음악 스타일은 클래식, K-pop, 국악, 다큐멘터리, 재즈, EDM 등 52가지 버튼형 옵션으로 선택할 수 있고, 예시 채우기는 동화·다큐·전통·환경·과학·문화·역사·생활·교육·종교·기독교·불교·광고·여행·인터뷰 분야별 버튼을 통해 각 분야 5개 예시 중 하나를 랜덤으로 채웁니다.

이 앱은 이미지와 영상을 직접 생성하지 않습니다. 대신 각 생성 도구에 복사해 사용할 수 있는 전문 프롬프트 패키지를 만듭니다.

- 배포 URL: https://candyai-story-director-seven.vercel.app
- GitHub 저장소 URL: https://github.com/silverhealthleader-source/candyai-story-director

## 1. 기술 스택

- Frontend: HTML, CSS, JavaScript
- Backend: Vercel Serverless Functions(Python)
- AI: OpenAI Responses API
- Deploy: GitHub + Vercel

### 1.1 프론트와 백엔드를 분리한 이유

프론트엔드(`index.html`, `css/styles.css`, `js/app.js`)는 사용자가 보는 화면, 입력 폼, 버튼, 아코디언, 결과 표시를 담당합니다. 백엔드(`api/index.py`)는 OpenAI API 키를 안전하게 숨기고 AI 요청을 대신 처리합니다. 이렇게 분리하면 API 키가 브라우저에 노출되지 않고, 화면 수정과 서버 로직 수정을 따로 관리할 수 있으며, Vercel에서 정적 화면과 Python Serverless Function을 함께 배포할 수 있습니다.

### 1.2 HTML/CSS/JavaScript 역할 예시

```html
<textarea id="idea" name="idea" maxlength="1200"></textarea>
<div id="storyboardOutput" class="accordion empty-state"></div>
```

```css
@media (max-width: 860px) {
  .builder-grid {
    grid-template-columns: 1fr;
  }
}
```

```javascript
const response = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
  signal: controller.signal
});
```

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
F:\codyssey\hw_A\candyai-story-director
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
http://localhost:8000
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
OPENAI_MAX_OUTPUT_TOKENS=6500
```

API 키는 코드, README, 스크린샷, GitHub 커밋에 절대 노출하지 않습니다.

`.gitignore`에는 실제 키 파일이 GitHub에 올라가지 않도록 아래 항목이 포함되어 있습니다.

```text
.env
__pycache__/
.vercel/
node_modules/
*.log
```

Vercel 환경변수 등록 증빙은 제출 캡처 자료에 포함합니다.

```markdown
### 캡처. Vercel 환경변수 등록 화면
- 설명: Vercel Project Settings > Environment Variables에서 `OPENAI_API_KEY`, `OPENAI_MODEL`을 등록한 화면
- 주의: 실제 API 키 값은 절대 보이게 캡처하지 않습니다.
```

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
3. GitHub 저장소 `candyai-story-director`를 선택합니다.
4. Framework Preset은 **Other** 또는 자동 감지 상태로 둡니다.
5. Environment Variables에 아래 2개를 추가합니다.

```text
OPENAI_API_KEY
OPENAI_MODEL
OPENAI_MAX_OUTPUT_TOKENS
```

6. `OPENAI_API_KEY` 값에는 본인의 OpenAI API 키를 넣습니다.
7. `OPENAI_MODEL` 값에는 아래 값을 넣습니다.

```text
gpt-4.1-mini
```

8. `OPENAI_MAX_OUTPUT_TOKENS` 값에는 아래 값을 넣습니다.

```text
6500
```

9. **Deploy**를 누릅니다.
10. 배포가 끝나면 Vercel URL을 복사합니다.
11. 아래 칸에 붙여 넣습니다.

배포 URL: https://candyai-story-director-seven.vercel.app

## 7. AI 기능 동작 흐름

1. 사용자가 작품 아이디어와 등장인물 메모를 입력합니다.
2. 필요한 경우 레퍼런스 이미지를 최대 5개까지 선택합니다.
3. `js/app.js`가 입력값과 레퍼런스 이미지 정보를 JSON으로 만들고 `fetch('/api/generate')`로 전송합니다.
4. `api/index.py`가 OpenAI API를 호출합니다.
5. 응답 JSON이 스토리보드, 이미지/영상 프롬프트, 수노 음악 프롬프트, 캐릭터 시트 생성 프롬프트 아코디언에 표시됩니다.

### 7.1 프론트 fetch 요청 코드

`js/app.js`의 제출 이벤트는 입력값을 `payload`로 묶고 `/api/generate`에 POST 요청을 보냅니다.

```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 45000);
setStatus("AI가 영상 스토리보드와 이미지·영상 생성 프롬프트를 작성 중입니다.");

const response = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
  signal: controller.signal
});
```

### 7.2 로딩 → 성공 → 실패 상태 전이

- 로딩: 사용자가 작성 버튼을 누르면 `setStatus("AI가 ... 작성 중입니다.")`가 표시됩니다.
- 성공: JSON 응답을 받으면 `renderCharacterSheets`, `renderStoryboard`, `renderPrompts`가 실행되고 결과 아코디언이 채워집니다.
- 실패: 빈 입력, 도구 미선택, API 오류, JSON 형식 오류, 타임아웃은 `setStatus(message, "error")`로 사용자에게 안내합니다.
- 타임아웃: 45초가 지나면 요청을 중단하고 `응답 시간이 길어지고 있습니다. 잠시 후 다시 시도하거나 장면 수를 줄여 주세요.`를 표시합니다.

### 7.3 API 요청 JSON 예시

```json
{
  "idea": "숲속 우체국을 운영하는 작은 별이 아이들의 잃어버린 꿈을 배달하는 동화",
  "characters": "루미: 은빛 머리, 노란 우체부 가방 / 모모: 파란 조끼와 둥근 안경",
  "audience": "초등 저학년과 가족",
  "visual_style": "premium watercolor storybook",
  "scene_count": 6,
  "duration": "15 seconds",
  "tools": ["FLOW", "Midjourney", "Kling", "HeyGen"],
  "include_lyrics": true,
  "instrumental": false
}
```

### 7.4 API 성공 응답 JSON 예시

```json
{
  "project_title": "The Moonlit Library",
  "logline": "A child opens a glowing storybook and follows paper stars into a forgotten dream.",
  "character_sheets": [
    {
      "name_ko": "루미",
      "name_en": "Lumi",
      "sheet_prompt_en": "Character sheet generation prompt for Lumi...",
      "sheet_prompt_ko": "루미 캐릭터 시트 생성 프롬프트..."
    }
  ],
  "scenes": [
    {
      "scene_number": 1,
      "title_ko": "숲속 우체국이 열리다",
      "title_en": "The Forest Mailroom Opens",
      "storyboard_ko": "첫 장면의 스토리보드 설명",
      "storyboard_en": "Storyboard beat for scene 1",
      "tool_prompts": {
        "FLOW": {
          "image_en": "English image prompt",
          "image_ko": "한국어 이미지 프롬프트",
          "video_en": "English video prompt",
          "video_ko": "한국어 영상 프롬프트"
        }
      }
    }
  ],
  "music": {
    "style_en": "warm orchestral lullaby",
    "style_ko": "따뜻한 오케스트라 자장가",
    "prompt_en": "Suno music prompt in English",
    "prompt_ko": "수노 음악 프롬프트 한국어",
    "lyrics_en": "English lyrics",
    "lyrics_ko": "한국어 가사"
  }
}
```

### 7.5 API 오류 응답 JSON 예시

```json
{
  "error": "작품 아이디어를 입력해 주세요."
}
```

```json
{
  "error": "OPENAI_API_KEY 환경 변수가 설정되어 있지 않습니다."
}
```

### 7.6 긴 입력 처리 기준

- 프론트엔드 입력창은 `maxlength="1200"`으로 긴 입력을 1차 제한합니다.
- 서버는 받은 값을 `strip()`으로 정리한 뒤 필수값이 비어 있는지 검사합니다.
- 1200자 안의 긴 입력은 그대로 AI 요청에 포함하되, 장면 수가 많으면 응답 시간이 길어질 수 있습니다.
- 응답이 늦으면 45초 타임아웃 안내가 표시되며, 사용자는 장면 수를 줄이거나 입력 내용을 요약해 다시 실행할 수 있습니다.

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
스토리 내용을 비운 상태에서 2. 시나리오 생성 버튼 클릭
```

기대 결과:

```text
스토리 내용을 입력해 주세요. 빈 입력으로는 시나리오와 프롬프트를 작성할 수 없습니다.
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

### 9.1 실제 제출 증빙 이미지 경로

네이토 사전평가는 이미지 파일 자체를 평가하지 않을 수 있으므로, README에 캡처 경로와 설명을 함께 남깁니다.

| 증빙 항목 | 파일 경로 |
| --- | --- |
| 배포된 홈 화면 | `A1-3_이미지캡쳐/01_deployed_home.png.png` |
| 제작 입력 화면 | `A1-3_이미지캡쳐/02-2_builder_input.png` |
| 레퍼런스 이미지 업로드 | `A1-3_이미지캡쳐/03_reference_image_upload.png` |
| AI 입력 준비 화면 | `A1-3_이미지캡쳐/04_ai_input_ready.png` |
| 모바일 반응형 화면 1 | `A1-3_이미지캡쳐/스바트폰 앱구현 1.png` |
| 모바일 반응형 화면 2 | `A1-3_이미지캡쳐/스마트폰앱구현 2.png` |
| 스토리보드 결과 | `A1-3_이미지캡쳐/06-1_storyboard_result.png.png` |
| 캐릭터 시트 결과 | `A1-3_이미지캡쳐/07_character_sheet_result.png.png` |
| 이미지/영상 프롬프트 결과 | `A1-3_이미지캡쳐/08_image_video_prompt_result.png` |
| 수노 음악 프롬프트 결과 | `A1-3_이미지캡쳐/09_suno_music_prompt_result.png` |
| 빈 입력 오류 처리 | `A1-3_이미지캡쳐/10_empty_input_error.png.png` |
| GitHub 저장소 화면 | `A1-3_이미지캡쳐/12_github_repository.png.png` |
| Vercel 배포 성공 화면 | `A1-3_이미지캡쳐/13_vercel_deploy_success.png.png` |
| AI 코딩 도구 사용 과정 | `A1-3_이미지캡쳐/14-1_ai_coding_tool_process.png` |

모바일 반응형 캡처는 제출 문서에 아래 제목으로 첨부합니다.

```markdown
### 캡처. 모바일 반응형 화면
- 설명: 스마트폰 화면에서 로고, 메뉴 5개 버튼, 제목, 작성 버튼이 모바일 너비에 맞게 표시된 장면
- 확인 기준: 메뉴 버튼 높이가 동일하고 텍스트가 버튼 밖으로 넘치지 않음
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

## 12. 배포 실패 진단과 수정 절차

Vercel 배포가 실패하거나 Visit 화면에서 오류가 보이면 아래 순서대로 확인합니다.

1. Vercel 프로젝트 화면에서 **Deployments**를 클릭합니다.
2. 가장 위의 최신 배포 항목을 클릭합니다.
3. **Build Logs**에서 빨간색 오류 줄을 확인합니다.
4. 브라우저에서 실제 배포 URL을 열고 개발자 도구 Console과 Network를 확인합니다.
5. `/api/generate` 요청이 404, 500, 501로 실패하는지 확인합니다.
6. 환경변수 `OPENAI_API_KEY`, `OPENAI_MODEL`이 Vercel에 등록되어 있는지 확인합니다.
7. 수정 후 VS Code에서 아래 명령어로 다시 업로드합니다.

```bash
git add .
git commit -m "fix: update deployment configuration"
git push
```

8. GitHub에 push되면 Vercel이 자동으로 새 배포를 시작합니다.
9. 새 배포가 `Ready`가 된 뒤 Visit을 눌러 다시 확인합니다.

실제 해결한 오류 예시는 다음과 같습니다.

| 오류 | 원인 | 수정 |
| --- | --- | --- |
| No python entrypoint found | Vercel이 Python 함수 진입점을 찾지 못함 | `api/index.py`로 엔드포인트 정리 |
| 501 Unsupported method GET | 루트 페이지 요청이 Python 함수로 들어갔지만 GET 처리가 없음 | `do_GET`에서 `index.html`, `css`, `js`, `images` 정적 파일 응답 |
| Failed to fetch | 프론트에서 API 주소 또는 Vercel 환경변수 문제 | `/api/generate`, 환경변수, 배포 로그 확인 |

## 13. 응답 지연 개선 방안

현재 앱은 45초 타임아웃을 적용해 응답이 늦으면 사용자에게 안내합니다. 추가 개선 방안은 다음과 같습니다.

- 모델 경량화: 기본 모델은 `OPENAI_MODEL=gpt-4.1-mini`처럼 빠른 모델을 사용합니다.
- 출력량 제한: `OPENAI_MAX_OUTPUT_TOKENS=6500`으로 응답 길이를 제한해 너무 긴 JSON 생성으로 인한 지연을 줄입니다.
- 장면 수 제한: 기본 장면 수는 적게 시작하고, 최대 10장면까지만 허용해 응답이 과도하게 길어지지 않게 합니다.
- 입력 요약: 1200자에 가까운 긴 입력은 핵심 인물, 배경, 사건 중심으로 요약해 요청합니다.
- 단계형 생성: 시나리오, 캐릭터 시트, 이미지/영상 프롬프트, 수노 음악 프롬프트를 나누어 요청해 한 번의 응답량을 줄입니다.
- 캐시 레이어: 같은 입력값과 같은 옵션으로 다시 요청하면 이전 결과 JSON을 재사용하도록 `localStorage` 또는 서버 저장소를 붙일 수 있습니다.
- 실패 안내: 45초가 지나면 `응답 시간이 길어지고 있습니다. 잠시 후 다시 시도하거나 장면 수를 줄여 주세요.`라는 메시지를 보여줍니다.

## 14. 프롬프트 템플릿 개선과 버전 관리 규칙

- 현재 프롬프트 기준은 `api/index.py`의 `SYSTEM_PROMPT`와 요청 생성 로직에 들어 있습니다.
- 프롬프트를 크게 수정할 때는 커밋 메시지에 `prompt:` 접두어를 붙입니다.
- 예: `prompt: improve character sheet consistency rules`
- 후속 버전에서는 `prompts.py`로 분리해 시스템 프롬프트, 이미지 프롬프트, 영상 프롬프트, 음악 프롬프트를 별도 관리할 수 있습니다.
- 프롬프트 수정 후에는 정상 입력, 빈 입력, 긴 입력, 모바일 화면, Vercel 배포 URL에서 다시 테스트합니다.

## 15. API 키 유출 시 대응 절차

API 키가 README, 코드, 스크린샷, GitHub 커밋에 노출되었다고 의심되면 아래 순서로 처리합니다.

1. OpenAI 대시보드에서 노출된 API 키를 즉시 폐기합니다.
2. 새 API 키를 발급합니다.
3. Vercel Project Settings > Environment Variables에서 `OPENAI_API_KEY` 값을 새 키로 교체합니다.
4. GitHub 코드와 README에서 키 문자열을 삭제합니다.
5. `.env`가 GitHub에 올라갔다면 `.gitignore`에 `.env`가 있는지 확인하고 Git 추적에서 제거합니다.
6. 필요하면 노출된 커밋 이력 정리 여부를 검토합니다.
7. Vercel에서 Redeploy를 실행하고 AI 기능이 다시 작동하는지 확인합니다.
