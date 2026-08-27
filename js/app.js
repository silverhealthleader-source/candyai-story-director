const form = document.querySelector("#promptForm");
const statusBox = document.querySelector("#statusBox");
const storyboardOutput = document.querySelector("#storyboardOutput");
const promptOutput = document.querySelector("#promptOutput");
const characterOutput = document.querySelector("#characterOutput");
const musicOutput = document.querySelector("#musicOutput");
const sampleButton = document.querySelector("#sampleButton");
const clearButton = document.querySelector("#clearButton");
const themeToggle = document.querySelector("#themeToggle");
const copyAllButton = document.querySelector("#copyAllButton");
const downloadJsonButton = document.querySelector("#downloadJsonButton");
const musicPromptButton = document.querySelector("#musicPromptButton");
const scenarioButton = document.querySelector("#scenarioButton");
const characterSheetButton = document.querySelector("#characterSheetButton");
const imageVideoPromptButton = document.querySelector("#imageVideoPromptButton");
const sunoPromptButton = document.querySelector("#sunoPromptButton");
const toolPreview = document.querySelector("#toolPreview");
const customSceneButton = document.querySelector("#customSceneButton");
const customDurationButton = document.querySelector("#customDurationButton");
const customDurationWrap = document.querySelector("#customDurationWrap");
const customDurationInput = document.querySelector("#customDuration");
const referenceImagesInput = document.querySelector("#referenceImages");
const referenceList = document.querySelector("#referenceList");
const customMusicPromptButton = document.querySelector("#customMusicPromptButton");
const customMusicPromptWrap = document.querySelector("#customMusicPromptWrap");
const customMusicPromptInput = document.querySelector("#customMusicPrompt");
const musicStyleGrid = document.querySelector("#musicStyleGrid");
const sampleCategoryGrid = document.querySelector("#sampleCategoryGrid");
let referencePreviewUrls = [];

const sampleIdea = "A small star runs a secret mailroom inside an old forest, delivering lost dreams back to children before sunrise.";
let latestResult = null;
let currentSampleCategory = "all";
let musicPromptManuallyEdited = false;
let completedStep = 0;

const musicStyles = [
  ["warm orchestral lullaby", "따뜻한 오케스트라 자장가"],
  ["magical celesta fairytale", "마법적인 첼레스타 동화음악"],
  ["bright acoustic children song", "밝은 어쿠스틱 어린이 노래"],
  ["cinematic fantasy adventure", "영화적인 판타지 모험음악"],
  ["soft piano bedtime story", "부드러운 피아노 잠자리 음악"],
  ["playful marimba and pizzicato", "장난스러운 마림바와 피치카토"],
  ["Korean traditional fusion fairytale", "국악 퓨전 동화음악"],
  ["dreamy ambient story score", "몽환적인 앰비언트 스토리 음악"],
  ["classical chamber strings", "클래식 실내악 현악"],
  ["grand symphonic classical", "웅장한 클래식 교향악"],
  ["baroque harpsichord fantasy", "바로크 하프시코드 판타지"],
  ["romantic piano and strings", "낭만주의 피아노와 현악"],
  ["modern neoclassical piano", "현대 네오클래식 피아노"],
  ["K-pop bright dance pop", "K-pop 밝은 댄스팝"],
  ["K-pop emotional ballad", "K-pop 감성 발라드"],
  ["K-pop dreamy synth pop", "K-pop 몽환 신스팝"],
  ["K-pop children's chorus", "K-pop 어린이 합창"],
  ["traditional Korean gugak", "전통 국악"],
  ["samulnori percussion fusion", "사물놀이 타악 퓨전"],
  ["haegeum cinematic ballad", "해금 시네마틱 발라드"],
  ["gayageum ambient fusion", "가야금 앰비언트 퓨전"],
  ["documentary orchestral score", "다큐멘터리 오케스트라 스코어"],
  ["nature documentary ambient", "자연 다큐 앰비언트"],
  ["historical documentary strings", "역사 다큐 현악"],
  ["science documentary electronic", "과학 다큐 일렉트로닉"],
  ["lofi cozy study beat", "로파이 포근한 스터디 비트"],
  ["jazz waltz storybook", "재즈 왈츠 동화음악"],
  ["bossa nova sunny morning", "보사노바 햇살 아침"],
  ["folk acoustic storytelling", "포크 어쿠스틱 스토리텔링"],
  ["indie pop whimsical", "인디팝 위트 판타지"],
  ["ambient piano meditation", "앰비언트 피아노 명상"],
  ["cinematic trailer gentle epic", "부드러운 시네마틱 트레일러"],
  ["mystery music box", "미스터리 오르골"],
  ["adventure marching orchestra", "모험 행진 오케스트라"],
  ["Christmas fairytale bells", "크리스마스 동화 종소리"],
  ["Halloween cute spooky", "귀여운 핼러윈 스푸키"],
  ["Latin playful percussion", "라틴 장난감 타악"],
  ["African marimba family rhythm", "아프리칸 마림바 가족 리듬"],
  ["Irish Celtic fairytale", "아이리시 켈틱 동화음악"],
  ["French musette accordion", "프렌치 뮤제트 아코디언"],
  ["Japanese anime ending ballad", "일본 애니 엔딩 발라드"],
  ["Chinese guzheng fantasy", "중국 고쟁 판타지"],
  ["Middle Eastern oud journey", "중동 우드 여행음악"],
  ["Indian sitar magical tale", "인도 시타르 마법 이야기"],
  ["reggae sunshine children", "레게 햇살 어린이 음악"],
  ["hip hop kid friendly groove", "어린이 친화 힙합 그루브"],
  ["EDM festival cute adventure", "EDM 귀여운 모험"],
  ["8-bit retro game story", "8비트 레트로 게임 스토리"],
  ["musical theater ensemble", "뮤지컬 극장 앙상블"],
  ["choir and organ sacred wonder", "합창과 오르간의 경이로움"],
  ["epic hybrid orchestral trailer", "에픽 하이브리드 오케스트라 트레일러"],
  ["premium worship ballad", "프리미엄 워십 발라드"]
];

const sampleProjects = [
  {
    category: "fairytale",
    idea: "숲속 우체국을 운영하는 작은 별 루미가 아이들의 잃어버린 꿈을 새벽 전에 배달하는 동화",
    characters: "루미: 은빛 머리, 노란 우체부 가방, 따뜻한 별빛을 내는 작은 별. 모모: 파란 조끼와 둥근 안경을 쓴 달토끼 조력자.",
    audience: "초등 저학년과 가족",
    visualStyle: "premium watercolor storybook",
    sceneCount: 5,
    duration: "12 seconds",
    musicStyle: "warm orchestral lullaby",
    musicPrompt: "따뜻하고 신비로운 숲속 우체국 분위기, 어린이 합창은 작게, 멜로디는 쉽게 기억되게"
  },
  {
    category: "fairytale",
    idea: "구름 위 빵집에서 날씨 모양 쿠키를 굽는 아이가 비 오는 마을에 웃음을 되찾아 주는 동화",
    characters: "미루: 하늘색 앞치마를 입은 구름 빵집 아이, 밀가루가 묻은 볼. 포포: 작은 바람 요정, 은색 리본과 둥근 눈.",
    audience: "유아와 초등 저학년",
    visualStyle: "soft pastel bedtime storybook",
    sceneCount: 6,
    duration: "12 seconds",
    musicStyle: "magical celesta fairytale",
    musicPrompt: "포근한 구름, 작은 종소리, 달콤하고 밝은 멜로디, 잠자리 동화처럼 부드럽게"
  },
  {
    category: "fairytale",
    idea: "말을 잃어버린 그림자가 용기를 배우며 주인공 아이와 함께 별빛 극장에 오르는 이야기",
    characters: "라온: 노란 망토를 두른 조용한 아이. 그림자 친구: 둥근 실루엣, 반짝이는 눈, 무섭지 않고 귀여운 모습.",
    audience: "감정 표현을 배우는 어린이",
    visualStyle: "dreamy magical realism picture book",
    sceneCount: 7,
    duration: "15 seconds",
    musicStyle: "mystery music box",
    musicPrompt: "오르골과 피아노 중심, 살짝 신비롭지만 따뜻하게, 후반부는 용기 있게 상승"
  },
  {
    category: "fairytale",
    idea: "잠든 책들이 밤마다 살아나는 도서관에서 아이가 사라진 마지막 페이지를 찾는 모험 동화",
    characters: "이안: 초록 가디건과 작은 책가방을 멘 독서가. 책지기 고양이 인형: 움직이는 천 인형, 금색 단추 눈.",
    audience: "책 읽기를 좋아하는 어린이와 부모",
    visualStyle: "vintage ink and watercolor storybook",
    sceneCount: 8,
    duration: "20 seconds",
    musicStyle: "jazz waltz storybook",
    musicPrompt: "도서관 밤 분위기, 재즈 왈츠, 콘트라베이스는 작게, 피아노와 클라리넷 중심"
  },
  {
    category: "fairytale",
    idea: "작은 씨앗 요정이 계절 편지를 배달하며 얼어붙은 정원에 봄을 깨우는 동화책 이야기",
    characters: "보리: 초록 모자와 씨앗 가방을 든 작은 요정. 겨울새: 하얀 깃털과 파란 목도리, 조용한 안내자.",
    audience: "자연과 계절을 배우는 어린이",
    visualStyle: "gouache children's book illustration",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "folk acoustic storytelling",
    musicPrompt: "어쿠스틱 기타와 플루트, 봄이 다가오는 느낌, 따뜻하고 희망적인 멜로디"
  },
  {
    category: "documentary",
    idea: "사라져가는 전통 시장의 장인들을 따라가며 손맛과 기억을 기록하는 감성 다큐멘터리",
    characters: "시장 사진작가 지안: 낡은 필름카메라를 들고 다니는 관찰자. 떡 장인 할머니: 느리지만 단단한 손길과 따뜻한 미소.",
    audience: "청소년과 가족 시청자",
    visualStyle: "modern Korean children's editorial illustration",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "documentary orchestral score",
    musicPrompt: "담백한 다큐멘터리 톤, 피아노와 현악 중심, 과장 없이 따뜻한 회상 분위기"
  },
  {
    category: "documentary",
    idea: "도시의 오래된 간판을 따라 동네의 변화와 사람들의 기억을 기록하는 짧은 관찰 다큐",
    characters: "기록자 민재: 회색 점퍼와 소형 카메라. 간판 수리공: 낡은 공구가방과 차분한 표정.",
    audience: "지역 문화에 관심 있는 청소년",
    visualStyle: "modern Korean children's editorial illustration",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "historical documentary strings",
    musicPrompt: "잔잔한 현악과 낮은 피아노, 오래된 기억을 따라가는 다큐멘터리 톤"
  },
  {
    category: "documentary",
    idea: "새벽 배송 일을 하는 사람들의 하루를 어린이 눈높이로 보여주는 직업 다큐 영상",
    characters: "하루: 질문을 많이 하는 어린 리포터, 빨간 모자. 배송 기사: 파란 조끼와 미소, 안전을 중요하게 여김.",
    audience: "직업 체험을 배우는 초등학생",
    visualStyle: "bright educational children's book",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "documentary orchestral score",
    musicPrompt: "활기 있지만 과장되지 않게, 마림바와 피아노로 새벽의 움직임 표현"
  },
  {
    category: "documentary",
    idea: "바닷가 마을의 해녀와 아이들이 바다를 지키는 방법을 배우는 휴먼 다큐",
    characters: "소라: 바다를 좋아하는 아이, 줄무늬 티셔츠. 해녀 선생님: 검은 잠수복과 주황 테왁, 단단하고 따뜻한 인상.",
    audience: "해양 문화와 환경을 배우는 가족",
    visualStyle: "cozy Korean picture book",
    sceneCount: 9,
    duration: "30 seconds",
    musicStyle: "nature documentary ambient",
    musicPrompt: "파도 같은 패드, 낮은 현악, 제주 바다의 숨결처럼 차분하고 따뜻하게"
  },
  {
    category: "documentary",
    idea: "작은 초등학교의 하루를 따라가며 교실, 운동장, 급식실의 소중한 순간을 담는 학교 다큐",
    characters: "나래: 방송부 어린이 기자, 노란 명찰. 담임 선생님: 베이지 카디건과 부드러운 미소.",
    audience: "학교생활을 시작하는 어린이",
    visualStyle: "colored pencil picture book texture",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "bright acoustic children song",
    musicPrompt: "밝은 우쿨렐레와 박수 리듬, 학교 아침처럼 명랑하고 편안하게"
  },
  {
    category: "traditional",
    idea: "조선 시대 별자리 지도를 복원하는 아이들이 시간의 문을 열고 옛 천문학자를 만나는 역사 모험",
    characters: "하린: 호기심 많은 별 관찰자, 남색 두루마기와 작은 나침반. 윤서: 기록을 좋아하는 친구, 붉은 책끈과 붓통.",
    audience: "초등 고학년 역사 콘텐츠 시청자",
    visualStyle: "cinematic storybook concept art",
    sceneCount: 10,
    duration: "20 seconds",
    musicStyle: "Korean traditional fusion fairytale",
    musicPrompt: "가야금과 해금이 중심, 신비로운 시간여행 느낌, 전통과 판타지가 섞인 웅장함"
  },
  {
    category: "traditional",
    idea: "달빛 축제에서 사라진 북소리를 찾아 떠나는 마을 아이들의 전통 음악 판타지",
    characters: "소율: 작은 장구를 멘 아이, 민트색 한복 조끼. 바람도깨비는 쓰지 않음. 단비: 소고를 든 친구, 밝고 빠른 움직임.",
    audience: "전통문화 입문 어린이와 보호자",
    visualStyle: "classic hand-painted fairytale illustration",
    sceneCount: 6,
    duration: "12 seconds",
    musicStyle: "samulnori percussion fusion",
    musicPrompt: "장구와 꽹과리 리듬은 경쾌하게, 동화적인 현악 패드와 섞어서 너무 무섭지 않게"
  },
  {
    category: "traditional",
    idea: "한지 공방에서 아이가 찢어진 등불을 고치며 종이의 결, 빛, 오래된 손기술을 배우는 전통문화 영상",
    characters: "다온: 흰 작업 앞치마와 작은 붓. 한지 장인: 회색 두루마기 앞치마, 주름진 손과 온화한 눈빛.",
    audience: "전통 공예를 배우는 어린이",
    visualStyle: "miniature paper theater illustration",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "gayageum ambient fusion",
    musicPrompt: "가야금과 부드러운 패드, 종이와 빛의 섬세함을 살린 조용한 음악"
  },
  {
    category: "traditional",
    idea: "궁궐 처마 밑 작은 그림 문양들이 살아나 사라진 색을 찾는 한국 전통 색채 동화",
    characters: "아린: 색동 소매와 작은 물감 상자. 단청새: 다섯 색 날개를 가진 작은 안내자.",
    audience: "한국 전통색을 배우는 초등학생",
    visualStyle: "classic hand-painted fairytale illustration",
    sceneCount: 8,
    duration: "15 seconds",
    musicStyle: "haegeum cinematic ballad",
    musicPrompt: "해금 선율과 잔잔한 타악, 궁궐의 넓은 공간감과 색의 신비로움"
  },
  {
    category: "traditional",
    idea: "마을 할머니의 옛이야기 속 호롱불을 따라 아이들이 절기와 세시풍속을 배우는 교육형 동화",
    characters: "윤하: 밤색 조끼와 작은 수첩. 이야기 할머니: 보라색 숄과 따뜻한 손짓.",
    audience: "절기 문화를 배우는 가족",
    visualStyle: "cozy Korean picture book",
    sceneCount: 6,
    duration: "30 seconds",
    musicStyle: "traditional Korean gugak",
    musicPrompt: "피리와 장구를 부드럽게, 옛이야기를 듣는 듯 느긋하고 정겨운 분위기"
  },
  {
    category: "environment",
    idea: "바닷속 플라스틱 섬을 청소하는 어린 고래와 잠수부 친구들의 환경 다큐형 애니메이션",
    characters: "나루: 작은 푸른 고래, 등 위에 흰 점무늬. 미나: 노란 잠수 헬멧을 쓴 어린 탐험가, 용감하고 침착함.",
    audience: "환경 교육을 배우는 어린이",
    visualStyle: "soft 3D animated film",
    sceneCount: 7,
    duration: "15 seconds",
    musicStyle: "nature documentary ambient",
    musicPrompt: "물결 소리 같은 패드, 부드러운 피아노, 희망적인 후반부 상승"
  },
  {
    category: "environment",
    idea: "말라가는 도시 옥상정원에 아이들이 빗물 저장 장치를 만들며 생태 순환을 배우는 이야기",
    characters: "서우: 초록 장화와 물뿌리개. 루루: 작은 참새 모양 드론, 날개에 파란 표시.",
    audience: "기후 교육을 배우는 초등학생",
    visualStyle: "bright educational children's book",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "science documentary electronic",
    musicPrompt: "깨끗한 신스와 피아노, 물방울 리듬, 문제 해결이 밝게 느껴지도록"
  },
  {
    category: "environment",
    idea: "숲의 소리가 사라진 이유를 찾아 아이들이 새, 벌, 나무의 신호를 기록하는 자연 탐사 영상",
    characters: "린: 녹음기를 든 탐사 아이, 카키색 조끼. 솔: 느린 말투의 나무 안내자, 잎사귀 왕관.",
    audience: "자연 관찰을 좋아하는 어린이",
    visualStyle: "gouache children's book illustration",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "nature documentary ambient",
    musicPrompt: "숲 소리와 앰비언트 패드, 나무 사이 햇빛 같은 따뜻한 질감"
  },
  {
    category: "environment",
    idea: "재활용 로봇이 아이들과 함께 버려진 장난감을 새 작품으로 바꾸는 업사이클링 동화",
    characters: "비비: 집게팔이 달린 작은 재활용 로봇, 주황색 몸체. 태오: 작업 고글을 쓴 아이, 호기심 많음.",
    audience: "재활용 습관을 배우는 어린이",
    visualStyle: "clay diorama storybook scene",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "playful marimba and pizzicato",
    musicPrompt: "마림바와 피치카토, 뚝딱뚝딱 만드는 리듬, 유쾌하고 가볍게"
  },
  {
    category: "environment",
    idea: "북극의 작은 여우가 녹아가는 얼음 지도 위에서 친구들과 새로운 길을 찾는 기후 동화",
    characters: "누리: 하얀 북극여우, 파란 목도리. 하린: 빨간 털모자를 쓴 어린 탐험가, 지도통을 멤.",
    audience: "기후 변화 입문 어린이",
    visualStyle: "cinematic fantasy illustration",
    sceneCount: 9,
    duration: "20 seconds",
    musicStyle: "cinematic trailer gentle epic",
    musicPrompt: "차가운 패드와 따뜻한 현악의 대비, 위험보다 희망을 강조"
  },
  {
    category: "science",
    idea: "작은 로봇이 오래된 도서관에서 감정을 배우며 아이들에게 맞춤형 이야기를 추천하는 과학 교육 영상",
    characters: "토토: 둥근 화면 얼굴을 가진 작은 로봇, 하늘색 몸체와 노란 안테나. 유나: 책을 좋아하는 아이, 초록 가디건.",
    audience: "AI와 독서를 배우는 초등학생",
    visualStyle: "bright educational children's book",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "science documentary electronic",
    musicPrompt: "맑은 신스와 가벼운 전자음, 교육 영상처럼 밝고 명확한 리듬"
  },
  {
    category: "science",
    idea: "태양계 버스를 탄 아이들이 행성마다 다른 중력과 날씨를 체험하는 우주 과학 애니메이션",
    characters: "은별: 은색 우주복과 노란 헬멧. 버스 AI 노아: 둥근 파란 화면 얼굴, 친절한 안내 음성.",
    audience: "우주를 배우는 초등학생",
    visualStyle: "soft 3D animated film",
    sceneCount: 10,
    duration: "20 seconds",
    musicStyle: "science documentary electronic",
    musicPrompt: "우주적인 신스, 명확한 비트, 행성 이동마다 작은 사운드 변화"
  },
  {
    category: "science",
    idea: "보이지 않는 미생물 세계를 탐험하는 물방울 잠수함과 아이들의 생명과학 이야기",
    characters: "유리: 투명 고글과 파란 실험복. 물방울 잠수함: 둥근 유리 돔과 작은 프로펠러.",
    audience: "생명과학 입문 어린이",
    visualStyle: "bright educational children's book",
    sceneCount: 8,
    duration: "15 seconds",
    musicStyle: "bright acoustic children song",
    musicPrompt: "밝은 실로폰과 가벼운 드럼, 발견의 기쁨을 살린 교육 음악"
  },
  {
    category: "science",
    idea: "소리의 파형을 눈으로 볼 수 있는 마법 실험실에서 아이들이 음악과 물리를 함께 배우는 영상",
    characters: "도윤: 보라색 헤드폰과 실험 노트. 파형 요정: 빛나는 선으로 된 작은 캐릭터.",
    audience: "음악과 과학을 좋아하는 어린이",
    visualStyle: "cinematic storybook concept art",
    sceneCount: 7,
    duration: "12 seconds",
    musicStyle: "8-bit retro game story",
    musicPrompt: "전자음과 실로폰을 섞어 파형이 움직이는 느낌, 밝고 실험적인 리듬"
  },
  {
    category: "science",
    idea: "시간을 재는 작은 모래시계 로봇이 아이들에게 하루의 리듬과 시간 관리를 알려주는 교육 동화",
    characters: "티키: 모래시계 몸통을 가진 작은 로봇, 금색 테두리. 세아: 체크무늬 셔츠와 계획표를 든 아이.",
    audience: "생활 습관을 배우는 어린이",
    visualStyle: "paper cutout fairytale",
    sceneCount: 6,
    duration: "12 seconds",
    musicStyle: "modern neoclassical piano",
    musicPrompt: "규칙적인 피아노 패턴, 시계 초침 같은 작은 타악, 차분하고 긍정적인 분위기"
  },
  {
    category: "culture",
    idea: "세계 여러 나라의 아침 인사와 식탁 문화를 따라가며 서로 다른 생활 방식을 배우는 문화 탐방 영상",
    characters: "누리: 지구본 가방을 멘 어린 리포터. 아미: 작은 번역기 모양 친구, 둥근 화면과 파란 손잡이.",
    audience: "세계 문화를 배우는 초등학생",
    visualStyle: "bright educational children's book",
    sceneCount: 8,
    duration: "20 seconds",
    musicStyle: "folk acoustic storytelling",
    musicPrompt: "여러 나라 악기 느낌을 살짝 섞되 복잡하지 않게, 밝고 여행하는 분위기"
  },
  {
    category: "culture",
    idea: "동네 작은 영화관에서 아이들이 무성영화, 애니메이션, 뉴스릴의 역사를 체험하는 문화 예술 이야기",
    characters: "마루: 줄무늬 조끼와 팝콘 가방. 영화관 할아버지: 둥근 안경과 낡은 영사기 키를 가진 안내자.",
    audience: "영상 문화를 배우는 어린이",
    visualStyle: "vintage ink and watercolor storybook",
    sceneCount: 7,
    duration: "15 seconds",
    musicStyle: "jazz waltz storybook",
    musicPrompt: "빈티지 피아노와 클라리넷, 오래된 영화관의 따뜻한 감성"
  },
  {
    category: "culture",
    idea: "마을 도서관에서 열린 세계 그림책 축제에서 아이들이 각 나라의 이야기 방식을 배우는 영상",
    characters: "서아: 책갈피 목걸이를 한 아이. 리브: 날아다니는 작은 그림책, 금색 모서리와 부드러운 표정.",
    audience: "독서와 문화 다양성을 배우는 가족",
    visualStyle: "whimsical European picture book",
    sceneCount: 6,
    duration: "12 seconds",
    musicStyle: "musical theater ensemble",
    musicPrompt: "작은 극장처럼 밝은 앙상블, 아이들이 따라 부르기 쉬운 후렴"
  },
  {
    category: "culture",
    idea: "거리 벽화가 살아나 아이들에게 색, 공동체, 공공예술의 의미를 알려주는 문화 예술 애니메이션",
    characters: "지우: 물감 묻은 멜빵바지와 빨간 운동화. 벽화새: 색종이 날개와 둥근 눈.",
    audience: "미술과 공동체를 배우는 어린이",
    visualStyle: "cinematic storybook concept art",
    sceneCount: 7,
    duration: "15 seconds",
    musicStyle: "indie pop whimsical",
    musicPrompt: "가벼운 인디팝, 손뼉 리듬, 색이 퍼지는 느낌의 밝은 사운드"
  },
  {
    category: "culture",
    idea: "할머니의 오래된 사진첩 속 명절 음식과 놀이가 살아나 가족 문화의 의미를 알려주는 동화",
    characters: "하늘: 사진첩을 든 아이, 노란 니트. 할머니: 꽃무늬 앞치마와 따뜻한 미소.",
    audience: "가족 문화와 명절을 배우는 어린이",
    visualStyle: "cozy Korean picture book",
    sceneCount: 6,
    duration: "20 seconds",
    musicStyle: "Korean traditional fusion fairytale",
    musicPrompt: "가야금과 어쿠스틱 기타, 명절 아침처럼 포근하고 정겨운 분위기"
  },
  {
    category: "history",
    idea: "시간 우체통에 도착한 편지를 따라 아이들이 고대부터 현대까지 문자와 기록의 역사를 배우는 영상",
    characters: "연우: 갈색 탐험 조끼와 작은 돋보기. 시간 우체통: 청동색 몸체와 빛나는 우표 문양.",
    audience: "역사 입문 초등학생",
    visualStyle: "cinematic storybook concept art",
    sceneCount: 10,
    duration: "20 seconds",
    musicStyle: "historical documentary strings",
    musicPrompt: "현악과 낮은 북, 시간 여행의 긴장감은 작게, 발견의 감동은 크게"
  },
  {
    category: "history",
    idea: "박물관의 작은 토기 조각이 밤마다 말을 걸어 아이에게 옛 마을의 하루를 보여주는 역사 동화",
    characters: "도아: 박물관 수첩과 파란 가방. 토기 조각 친구: 갈색 무늬와 둥근 표정.",
    audience: "박물관 체험을 좋아하는 어린이",
    visualStyle: "classic hand-painted fairytale illustration",
    sceneCount: 7,
    duration: "15 seconds",
    musicStyle: "documentary orchestral score",
    musicPrompt: "잔잔한 다큐 현악, 유물의 기억이 조심스럽게 깨어나는 분위기"
  },
  {
    category: "history",
    idea: "옛 지도 속 사라진 길을 따라 아이들이 항해, 교역, 만남의 역사를 배우는 모험 영상",
    characters: "준: 작은 망원경과 남색 코트. 지도 나침반: 금색 테두리와 움직이는 바늘.",
    audience: "세계사와 지리를 배우는 어린이",
    visualStyle: "storybook cover art premium publishing",
    sceneCount: 9,
    duration: "20 seconds",
    musicStyle: "adventure marching orchestra",
    musicPrompt: "모험 오케스트라, 경쾌한 북과 현악, 넓은 바다를 떠나는 느낌"
  },
  {
    category: "history",
    idea: "옛날 학교의 종소리를 따라 아이들이 서당, 교실, 온라인 수업까지 배움의 변화를 살펴보는 교육 역사 영상",
    characters: "민서: 책보를 멘 아이. 종소리 요정: 작은 놋종 모자와 빛나는 꼬리.",
    audience: "학교와 배움의 역사를 배우는 초등학생",
    visualStyle: "modern Korean children's editorial illustration",
    sceneCount: 8,
    duration: "15 seconds",
    musicStyle: "bright acoustic children song",
    musicPrompt: "밝은 어쿠스틱 리듬, 옛것과 새것이 자연스럽게 이어지는 느낌"
  },
  {
    category: "history",
    idea: "성곽을 따라 걷는 아이들이 마을을 지킨 사람들의 협력과 지혜를 배우는 역사 다큐형 애니메이션",
    characters: "태린: 초록 모자와 작은 깃발. 성곽 안내자: 돌무늬 망토와 부드러운 목소리.",
    audience: "지역 역사 탐방 가족",
    visualStyle: "gouache children's book illustration",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "grand symphonic classical",
    musicPrompt: "웅장하지만 어린이에게 부담 없게, 호른과 현악으로 성곽의 규모감 표현"
  },
  {
    category: "life",
    idea: "아침 준비가 어려운 아이가 작은 루틴 요정과 함께 씻기, 옷 입기, 가방 챙기기를 배우는 생활 습관 영상",
    characters: "서준: 잠이 많은 아이, 체크 잠옷. 루틴 요정: 작은 알람시계 날개와 민트색 모자.",
    audience: "생활 습관을 배우는 유아와 초등 저학년",
    visualStyle: "soft pastel bedtime storybook",
    sceneCount: 6,
    duration: "12 seconds",
    musicStyle: "bright acoustic children song",
    musicPrompt: "가볍고 명랑한 아침 음악, 박수와 우쿨렐레, 따라 하기 쉬운 리듬"
  },
  {
    category: "life",
    idea: "친구와 장난감을 나누기 어려운 아이가 감정 색깔 카드를 통해 배려를 배우는 생활 동화",
    characters: "유찬: 빨간 자동차 장난감을 든 아이. 색깔 카드 친구: 둥근 카드 캐릭터, 표정이 다양함.",
    audience: "사회성을 배우는 어린이",
    visualStyle: "colored pencil picture book texture",
    sceneCount: 5,
    duration: "15 seconds",
    musicStyle: "soft piano bedtime story",
    musicPrompt: "부드러운 피아노와 작은 실로폰, 감정을 차분히 이해하는 느낌"
  },
  {
    category: "life",
    idea: "비 오는 날 집 안에서 가족이 함께 요리하며 안전, 순서, 협동을 배우는 생활 교육 영상",
    characters: "다빈: 노란 앞치마와 작은 계량컵. 아빠: 파란 앞치마와 둥근 안경.",
    audience: "가족 생활 교육 콘텐츠 시청자",
    visualStyle: "cozy bedtime nursery illustration",
    sceneCount: 6,
    duration: "20 seconds",
    musicStyle: "bossa nova sunny morning",
    musicPrompt: "비 오는 날 실내의 포근함, 보사노바 리듬은 아주 부드럽게"
  },
  {
    category: "life",
    idea: "처음 스마트폰을 갖게 된 아이가 약속, 시간, 예절을 배우는 디지털 생활 습관 이야기",
    characters: "로아: 보라색 휴대폰 케이스와 작은 스티커. 약속 알림이: 말풍선 모양 안내 캐릭터.",
    audience: "디지털 예절을 배우는 초등학생",
    visualStyle: "bright educational children's book",
    sceneCount: 7,
    duration: "15 seconds",
    musicStyle: "lofi cozy study beat",
    musicPrompt: "차분한 로파이 비트, 디지털 알림음은 귀엽고 작게, 집중하기 좋은 톤"
  },
  {
    category: "life",
    idea: "잠들기 전 걱정이 많은 아이가 숨 고르기와 감사 일기를 통해 마음을 정리하는 생활 동화",
    characters: "은호: 파란 이불과 작은 별 베개. 마음 램프: 따뜻한 빛을 내는 작은 램프 캐릭터.",
    audience: "마음 돌봄이 필요한 어린이",
    visualStyle: "dreamy magical realism picture book",
    sceneCount: 6,
    duration: "30 seconds",
    musicStyle: "ambient piano meditation",
    musicPrompt: "느린 피아노와 따뜻한 패드, 숨을 고르는 듯한 여백, 안정적인 밤 분위기"
  },
  {
    category: "education",
    idea: "말하기가 부끄러운 아이가 발표 요정과 함께 목소리 크기, 눈맞춤, 순서를 연습하는 교육 영상",
    characters: "지민: 작은 발표 카드를 든 아이. 발표 요정: 마이크 모양 지팡이와 초록 날개.",
    audience: "발표 연습을 하는 초등학생",
    visualStyle: "bright educational children's book",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "K-pop children's chorus",
    musicPrompt: "밝은 어린이 합창과 손뼉 리듬, 자신감이 커지는 느낌"
  },
  {
    category: "education",
    idea: "숫자 마을에서 길을 잃은 아이가 덧셈 다리와 뺄셈 터널을 지나 수학 개념을 배우는 애니메이션",
    characters: "하준: 숫자 배지를 단 아이. 더하기 토끼: 초록 귀와 플러스 가방.",
    audience: "기초 수학을 배우는 어린이",
    visualStyle: "paper cutout fairytale",
    sceneCount: 7,
    duration: "12 seconds",
    musicStyle: "playful marimba and pizzicato",
    musicPrompt: "톡톡 튀는 마림바와 피치카토, 문제를 풀 때마다 짧은 상승음"
  },
  {
    category: "education",
    idea: "글자 숲에서 모음과 자음이 길을 만들며 아이에게 한글 읽기의 원리를 알려주는 교육 동화",
    characters: "나린: 노란 연필 모자와 초록 책가방. 글자 나무: 자음 잎사귀와 모음 열매.",
    audience: "한글을 배우는 유아와 초등 저학년",
    visualStyle: "modern Korean children's editorial illustration",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "bright acoustic children song",
    musicPrompt: "밝은 우쿨렐레와 실로폰, 한글 리듬이 말놀이처럼 느껴지게"
  },
  {
    category: "education",
    idea: "책상 위 작은 계획표가 살아나 아이에게 숙제 쪼개기와 쉬는 시간 계획을 알려주는 자기주도학습 영상",
    characters: "시우: 파란 필통과 체크리스트. 계획표 친구: 네모난 얼굴과 색깔 스티커.",
    audience: "학습 습관을 만드는 초등학생",
    visualStyle: "cozy Korean picture book",
    sceneCount: 6,
    duration: "20 seconds",
    musicStyle: "lofi cozy study beat",
    musicPrompt: "편안한 로파이, 작고 규칙적인 비트, 집중을 방해하지 않는 배경음"
  },
  {
    category: "education",
    idea: "작은 과학 기자단이 학교 급식의 영양소를 취재하며 균형 잡힌 식사를 배우는 교육 다큐",
    characters: "예린: 기자 수첩과 당근 배지. 영양 선생님: 흰 가운과 과일 무늬 스카프.",
    audience: "건강한 식습관을 배우는 어린이",
    visualStyle: "bright educational children's book",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "documentary orchestral score",
    musicPrompt: "밝은 다큐멘터리 톤, 피아노와 가벼운 퍼커션, 건강하고 명확한 느낌"
  },
  {
    category: "religion",
    idea: "세계 여러 종교의 공간에서 사람들이 조용히 기도하고 감사하는 모습을 존중의 관점으로 배우는 문화 교육 영상",
    characters: "하람: 작은 노트와 흰 셔츠. 안내자 라미: 둥근 등불 모양 캐릭터, 차분한 표정.",
    audience: "다양성과 존중을 배우는 청소년",
    visualStyle: "modern Korean children's editorial illustration",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "choir and organ sacred wonder",
    musicPrompt: "차분한 합창과 오르간, 특정 종교를 선전하지 않고 존중과 평화의 분위기"
  },
  {
    category: "religion",
    idea: "마을 축제에서 서로 다른 믿음을 가진 가족들이 감사, 나눔, 배려의 공통 가치를 발견하는 이야기",
    characters: "라엘: 작은 등불을 든 아이. 미소 할머니: 회색 숄과 따뜻한 손짓.",
    audience: "공동체와 존중을 배우는 가족",
    visualStyle: "cozy Korean picture book",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "warm orchestral lullaby",
    musicPrompt: "따뜻한 현악과 합창 패드, 평화롭고 포용적인 공동체 분위기"
  },
  {
    category: "religion",
    idea: "고요한 사원 정원에서 아이가 침묵, 호흡, 마음챙김의 의미를 배우는 명상 교육 영상",
    characters: "유나: 연보라색 가디건과 작은 돌멩이. 정원 안내자: 종이등 모양 캐릭터, 아주 차분함.",
    audience: "마음챙김을 배우는 어린이와 보호자",
    visualStyle: "dreamy ambient story score",
    sceneCount: 6,
    duration: "30 seconds",
    musicStyle: "ambient piano meditation",
    musicPrompt: "느린 피아노와 긴 여백, 종소리는 작게, 안정적이고 명상적인 분위기"
  },
  {
    category: "religion",
    idea: "오래된 성당의 스테인드글라스 빛을 따라 아이가 예술, 건축, 상징을 배우는 문화사 영상",
    characters: "노엘: 스케치북과 남색 코트. 빛 조각 친구: 색유리 조각처럼 반짝이는 작은 안내자.",
    audience: "종교 예술과 건축을 배우는 학생",
    visualStyle: "cinematic storybook concept art",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "classical chamber strings",
    musicPrompt: "실내악 현악과 부드러운 합창 질감, 빛이 천천히 번지는 느낌"
  },
  {
    category: "religion",
    idea: "명절과 의식 속 음식, 음악, 옷차림을 비교하며 믿음이 생활 문화와 만나는 방식을 배우는 중립적 교육 콘텐츠",
    characters: "서진: 문화 비교 카드와 초록 가방. 지도 친구: 세계지도 모양 캐릭터, 편견 없는 안내자.",
    audience: "세계 시민 교육을 배우는 초등 고학년",
    visualStyle: "bright educational children's book",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "documentary orchestral score",
    musicPrompt: "중립적인 교육 다큐 톤, 피아노와 현악, 존중과 관찰 중심의 음악"
  },
  {
    category: "christianity",
    idea: "작은 교회 종소리를 따라 아이들이 감사, 나눔, 이웃 사랑의 의미를 배우는 따뜻한 기독교 문화 이야기",
    characters: "하은: 작은 감사 노트를 든 아이, 하늘색 카디건. 종소리 안내자: 작은 금색 종 모양 캐릭터, 차분하고 친절함.",
    audience: "기독교 문화와 감사의 가치를 배우는 어린이",
    visualStyle: "soft pastel bedtime storybook",
    sceneCount: 6,
    duration: "20 seconds",
    musicStyle: "choir and organ sacred wonder",
    musicPrompt: "부드러운 어린이 합창과 따뜻한 오르간, 설교처럼 무겁지 않고 감사와 평화 중심"
  },
  {
    category: "christianity",
    idea: "스테인드글라스 빛이 그림처럼 움직이며 아이에게 성경 속 비유를 어린이 눈높이로 설명하는 교육 영상",
    characters: "유엘: 스케치북을 든 아이, 남색 조끼. 빛 조각 친구: 색유리처럼 반짝이는 작은 안내자.",
    audience: "기독교 상징과 이야기를 배우는 초등학생",
    visualStyle: "cinematic storybook concept art",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "classical chamber strings",
    musicPrompt: "실내악 현악과 은은한 합창 질감, 스테인드글라스 빛이 퍼지는 경건하고 따뜻한 분위기"
  },
  {
    category: "christianity",
    idea: "크리스마스 전날 작은 마을 아이들이 이웃에게 편지와 빵을 나누며 사랑의 의미를 발견하는 동화",
    characters: "노엘: 빨간 목도리와 작은 바구니. 미리: 초록 코트와 별 모양 편지 봉투.",
    audience: "가족과 함께 보는 크리스마스 동화 시청자",
    visualStyle: "cozy bedtime nursery illustration",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "Christmas fairytale bells",
    musicPrompt: "따뜻한 종소리, 부드러운 현악, 어린이 합창은 작게, 크리스마스의 나눔과 설렘"
  },
  {
    category: "christianity",
    idea: "아이들이 작은 봉사 프로젝트를 준비하며 기도, 협력, 배려가 생활 속에서 어떻게 이어지는지 배우는 교육 콘텐츠",
    characters: "준호: 체크 셔츠와 봉사 배지. 다솜: 노란 앞치마와 작은 꽃다발.",
    audience: "기독교 가치와 봉사를 배우는 어린이",
    visualStyle: "bright educational children's book",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "bright acoustic children song",
    musicPrompt: "밝은 어쿠스틱 기타와 손뼉 리듬, 함께 돕는 기쁨을 표현하는 명랑한 음악"
  },
  {
    category: "christianity",
    idea: "작은 성가대에 처음 선 아이가 떨림을 이겨내고 친구들과 함께 따뜻한 노래를 부르는 성장 이야기",
    characters: "리아: 흰 셔츠와 파란 리본, 긴장한 표정에서 점점 밝아짐. 성가대 친구들: 다양한 키와 표정의 아이들.",
    audience: "음악과 용기를 배우는 어린이",
    visualStyle: "gouache children's book illustration",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "K-pop children's chorus",
    musicPrompt: "어린이 합창 중심, K-pop 발라드 느낌을 살짝 섞되 차분하고 따뜻하게"
  },
  {
    category: "buddhism",
    idea: "고요한 절 마당에서 아이가 풍경 소리와 함께 호흡, 자비, 마음챙김을 배우는 불교 문화 교육 영상",
    characters: "도윤: 연한 베이지색 조끼와 작은 수첩. 풍경 친구: 작은 종 모양 캐릭터, 은은하게 빛남.",
    audience: "마음챙김과 불교 문화를 배우는 어린이",
    visualStyle: "dreamy magical realism picture book",
    sceneCount: 6,
    duration: "30 seconds",
    musicStyle: "ambient piano meditation",
    musicPrompt: "느린 피아노와 풍경 소리, 긴 여백, 차분한 호흡과 평화로운 정원 분위기"
  },
  {
    category: "buddhism",
    idea: "연등 축제 준비를 돕는 아이들이 빛, 소원, 나눔의 의미를 배우는 따뜻한 불교 문화 동화",
    characters: "연우: 노란 연등을 든 아이, 초록 두루마기 조끼. 연등 요정: 작은 빛 알갱이와 둥근 표정.",
    audience: "전통 축제와 불교 문화를 배우는 가족",
    visualStyle: "classic hand-painted fairytale illustration",
    sceneCount: 8,
    duration: "20 seconds",
    musicStyle: "gayageum ambient fusion",
    musicPrompt: "가야금과 부드러운 패드, 연등 빛이 천천히 퍼지는 포근하고 명상적인 분위기"
  },
  {
    category: "buddhism",
    idea: "사찰 숲길을 걷는 아이가 나뭇잎, 물소리, 돌탑을 보며 자연과 연결된 마음을 배우는 명상형 영상",
    characters: "서하: 갈색 운동화와 작은 물병. 숲길 안내자: 잎사귀 모양의 작은 친구, 조용하고 친근함.",
    audience: "자연 명상과 감정 안정을 배우는 어린이",
    visualStyle: "cozy Korean picture book",
    sceneCount: 7,
    duration: "30 seconds",
    musicStyle: "nature documentary ambient",
    musicPrompt: "물소리 같은 앰비언트, 낮은 현악과 플루트, 숲길을 천천히 걷는 평온함"
  },
  {
    category: "buddhism",
    idea: "작은 목탁 소리를 따라 아이가 화가 났을 때 멈추고 바라보고 말하는 방법을 배우는 마음 교육 콘텐츠",
    characters: "민재: 빨간 후드와 찡그린 표정에서 차분해지는 아이. 목탁 친구: 둥근 나무 캐릭터와 작은 미소.",
    audience: "감정 조절을 배우는 초등학생",
    visualStyle: "bright educational children's book",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "soft piano bedtime story",
    musicPrompt: "작은 목탁 리듬과 부드러운 피아노, 감정이 가라앉는 과정을 따뜻하게 표현"
  },
  {
    category: "buddhism",
    idea: "오래된 탑의 그림자가 아이에게 시간, 기다림, 선한 마음의 씨앗을 알려주는 불교 상징 이야기",
    characters: "나겸: 흰 셔츠와 남색 가방. 탑 그림자 친구: 부드러운 회색 실루엣, 무섭지 않고 지혜로운 표정.",
    audience: "불교 상징과 인내의 가치를 배우는 어린이",
    visualStyle: "vintage ink and watercolor storybook",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "Korean traditional fusion fairytale",
    musicPrompt: "해금과 가야금, 아주 느린 타악, 오래된 탑의 시간감과 따뜻한 깨달음"
  },
  {
    category: "advertising",
    idea: "친환경 어린이 물병 브랜드를 소개하는 짧은 광고 영상, 제품의 안전함과 재사용 가치를 동화적인 장면으로 전달",
    characters: "초록 물병 캐릭터: 둥근 실루엣과 잎사귀 스티커. 어린 모델 민아: 노란 우비와 밝은 미소.",
    audience: "어린이 제품을 찾는 부모와 가족",
    visualStyle: "soft 3D animated film",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "K-pop bright dance pop",
    musicPrompt: "밝은 광고 음악, 짧고 기억되는 후렴, 친환경과 신뢰감을 주는 경쾌한 사운드"
  },
  {
    category: "advertising",
    idea: "동화책 구독 서비스를 홍보하는 브랜드 필름, 매달 문 앞에 새로운 이야기가 도착하는 설렘을 표현",
    characters: "책 배달 요정: 작은 모자와 리본 달린 책가방. 아이 독자: 파란 잠옷과 별 베개.",
    audience: "유아·초등 자녀를 둔 보호자",
    visualStyle: "storybook cover art premium publishing",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "magical celesta fairytale",
    musicPrompt: "반짝이는 첼레스타와 따뜻한 현악, 구독 선물 같은 설렘과 프리미엄 느낌"
  },
  {
    category: "advertising",
    idea: "어린이 미술 키트를 소개하는 SNS 숏폼 광고, 빈 종이가 상상 속 세계로 변하는 과정을 빠르게 보여줌",
    characters: "아트키트 상자 캐릭터: 알록달록한 손잡이와 웃는 얼굴. 지호: 물감 묻은 앞치마와 큰 붓.",
    audience: "창의 놀이를 찾는 가족",
    visualStyle: "bright educational children's book",
    sceneCount: 5,
    duration: "12 seconds",
    musicStyle: "EDM festival cute adventure",
    musicPrompt: "짧고 에너지 있는 숏폼 광고 음악, 귀여운 EDM, 제품 등장 순간에 밝은 효과음"
  },
  {
    category: "advertising",
    idea: "지역 도서관 어린이 프로그램 홍보 영상, 책 읽기·만들기·공연을 하루 여정처럼 소개",
    characters: "도서관 안내 캐릭터: 책갈피 모양 얼굴과 초록 리본. 어린 참가자들: 다양한 옷차림과 호기심 많은 표정.",
    audience: "지역 가족과 초등학생",
    visualStyle: "modern Korean children's editorial illustration",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "bright acoustic children song",
    musicPrompt: "밝은 어쿠스틱 광고 음악, 도서관의 친근함과 가족 참여 느낌"
  },
  {
    category: "advertising",
    idea: "어린이 영어 학습 앱을 소개하는 광고 영상, 캐릭터와 대화하며 단어를 자연스럽게 배우는 장면 구성",
    characters: "앱 마스코트 보보: 파란 헤드셋과 둥근 화면 얼굴. 수아: 초록 후드티와 태블릿.",
    audience: "초등 영어 학습을 시작하는 가족",
    visualStyle: "soft 3D animated film",
    sceneCount: 6,
    duration: "15 seconds",
    musicStyle: "K-pop children's chorus",
    musicPrompt: "어린이 합창과 팝 리듬, 학습 앱 광고처럼 명확하고 긍정적인 멜로디"
  },
  {
    category: "travel",
    idea: "기차를 타고 떠나는 가족 국내 여행 영상, 역, 시장, 바다, 숙소의 하루를 동화책처럼 소개",
    characters: "여행 기록자 다온: 카메라 목걸이와 민트색 모자. 기차표 친구: 작은 종이 티켓 캐릭터.",
    audience: "가족 여행을 계획하는 시청자",
    visualStyle: "cozy Korean picture book",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "folk acoustic storytelling",
    musicPrompt: "어쿠스틱 기타와 가벼운 퍼커션, 여행 브이로그처럼 설레고 편안한 분위기"
  },
  {
    category: "travel",
    idea: "제주 숲길과 바닷길을 따라 걷는 어린이 자연 여행 영상, 바람·돌·파도 소리를 장면별로 담음",
    characters: "하루: 작은 지도와 주황색 바람막이. 바람돌이: 바람 모양의 작은 안내자.",
    audience: "자연 여행을 좋아하는 가족",
    visualStyle: "cinematic fantasy illustration",
    sceneCount: 9,
    duration: "30 seconds",
    musicStyle: "nature documentary ambient",
    musicPrompt: "파도와 바람 느낌의 앰비언트, 플루트와 낮은 현악, 제주 자연의 여백"
  },
  {
    category: "travel",
    idea: "세계 도시의 아침을 비교하는 교육 여행 영상, 빵집, 버스정류장, 공원, 학교 앞 풍경을 보여줌",
    characters: "리포터 유진: 빨간 캐리어와 작은 마이크. 지도 스티커 친구: 세계지도 모양의 안내 캐릭터.",
    audience: "세계 문화를 배우는 어린이",
    visualStyle: "whimsical European picture book",
    sceneCount: 10,
    duration: "20 seconds",
    musicStyle: "French musette accordion",
    musicPrompt: "가벼운 아코디언과 여행 리듬, 도시마다 작은 악기 색깔 변화"
  },
  {
    category: "travel",
    idea: "박물관과 유적지를 하루 동안 둘러보는 역사 여행 영상, 아이가 스탬프북을 채워가며 배우는 구성",
    characters: "서율: 스탬프북과 남색 배낭. 스탬프 요정: 둥근 도장 모양 캐릭터.",
    audience: "체험학습을 준비하는 가족",
    visualStyle: "vintage ink and watercolor storybook",
    sceneCount: 8,
    duration: "30 seconds",
    musicStyle: "historical documentary strings",
    musicPrompt: "역사 여행 다큐 톤, 현악과 피아노, 배움과 탐험의 균형"
  },
  {
    category: "travel",
    idea: "밤하늘 별 관측 캠핑 여행 영상, 텐트 설치부터 별자리 찾기까지 어린이 눈높이로 소개",
    characters: "우주 캠퍼 리안: 보라색 후드와 별자리 손전등. 텐트 친구: 작은 초록 텐트 캐릭터.",
    audience: "캠핑과 우주를 좋아하는 어린이",
    visualStyle: "dreamy magical realism picture book",
    sceneCount: 7,
    duration: "20 seconds",
    musicStyle: "dreamy ambient story score",
    musicPrompt: "몽환적인 패드와 피아노, 별이 나타날 때 반짝이는 종소리"
  },
  {
    category: "interview",
    idea: "동화 작가를 인터뷰하며 아이디어가 한 권의 책이 되는 과정을 보여주는 교육 인터뷰 영상",
    characters: "어린 진행자 나래: 작은 마이크와 노란 재킷. 작가 선생님: 둥근 안경과 스케치북.",
    audience: "창작 과정을 배우는 어린이와 예비 작가",
    visualStyle: "modern Korean children's editorial illustration",
    sceneCount: 6,
    duration: "30 seconds",
    musicStyle: "lofi cozy study beat",
    musicPrompt: "인터뷰 배경음악, 말소리를 방해하지 않는 로파이, 따뜻하고 집중되는 톤"
  },
  {
    category: "interview",
    idea: "전통 공예 장인을 인터뷰하며 손기술, 재료, 기다림의 가치를 어린이에게 설명하는 영상",
    characters: "진행자 도하: 초록 조끼와 질문 카드. 공예 장인: 흰 앞치마와 나무 도구.",
    audience: "전통문화와 직업을 배우는 초등학생",
    visualStyle: "cozy Korean picture book",
    sceneCount: 7,
    duration: "30 seconds",
    musicStyle: "gayageum ambient fusion",
    musicPrompt: "가야금과 낮은 패드, 인터뷰 말소리를 살리는 잔잔한 전통 퓨전 음악"
  },
  {
    category: "interview",
    idea: "어린 과학자가 실험 실패와 성공 경험을 이야기하는 과학 인터뷰 영상",
    characters: "어린 과학자 유빈: 흰 실험복과 보라색 고글. 진행자 민: 파란 마이크와 질문 노트.",
    audience: "과학 탐구를 좋아하는 어린이",
    visualStyle: "bright educational children's book",
    sceneCount: 6,
    duration: "20 seconds",
    musicStyle: "science documentary electronic",
    musicPrompt: "가벼운 전자음과 피아노, 인터뷰 중심이므로 리듬은 작고 명확하게"
  },
  {
    category: "interview",
    idea: "지역 환경 활동가와 아이들이 쓰레기 줍기 캠페인을 마친 뒤 느낀 점을 나누는 인터뷰형 영상",
    characters: "진행자 소민: 초록 모자와 체크리스트. 환경 활동가: 카키 조끼와 장갑.",
    audience: "환경 실천을 배우는 가족",
    visualStyle: "gouache children's book illustration",
    sceneCount: 6,
    duration: "30 seconds",
    musicStyle: "documentary orchestral score",
    musicPrompt: "담백한 다큐 배경음, 피아노와 현악, 진심 어린 대화가 잘 들리도록"
  },
  {
    category: "interview",
    idea: "어린이 합창단 단원들이 무대에 오르기 전 긴장과 설렘을 이야기하는 짧은 인터뷰 영상",
    characters: "합창단 지아: 흰 셔츠와 파란 리본. 진행자 준: 작은 큐카드와 검은 조끼.",
    audience: "음악과 공연을 좋아하는 어린이",
    visualStyle: "soft pastel bedtime storybook",
    sceneCount: 5,
    duration: "20 seconds",
    musicStyle: "musical theater ensemble",
    musicPrompt: "뮤지컬 리허설 같은 따뜻한 피아노와 현악, 무대 전 설렘"
  }
];

const sampleCategories = [
  ["all", "전체 랜덤", "모든 분야"],
  ["fairytale", "동화", "동화책·판타지"],
  ["documentary", "다큐", "휴먼·관찰"],
  ["traditional", "전통", "역사·문화"],
  ["environment", "환경", "자연·기후"],
  ["science", "과학", "우주·실험"],
  ["culture", "문화", "예술·생활문화"],
  ["history", "역사", "역사·박물관"],
  ["life", "생활", "습관·마음"],
  ["education", "교육", "학습·학교"],
  ["religion", "종교", "존중·문화이해"],
  ["christianity", "기독교", "감사·나눔"],
  ["buddhism", "불교", "명상·자비"],
  ["advertising", "광고", "브랜드·홍보"],
  ["travel", "여행", "여행·브이로그"],
  ["interview", "인터뷰", "대화·인물"]
];

const toolPreviewText = {
  FLOW: {
    title: "FLOW 프롬프트",
    body: "장면 연속성, 카메라 이동, 인물 기준 이미지를 유지하는 이미지/영상 프롬프트를 작성합니다."
  },
  Midjourney: {
    title: "Midjourney 프롬프트",
    body: "동화책급 구도, 질감, 조명, 비율을 살린 이미지 프롬프트를 장면별로 정리합니다."
  },
  Kling: {
    title: "Kling 프롬프트",
    body: "피사체 움직임, 카메라 경로, 시작/끝 프레임을 고려한 영상 프롬프트를 작성합니다."
  },
  HeyGen: {
    title: "HeyGen 프롬프트",
    body: "아바타, 내레이션, 발표 톤, 배경 연출에 맞는 영상 프롬프트를 작성합니다."
  },
  Suno: {
    title: "Suno 음악 프롬프트",
    body: "이미지/영상 프롬프트 분위기에 맞는 음악 스타일과 필요한 가사를 영어/한국어로 정리합니다."
  }
};

const setStatus = (message, type = "info") => {
  statusBox.textContent = message;
  statusBox.className = `status show ${type === "error" ? "error" : ""}`;
};

const clearStatus = () => {
  statusBox.textContent = "";
  statusBox.className = "status";
};

const setResultActions = (enabled) => {
  copyAllButton.disabled = !enabled;
  downloadJsonButton.disabled = !enabled;
  musicPromptButton.disabled = !latestResult?.music;
};

const setStepButtons = () => {
  if (scenarioButton) scenarioButton.disabled = false;
  if (characterSheetButton) characterSheetButton.disabled = completedStep < 1;
  if (imageVideoPromptButton) imageVideoPromptButton.disabled = completedStep < 2;
  if (sunoPromptButton) sunoPromptButton.disabled = completedStep < 3;
};

const mergeScenes = (oldScenes = [], newScenes = []) => {
  if (!newScenes.length) return oldScenes;
  return newScenes.map((scene, index) => {
    const previous = oldScenes.find((item) => Number(item.scene_no) === Number(scene.scene_no))
      || oldScenes[index]
      || {};
    return {
      ...previous,
      ...scene,
      prompts: {
        ...(previous.prompts || {}),
        ...(scene.prompts || {})
      }
    };
  });
};

const mergeGeneratedResult = (next = {}) => {
  latestResult = {
    ...(latestResult || {}),
    ...next,
    character_sheets: next.character_sheets || latestResult?.character_sheets || [],
    scenes: mergeScenes(latestResult?.scenes || [], next.scenes || []),
    music: next.music || latestResult?.music || null
  };
  setResultActions(Boolean(latestResult));
  return latestResult;
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const selectedTools = () =>
  Array.from(document.querySelectorAll("input[name='tools']:checked")).map((item) => item.value);

const selectedMusicStyle = () =>
  document.querySelector("input[name='musicStyle']:checked")?.value || "";

const referenceImageFiles = () => Array.from(referenceImagesInput?.files || []);

const formatBytes = (bytes = 0) => {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const referenceImageMeta = () =>
  referenceImageFiles().slice(0, 5).map((file, index) => ({
    id: `reference-${index + 1}`,
    name: file.name,
    type: file.type || "unknown image format",
    size: formatBytes(file.size)
  }));

const referenceImageText = (images = []) => {
  if (!images.length) return "";
  return images.map((image, index) => `${index + 1}. ${image.name} (${image.type}, ${image.size})`).join("; ");
};

const removeReferenceImage = (removeIndex) => {
  const files = referenceImageFiles();
  const dataTransfer = new DataTransfer();
  files.forEach((file, index) => {
    if (index !== removeIndex) dataTransfer.items.add(file);
  });
  referenceImagesInput.files = dataTransfer.files;
  updateReferenceList();
  setStatus(`레퍼런스 이미지 ${removeIndex + 1}번을 삭제했습니다.`);
};

const updateReferenceList = () => {
  referencePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  referencePreviewUrls = [];
  const files = referenceImageFiles();
  if (files.length > 5) {
    referenceImagesInput.value = "";
    referenceList.textContent = "이미지는 최대 5개까지 선택할 수 있습니다. 다시 선택해 주세요.";
    setStatus("레퍼런스 이미지는 한 번에 최대 5개까지 업로드할 수 있습니다.", "error");
    return;
  }

  if (!files.length) {
    referenceList.textContent = "아직 선택된 레퍼런스 이미지가 없습니다.";
    return;
  }

  referenceList.innerHTML = files
    .map((file, index) => {
      const previewUrl = URL.createObjectURL(file);
      referencePreviewUrls.push(previewUrl);
      return `
      <div class="reference-chip">
        <img src="${previewUrl}" alt="레퍼런스 이미지 ${index + 1} 미리보기">
        <strong>REF ${String(index + 1).padStart(2, "0")}</strong>
        <span>${escapeHtml(file.name)}</span>
        <small>${escapeHtml(file.type || "unknown image format")} · ${formatBytes(file.size)}</small>
        <button class="reference-remove" type="button" data-reference-remove="${index}" aria-label="${escapeHtml(file.name)} 삭제">삭제</button>
      </div>
    `;
    })
    .join("");
  setStatus(`${files.length}개의 레퍼런스 이미지를 프롬프트 조건에 반영합니다.`);
};

const isLocalPreview = () =>
  ["localhost", "127.0.0.1", ""].includes(window.location.hostname);

const visualStyleKo = {
  "premium watercolor storybook": "고급 수채화 동화책 스타일",
  "soft 3D animated film": "부드러운 3D 애니메이션 영화 스타일",
  "paper cutout fairytale": "종이 오려 붙이기 동화 스타일",
  "cinematic fantasy illustration": "영화적인 판타지 일러스트 스타일",
  "cozy Korean picture book": "따뜻한 한국 그림책 스타일",
  "classic hand-painted fairytale illustration": "고전 손그림 동화 일러스트 스타일",
  "whimsical European picture book": "상상력이 풍부한 유럽 그림책 스타일",
  "modern Korean children's editorial illustration": "현대적인 한국 어린이 출판 일러스트 스타일",
  "soft pastel bedtime storybook": "부드러운 파스텔 잠자리 동화책 스타일",
  "vintage ink and watercolor storybook": "빈티지 잉크와 수채화 동화책 스타일",
  "gouache children's book illustration": "과슈 질감의 어린이책 일러스트 스타일",
  "colored pencil picture book texture": "색연필 질감의 그림책 스타일",
  "clay diorama storybook scene": "점토 디오라마 동화 장면 스타일",
  "felt craft stop-motion storybook": "펠트 공예 스톱모션 동화 스타일",
  "miniature paper theater illustration": "미니어처 종이극장 일러스트 스타일",
  "storybook character design bible": "동화 캐릭터 디자인 바이블 스타일",
  "cinematic storybook concept art": "영화적인 동화 콘셉트 아트 스타일",
  "dreamy magical realism picture book": "몽환적인 마법적 리얼리즘 그림책 스타일",
  "bright educational children's book": "밝고 교육적인 어린이책 스타일",
  "cozy bedtime nursery illustration": "포근한 잠자리 유아 그림책 스타일",
  "storybook cover art premium publishing": "프리미엄 출판용 동화책 표지 아트 스타일"
};

const durationKo = {
  "6 seconds": "6초",
  "8 seconds": "8초",
  "12 seconds": "12초",
  "15 seconds": "15초",
  "20 seconds": "20초",
  "30 seconds": "30초",
  "45 seconds": "45초",
  "60 seconds": "1분",
  "90 seconds": "1분 30초",
  "120 seconds": "2분",
  "180 seconds": "3분",
  "300 seconds": "5분",
  "600 seconds": "10분",
  "1800 seconds": "30분",
  "3690 seconds": "1시간 1분 30초"
};

const hasHangul = (value = "") => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);

const localCharacterKo = (value = "") => {
  if (hasHangul(value)) return value;
  if (value.toLowerCase().includes("lumi")) {
    return "루미: 은빛 머리와 노란 우체부 가방을 가진 작은 별 우체부, 따뜻한 금빛을 내며 조심스럽지만 용감함. 모모: 파란 조끼와 둥근 안경을 착용한 달토끼 조력자, 장난스럽고 친근한 표정.";
  }
  return "사용자가 입력한 주인공과 등장인물 설정을 바탕으로, 머리색·의상·대표 소품·나이대·표정 규칙을 모든 장면에서 동일하게 유지";
};

const localCharacterEn = (value = "") => {
  if (!value.trim()) {
    return "consistent original children's book characters with fixed hair, costume, key props, age range, silhouette, and facial features";
  }
  if (!hasHangul(value)) return value;
  if (value.includes("지우") || value.includes("벽화")) {
    return "Jiu, a child protagonist wearing paint-stained overalls and red sneakers; Mural Bird, a friendly paper-winged guide with colorful wings and round eyes; keep their silhouette, colors, costume, and props consistent";
  }
  if (value.includes("루미") || value.includes("모모")) {
    return "Lumi, a small star mail carrier with silver hair, a yellow satchel, and a warm golden glow; Momo, a moon-rabbit helper wearing a blue vest and round glasses; keep their colors, props, and facial features consistent";
  }
  return "original children's story characters based on the user's Korean character notes; keep each character's hair, costume, signature props, age range, silhouette, color palette, and facial features consistent across every scene";
};

const localMusicPromptEn = (value = "") => {
  if (!value.trim()) return "";
  if (!hasHangul(value)) return value;
  return "adapt the user's Korean music direction into polished English: warm mood, clear melody, child-friendly arrangement, balanced instruments, and story-matching emotional pacing";
};

const clampNumber = (value, min, max, fallback) => {
  if (String(value ?? "").trim() === "") return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
};

const selectedDuration = () => {
  const customSeconds = customDurationWrap && !customDurationWrap.hidden
    ? clampNumber(customDurationInput.value, 6, 3690, 0)
    : 0;
  if (customSeconds) {
    return `${customSeconds} seconds`;
  }
  return document.querySelector("#duration").value;
};

const musicStyleKo = Object.fromEntries(musicStyles);

const renderMusicStyleButtons = () => {
  musicStyleGrid.innerHTML = musicStyles
    .map(([value, label], index) => `
      <label class="music-style-button">
        <input type="radio" name="musicStyle" value="${escapeHtml(value)}">
        <span>${escapeHtml(label)}</span>
        <small>${escapeHtml(value)}</small>
      </label>
    `)
    .join("");
};

const setMusicStyle = (value) => {
  const radio = Array.from(document.querySelectorAll("input[name='musicStyle']"))
    .find((item) => item.value === value);
  if (radio) radio.checked = true;
};

const renderSampleCategoryButtons = () => {
  sampleCategoryGrid.innerHTML = sampleCategories
    .map(([value, label, hint]) => `
      <button class="sample-category-button" type="button" data-sample-category="${escapeHtml(value)}">
        <span>${escapeHtml(label)}</span>
        <small>${escapeHtml(hint)}</small>
      </button>
    `)
    .join("");
};

const resetGeneratedOutputs = () => {
  latestResult = null;
  completedStep = 0;
  setStepButtons();
  setResultActions(false);
  characterOutput.className = "accordion empty-state";
  characterOutput.textContent = "새 예시가 입력되었습니다. 스토리보드와 프롬프트를 다시 작성 중입니다.";
  storyboardOutput.className = "accordion empty-state";
  storyboardOutput.textContent = "새 예시가 입력되었습니다. 스토리보드와 프롬프트를 다시 작성 중입니다.";
  promptOutput.className = "accordion empty-state";
  promptOutput.textContent = "새 예시가 입력되었습니다. 이미지/영상 프롬프트를 다시 작성 중입니다.";
  musicOutput.className = "accordion empty-state";
  musicOutput.textContent = "새 예시 기준으로 수노 음악 프롬프트를 다시 준비합니다.";
};

const fillSample = (category = "all", autoGenerate = false) => {
  const pool = category === "all"
    ? sampleProjects
    : sampleProjects.filter((sample) => sample.category === category);
  const sample = pool[Math.floor(Math.random() * pool.length)] || sampleProjects[0];
  currentSampleCategory = sample.category || category || "all";
  document.querySelector("#idea").value = sample.idea;
  document.querySelector("#characterNotes").value = sample.characters;
  document.querySelector("#audience").value = sample.audience;
  document.querySelector("#visualStyle").value = sample.visualStyle;
  document.querySelector("#sceneCount").value = sample.sceneCount;
  document.querySelector("#duration").value = sample.duration;
  setMusicStyle(sample.musicStyle);
  customDurationWrap.hidden = true;
  customDurationInput.value = "";
  customMusicPromptWrap.hidden = true;
  customMusicPromptInput.value = "";
  customMusicPromptButton.textContent = "직접 입력 열기";
  musicPromptManuallyEdited = false;
  const categoryLabel = sampleCategories.find(([value]) => value === category)?.[1] || "전체 랜덤";
  setStatus(`${categoryLabel} 분야 예시를 랜덤으로 채웠습니다. 2번 시나리오 생성부터 차례대로 진행해 주세요.`);
  if (autoGenerate) {
    resetGeneratedOutputs();
  }
};

const buildToolPrompt = (tool, payload, sceneIndex, sceneTitleEn, sceneTitleKo, beatEn = "", beatKo = "") => {
  const characterHintEn = payload.characters_en || "consistent original children's book characters";
  const characterHintKo = payload.characters_ko || "동일한 외형과 의상 규칙을 유지하는 오리지널 동화 캐릭터";
  const referenceHintEn = payload.reference_images?.length
    ? `use the uploaded reference images for visual direction: ${referenceImageText(payload.reference_images)}`
    : "no external reference image";
  const referenceHintKo = payload.reference_images?.length
    ? `업로드한 레퍼런스 이미지를 시각 방향 참고자료로 활용: ${referenceImageText(payload.reference_images)}`
    : "외부 레퍼런스 이미지 없음";
  const styleKo = visualStyleKo[payload.visual_style] || "전문적인 동화책 이미지 스타일";
  const durationTextKo = durationKo[payload.duration] || payload.duration || "짧은 영상";
  const baseEn = `${sceneTitleEn}, ${beatEn}, ${payload.visual_style}, ${characterHintEn}, ${referenceHintEn}, gentle cinematic lighting, clear composition, no text in image`;
  const baseKo = `${sceneTitleKo}, ${beatKo}, ${styleKo}, ${characterHintKo}, ${referenceHintKo}, 부드러운 영화적 조명, 명확한 구도, 이미지 안 글자 없음`;

  const guideEn = {
    FLOW: "storyboard continuity, reference character sheet, camera direction",
    Midjourney: "premium illustration, composition, lighting, aspect ratio, highly detailed",
    Kling: "subject movement, camera path, temporal consistency, beginning and ending frame",
    HeyGen: "presenter narration, avatar direction, warm educational storytelling tone"
  }[tool] || "tool-ready production prompt";

  const guideKo = {
    FLOW: "스토리보드 연속성, 캐릭터 시트 참조, 카메라 방향",
    Midjourney: "고급 일러스트 품질, 안정적인 구도, 섬세한 조명, 화면 비율, 높은 디테일",
    Kling: "피사체 움직임, 카메라 경로, 시간 흐름의 일관성, 시작 프레임과 끝 프레임",
    HeyGen: "프레젠터 내레이션, 아바타 연출, 따뜻한 교육형 이야기 전달 톤"
  }[tool] || "도구에 바로 붙여 넣기 좋은 전문 제작 프롬프트";

  return {
    image_en: `${baseEn}, ${guideEn}, scene ${sceneIndex}`,
    image_ko: `${baseKo}, ${guideKo}, ${sceneIndex}번째 장면`,
    video_en: `${baseEn}, ${payload.duration}, slow camera move, character action stays consistent, ${guideEn}`,
    video_ko: `${baseKo}, ${durationTextKo}, 느린 카메라 움직임, 캐릭터 행동과 외형 일관성 유지, ${guideKo}`
  };
};

const localIdeaEn = (value = "") => {
  if (!value.trim()) return "an original children's picture book story";
  if (!hasHangul(value)) return value;
  return "the user-provided story premise";
};

const compactIdeaKo = (value = "") => {
  const source = value.trim();
  if (!source) return "입력한 이야기";
  return source.length > 80 ? `${source.slice(0, 80)}...` : source;
};

const sceneTitleBank = [
  ["The First Sign", "첫 번째 신호"],
  ["The Hidden Problem", "숨겨진 문제"],
  ["A Helpful Clue", "도움이 되는 단서"],
  ["The Journey Begins", "여정이 시작되다"],
  ["An Unexpected Choice", "뜻밖의 선택"],
  ["The Quiet Challenge", "조용한 도전"],
  ["A New Friend's Help", "새 친구의 도움"],
  ["The Turning Point", "전환점"],
  ["Courage in Motion", "움직이는 용기"],
  ["The Promise Kept", "지켜진 약속"],
  ["A Door Opens", "문이 열리다"],
  ["The Map Changes", "지도가 바뀌다"],
  ["Small Details Matter", "작은 단서가 중요해지다"],
  ["A Warm Discovery", "따뜻한 발견"],
  ["The Night Before", "전날 밤"],
  ["The Bright Morning", "밝은 아침"],
  ["A Question Answered", "질문에 답하다"],
  ["The Last Missing Piece", "마지막 조각"],
  ["Together Again", "다시 함께"],
  ["The Story Continues", "이야기는 계속된다"]
];

const categorySceneTitleBanks = {
  fairytale: [
    ["The Magical Door Opens", "마법의 문이 열리다"],
    ["A Tiny Wish Appears", "작은 소원이 나타나다"],
    ["The Secret Path Glows", "비밀 길이 빛나다"],
    ["A Friend Joins the Quest", "친구가 여정에 함께하다"],
    ["The Gentle Trial", "부드러운 시험"],
    ["The Heart Learns Courage", "마음이 용기를 배우다"],
    ["The Spell Turns Warm", "마법이 따뜻해지다"],
    ["The Wish Finds Home", "소원이 집을 찾다"],
    ["A New Morning Shines", "새 아침이 빛나다"],
    ["The Storybook Closes", "그림책이 닫히다"]
  ],
  documentary: [
    ["Opening Observation", "첫 관찰"],
    ["The Place and Its People", "장소와 사람들"],
    ["A Detail Worth Recording", "기록해야 할 작은 장면"],
    ["The Daily Rhythm", "하루의 리듬"],
    ["A Voice from the Field", "현장의 목소리"],
    ["The Hidden Context", "숨겨진 배경"],
    ["Hands at Work", "일하는 손"],
    ["The Meaning Revealed", "의미가 드러나다"],
    ["A Quiet Change", "조용한 변화"],
    ["Closing Reflection", "마무리 성찰"]
  ],
  traditional: [
    ["The Old Pattern Awakens", "옛 문양이 깨어나다"],
    ["A Sound from the Courtyard", "마당에서 들려온 소리"],
    ["The Artisan's Lesson", "장인의 가르침"],
    ["Colors of the Ancestors", "조상의 색"],
    ["The Festival Road", "축제의 길"],
    ["A Tool with Memory", "기억을 품은 도구"],
    ["The Rhythm Returns", "장단이 돌아오다"],
    ["Under the Palace Eaves", "궁궐 처마 아래"],
    ["A Custom Remembered", "되살아난 풍습"],
    ["The Heritage Promise", "전통의 약속"]
  ],
  environment: [
    ["The Fragile Place", "위태로운 장소"],
    ["A Sign from Nature", "자연이 보낸 신호"],
    ["The Problem Becomes Visible", "문제가 보이기 시작하다"],
    ["Small Hands Begin", "작은 손들이 시작하다"],
    ["The Living World Responds", "살아 있는 세계가 답하다"],
    ["A Difficult Choice", "어려운 선택"],
    ["Repairing Together", "함께 회복하기"],
    ["The Clean Path Opens", "깨끗한 길이 열리다"],
    ["Hope Takes Root", "희망이 뿌리내리다"],
    ["A Promise to Protect", "지키겠다는 약속"]
  ],
  science: [
    ["The Question Sparks", "질문이 반짝이다"],
    ["Into the Experiment", "실험 속으로"],
    ["The First Discovery", "첫 발견"],
    ["A Pattern Appears", "규칙이 나타나다"],
    ["Testing the Idea", "생각을 실험하다"],
    ["The Unexpected Result", "뜻밖의 결과"],
    ["A Clear Explanation", "명확한 설명"],
    ["The Big Demonstration", "큰 시연"],
    ["Knowledge Becomes Useful", "지식이 쓸모를 얻다"],
    ["The Next Question", "다음 질문"]
  ],
  culture: [
    ["A Street of Stories", "이야기가 있는 거리"],
    ["The First Artwork", "첫 번째 작품"],
    ["A Shared Meal", "함께 나눈 음식"],
    ["The Sound of the Neighborhood", "동네의 소리"],
    ["A Festival Moment", "축제의 순간"],
    ["The Meaning of a Habit", "생활문화의 의미"],
    ["Different Voices Meet", "다른 목소리가 만나다"],
    ["A Memory Preserved", "보존된 기억"],
    ["The Community Responds", "공동체가 답하다"],
    ["Culture Carried Forward", "이어지는 문화"]
  ],
  history: [
    ["A Trace from the Past", "과거의 흔적"],
    ["The Archive Opens", "기록이 열리다"],
    ["A Forgotten Name", "잊힌 이름"],
    ["Walking Through Time", "시간 속을 걷다"],
    ["The Old Map Speaks", "옛 지도가 말하다"],
    ["A Choice in History", "역사 속 선택"],
    ["The Evidence Connects", "증거가 이어지다"],
    ["The Turning Era", "시대의 전환"],
    ["The Lesson Remains", "남겨진 교훈"],
    ["Remembering Together", "함께 기억하다"]
  ],
  life: [
    ["A Small Morning Habit", "작은 아침 습관"],
    ["The Everyday Problem", "일상의 문제"],
    ["A Helpful Routine", "도움이 되는 루틴"],
    ["Trying a New Way", "새로운 방법을 해보다"],
    ["A Feeling Named", "감정에 이름 붙이기"],
    ["A Kind Conversation", "다정한 대화"],
    ["Practice Makes Change", "연습이 변화를 만들다"],
    ["The Day Gets Easier", "하루가 편해지다"],
    ["A Habit Stays", "습관이 자리 잡다"],
    ["A Peaceful Evening", "평온한 저녁"]
  ],
  education: [
    ["The Lesson Begins", "수업이 시작되다"],
    ["A Curious Question", "호기심 어린 질문"],
    ["Learning by Trying", "해보며 배우기"],
    ["A Mistake Becomes a Clue", "실수가 단서가 되다"],
    ["Friends Solve Together", "친구들이 함께 풀다"],
    ["The Idea Clicks", "생각이 연결되다"],
    ["Explaining in My Words", "내 말로 설명하기"],
    ["The Practice Round", "연습 시간"],
    ["Confidence Grows", "자신감이 자라다"],
    ["The Learning Continues", "배움은 계속된다"]
  ],
  religion: [
    ["A Quiet Question", "조용한 질문"],
    ["The Place of Reflection", "성찰의 장소"],
    ["A Gentle Teaching", "부드러운 가르침"],
    ["Listening with Respect", "존중하며 듣기"],
    ["A Symbol Explained", "상징을 이해하다"],
    ["A Moment of Gratitude", "감사의 순간"],
    ["Kindness in Action", "실천하는 친절"],
    ["A Peaceful Choice", "평화로운 선택"],
    ["Understanding Grows", "이해가 자라다"],
    ["A Respectful Ending", "존중의 마무리"]
  ],
  christianity: [
    ["A Small Prayer Begins", "작은 기도가 시작되다"],
    ["The Chapel Light", "예배당의 빛"],
    ["A Word of Comfort", "위로의 말씀"],
    ["Sharing with a Neighbor", "이웃과 나누기"],
    ["The Choir Practices", "성가대가 연습하다"],
    ["A Thankful Heart", "감사하는 마음"],
    ["A Kind Act", "친절한 실천"],
    ["The Service Moment", "예배의 순간"],
    ["Grace Remembered", "은혜를 기억하다"],
    ["Walking in Love", "사랑으로 걷다"]
  ],
  buddhism: [
    ["The Lantern Path", "연등길"],
    ["A Quiet Bell Rings", "조용한 종소리"],
    ["Learning to Breathe", "호흡을 배우다"],
    ["The Temple Garden", "사찰 정원"],
    ["A Lesson in Compassion", "자비의 가르침"],
    ["Letting Anger Pass", "화를 흘려보내다"],
    ["A Mindful Step", "마음챙김의 걸음"],
    ["The Lantern Glows", "연등이 빛나다"],
    ["Peace Returns", "평화가 돌아오다"],
    ["A Gentle Bow", "부드러운 합장"]
  ],
  advertising: [
    ["The Product Appears", "제품이 등장하다"],
    ["The Need Is Clear", "필요가 분명해지다"],
    ["A Friendly Demonstration", "친근한 사용 장면"],
    ["The Benefit Moment", "장점이 보이는 순간"],
    ["A Bright Reaction", "밝은 반응"],
    ["The Brand Feeling", "브랜드 감성"],
    ["Before and After", "전후 변화"],
    ["The Key Message", "핵심 메시지"],
    ["A Memorable Shot", "기억에 남는 장면"],
    ["The Closing Call", "마무리 제안"]
  ],
  travel: [
    ["The Ticket in Hand", "손에 든 티켓"],
    ["First View of the Place", "처음 마주한 풍경"],
    ["A Local Detail", "지역의 작은 디테일"],
    ["Walking the Route", "길을 걷다"],
    ["A Taste of the City", "도시의 맛"],
    ["Meeting a Guide", "안내자를 만나다"],
    ["The Best Viewpoint", "가장 좋은 전망"],
    ["An Unexpected Stop", "뜻밖의 정류장"],
    ["A Memory Collected", "추억을 모으다"],
    ["The Journey Home", "돌아가는 길"]
  ],
  interview: [
    ["Opening Question", "첫 질문"],
    ["Introducing the Guest", "출연자 소개"],
    ["A Personal Memory", "개인적인 기억"],
    ["The Work Process", "작업 과정"],
    ["A Meaningful Detail", "의미 있는 디테일"],
    ["The Honest Answer", "솔직한 답변"],
    ["Behind the Scene", "현장 뒷이야기"],
    ["The Key Insight", "핵심 통찰"],
    ["A Message to Viewers", "시청자에게 전하는 말"],
    ["Closing Portrait", "마무리 인물 장면"]
  ]
};

const sceneArcTemplates = [
  {
    title: ["Opening Image", "오프닝 이미지"],
    en: "Introduce the world, mood, main character, and the visual rule that will guide the full storyboard.",
    ko: "세계관, 분위기, 주인공, 전체 스토리보드를 이끌 시각 규칙을 소개합니다.",
    note: "넓은 establishing shot으로 장소와 색감을 먼저 보여주고 캐릭터는 또렷하게 배치합니다."
  },
  {
    title: ["Inciting Moment", "사건의 시작"],
    en: "Show the first unusual event that pushes the protagonist into action.",
    ko: "주인공이 행동을 시작하게 만드는 첫 번째 특별한 사건을 보여줍니다.",
    note: "핵심 사건이 한눈에 보이도록 전경 소품과 주인공의 반응을 함께 잡습니다."
  },
  {
    title: ["First Decision", "첫 번째 결정"],
    en: "The protagonist chooses a goal, while the supporting character or object clarifies what is at stake.",
    ko: "주인공이 목표를 정하고, 등장인물이나 중요한 소품이 문제의 의미를 분명하게 만듭니다.",
    note: "인물의 표정과 손동작을 강조해 목표가 생기는 순간을 선명하게 연출합니다."
  },
  {
    title: ["Exploration", "탐색"],
    en: "Move through a new place, reveal clues, and vary the camera angle so the scene does not repeat.",
    ko: "새로운 장소를 지나며 단서를 발견하고, 반복되지 않도록 카메라 각도를 바꿉니다.",
    note: "중경과 측면 이동 구도를 사용해 여정의 방향감을 만듭니다."
  },
  {
    title: ["Obstacle", "장애물"],
    en: "Introduce a gentle obstacle that tests the character without making the story scary.",
    ko: "이야기가 무섭지 않게 유지되면서도 캐릭터를 시험하는 부드러운 장애물을 넣습니다.",
    note: "대비되는 조명과 소품 배치를 사용하되 어린이 콘텐츠에 맞게 따뜻한 톤을 유지합니다."
  },
  {
    title: ["Emotional Turn", "감정의 전환"],
    en: "The character understands something important and the emotional color of the story begins to change.",
    ko: "캐릭터가 중요한 사실을 깨닫고 이야기의 감정 색이 달라지기 시작합니다.",
    note: "클로즈업 또는 반신 구도로 표정 변화를 보여주고 배경은 단순하게 정리합니다."
  },
  {
    title: ["Cooperation", "협력"],
    en: "Characters work together, using their fixed props and personalities to solve part of the problem.",
    ko: "캐릭터들이 각자의 고정 소품과 성격을 활용해 문제의 일부를 함께 해결합니다.",
    note: "두 명 이상이 등장해도 캐릭터 시트의 의상과 색상 규칙이 섞이지 않게 배치합니다."
  },
  {
    title: ["Climax", "클라이맥스"],
    en: "Create the strongest visual moment where the goal, conflict, and character choice meet.",
    ko: "목표, 갈등, 캐릭터의 선택이 만나는 가장 강한 시각적 순간을 만듭니다.",
    note: "빛, 움직임, 소품을 중심으로 장면의 최고점을 만들고 화면 안 글자는 넣지 않습니다."
  },
  {
    title: ["Resolution", "해결"],
    en: "Show the result of the character's action and make the story world feel changed.",
    ko: "캐릭터의 행동 결과를 보여주고 이야기 세계가 어떻게 달라졌는지 표현합니다.",
    note: "초반 장면과 대비되는 따뜻한 색감으로 변화와 안도감을 보여줍니다."
  },
  {
    title: ["Closing Image", "엔딩 이미지"],
    en: "End with a memorable picture-book image that leaves a clear emotional aftertaste.",
    ko: "동화책 마지막 장면처럼 기억에 남는 이미지로 감정적 여운을 남깁니다.",
    note: "넓고 안정적인 구도, 부드러운 조명, 반복 가능한 대표 소품으로 마무리합니다."
  }
];

const sceneTemplateFor = (index, total) => {
  if (total <= sceneArcTemplates.length) {
    const position = total === 1 ? 0 : Math.round((index / Math.max(total - 1, 1)) * (sceneArcTemplates.length - 1));
    return sceneArcTemplates[position];
  }
  return sceneArcTemplates[index % sceneArcTemplates.length];
};

const buildLocalSceneBeat = (payload, index, total) => {
  const template = sceneTemplateFor(index, total);
  const titleBank = categorySceneTitleBanks[payload.sample_category] || sceneTitleBank;
  const titleSeed = titleBank[index % titleBank.length];
  const cycle = Math.floor(index / titleBank.length);
  const sceneNo = index + 1;
  const titleEn = cycle ? `${titleSeed[0]} ${cycle + 1}` : titleSeed[0];
  const titleKo = cycle ? `${titleSeed[1]} ${cycle + 1}` : titleSeed[1];
  const ideaEn = localIdeaEn(payload.idea);
  const ideaKo = compactIdeaKo(payload.idea);
  const castNames = splitCharacterNotes(payload.characters).map((character) => character.nameKo).slice(0, 3).join(", ") || "주요 캐릭터";

  return {
    title_en: `${String(sceneNo).padStart(2, "0")} ${titleEn}`,
    title_ko: `${String(sceneNo).padStart(2, "0")} ${titleKo}`,
    summary_en: `Scene ${sceneNo} - ${template.title[0]}: ${template.en} Connect this beat to ${ideaEn}, keeping the cast actions specific and non-repetitive.`,
    summary_ko: `${sceneNo}번째 장면 - ${template.title[1]}: ${template.ko} 이야기 기준은 '${ideaKo}'이며, ${castNames}의 행동이 이전 장면과 다르게 보이도록 구성합니다.`,
    visual_note: `${template.note} 캐릭터 시트의 머리색, 의상, 대표 소품은 모든 장면에서 반복 유지합니다.`
  };
};

const knownCharacterEn = {
  "루미": {
    name: "Lumi",
    role: "Protagonist and dream mail carrier",
    appearance: "Small glowing star child, silver hair, warm golden aura, soft round silhouette.",
    costume: "Yellow mail satchel, tiny boots, simple storybook outfit.",
    personality: "Careful, responsible, shy at first, brave when helping others."
  },
  "모모": {
    name: "Momo",
    role: "Supporting character and moon-rabbit helper",
    appearance: "Friendly moon-rabbit helper, round glasses, bright eyes, soft rounded silhouette.",
    costume: "Blue vest, neat small accessories, gentle storybook outfit.",
    personality: "Playful, warm, encouraging, and loyal to the protagonist."
  }
};

const splitCharacterNotes = (value = "") => {
  const source = value.trim();
  if (!source) {
    return [
      {
        nameKo: "주인공",
        nameEn: "Protagonist",
        noteKo: "동화책 주인공. 머리색, 의상, 대표 소품, 나이대, 표정 규칙을 모든 장면에서 동일하게 유지합니다.",
        noteEn: "Original children's book protagonist with fixed hair, costume, key props, age range, silhouette, and facial features."
      },
      {
        nameKo: "주요 등장인물",
        nameEn: "Supporting Character",
        noteKo: "주인공을 돕는 주요 등장인물. 외형, 의상, 색상, 소품, 성격이 모든 장면에서 일관되게 유지됩니다.",
        noteEn: "Important supporting character with fixed appearance, costume, color palette, signature props, and personality."
      }
    ];
  }

  const normalized = source
    .replace(/\r/g, "\n")
    .replace(/[；;]/g, "\n")
    .replace(/\s+\/\s+/g, "\n");
  const matches = Array.from(normalized.matchAll(/([^:\n.。]+)\s*[:：]\s*([^:\n]+?)(?=(?:\s*[.。]?\s*[^:\n.。]{1,24}\s*[:：])|$|\n)/g));

  if (matches.length) {
    return matches.slice(0, 8).map((match, index) => {
      const nameKo = match[1].trim().replace(/^[\s.。]+|[\s.。]+$/g, "") || `등장인물 ${index + 1}`;
      const noteKo = match[2].trim().replace(/^[\s.。]+|[\s.。]+$/g, "") || "외형과 성격 메모";
      const known = knownCharacterEn[nameKo];
      return {
        nameKo,
        nameEn: known?.name || `Character ${index + 1}`,
        noteKo: `${nameKo}: ${noteKo}`,
        noteEn: known
          ? `${known.name}: ${known.appearance} ${known.costume} ${known.personality}`
          : `Character ${index + 1}: original story character based on the user's notes, with fixed visible identity, costume, props, color palette, silhouette, and personality.`
      };
    });
  }

  return normalized
    .split(/\n|[.。]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((noteKo, index) => ({
      nameKo: index === 0 ? "주인공" : `등장인물 ${index + 1}`,
      nameEn: index === 0 ? "Protagonist" : `Supporting Character ${index + 1}`,
      noteKo,
      noteEn: `${index === 0 ? "Protagonist" : `Supporting character ${index + 1}`}: original story character with fixed visible identity, costume, props, color palette, silhouette, and personality.`
    }));
};

const buildLocalCharacterSheets = (payload, styleKo) => {
  const referenceText = referenceImageText(payload.reference_images);
  return splitCharacterNotes(payload.characters).map((character, index) => {
    const known = knownCharacterEn[character.nameKo];
    const isLead = index === 0;
    const roleEn = known?.role || (isLead ? "Main protagonist" : "Important supporting character");
    const roleKo = isLead ? "주인공" : "주요 등장인물";
    const appearanceEn = known?.appearance || `${character.noteEn} Keep a clear age range, face shape, hair or head shape, body proportion, and silhouette.`;
    const costumeEn = known?.costume || "Define one fixed outfit, two signature colors, one recognizable prop, and simple production-friendly costume details.";
    const personalityEn = known?.personality || "Give the character a clear emotional role, child-friendly expression range, and consistent acting attitude.";
    const appearanceKo = known
      ? character.noteKo
      : `${character.noteKo} 얼굴형, 머리 또는 머리 형태, 체형 비율, 나이대, 실루엣을 고정합니다.`;
    const costumeKo = known
      ? (character.nameKo === "루미" ? "노란 우체부 가방, 작은 부츠, 단정한 동화책풍 의상." : "파란 조끼, 둥근 안경, 부드러운 동화책풍 소품.")
      : "고정 의상 1벌, 대표 색상 2가지, 한눈에 알아볼 수 있는 대표 소품 1개를 정합니다.";
    const personalityKo = known
      ? (character.nameKo === "루미" ? "조심스럽고 책임감 있으며 처음에는 소심하지만 누군가를 도울 때 용감해집니다." : "장난스럽고 따뜻하며 주인공을 격려하는 친근한 조력자입니다.")
      : "장면마다 유지할 성격, 표정 범위, 행동 태도를 명확히 고정합니다.";

    return {
      name_en: character.nameEn,
      name_ko: character.nameKo,
      role_en: roleEn,
      role_ko: roleKo,
      appearance_en: appearanceEn,
      appearance_ko: appearanceKo,
      costume_en: costumeEn,
      costume_ko: costumeKo,
      personality_en: personalityEn,
      personality_ko: personalityKo,
      consistency_rules_en: `Keep this character separate from other cast members. Preserve the same silhouette, face, hair or head shape, costume, signature props, color palette, age range, scale, and expression range in every image and video scene.`,
      consistency_rules_ko: `이 캐릭터를 다른 인물과 섞지 마세요. 모든 이미지와 영상 장면에서 실루엣, 얼굴, 머리 또는 머리 형태, 의상, 대표 소품, 색상 팔레트, 나이대, 크기감, 표정 범위를 동일하게 유지합니다.`,
      sheet_prompt_en: `Character sheet generation prompt for ${character.nameEn}: original children's book character, ${roleEn.toLowerCase()}, front view, side view, back view, facial expression lineup, full-body pose, costume details, signature props, fixed color palette, ${payload.visual_style}, clean white background, no text, no watermark. Reference images: ${referenceText || "none"}.`,
      sheet_prompt_ko: `${character.nameKo} 캐릭터 시트 생성 프롬프트: 오리지널 동화책 캐릭터, ${roleKo}, 정면·측면·후면, 표정 변화 모음, 전신 포즈, 의상 세부, 대표 소품, 고정 색상 팔레트, ${styleKo}, 깨끗한 흰 배경, 글자 없음, 워터마크 없음. 레퍼런스 이미지: ${referenceText || "없음"}.`,
      negative_prompt_en: "mixed identity with another character, changed face, changed hair, changed costume, missing signature prop, inconsistent age, adult proportions, scary mood, text, watermark, copied famous character",
      negative_prompt_ko: "다른 캐릭터와 정체성 혼합, 바뀐 얼굴, 바뀐 머리, 바뀐 의상, 사라진 대표 소품, 달라진 나이대, 어른 비율, 무서운 분위기, 글자, 워터마크, 유명 캐릭터 복제"
    };
  });
};

const musicProfiles = {
  fairytale: {
    moodEn: "magical, warm, innocent, and wonder-filled",
    moodKo: "마법적이고 따뜻하며 순수하고 신비로운 분위기",
    instrumentsEn: "celesta, glockenspiel, soft strings, harp, gentle hand percussion",
    instrumentsKo: "첼레스타, 글로켄슈필, 부드러운 현악기, 하프, 가벼운 손 타악기",
    tempo: "84 BPM",
    lyricEn: ["Little light, guide the way", "Through the dream, we learn today", "Hand in hand, our hearts can shine", "Every wish will find its sign"],
    lyricKo: ["작은 빛아 길을 비춰", "꿈을 지나 배워 가요", "손을 잡고 마음 밝혀", "소원은 길을 찾아요"]
  },
  documentary: {
    moodEn: "honest, observant, warm, and cinematic",
    moodKo: "진솔하고 관찰적이며 따뜻한 다큐멘터리 분위기",
    instrumentsEn: "felt piano, light strings, soft mallets, subtle ambient texture",
    instrumentsKo: "펠트 피아노, 가벼운 현악기, 부드러운 말렛, 은은한 앰비언트 질감",
    tempo: "76 BPM",
    lyricEn: ["Look closely, hear the day", "Every hand has words to say", "Small moments softly grow", "Truth becomes a gentle glow"],
    lyricKo: ["가까이 보면 들려요", "손마다 이야기가 있어요", "작은 순간이 자라나", "진실은 빛이 되어요"]
  },
  traditional: {
    moodEn: "heritage-rich, graceful, festive, and respectful",
    moodKo: "전통적이고 우아하며 축제감 있고 정중한 분위기",
    instrumentsEn: "gayageum, haegeum, daegeum, soft janggu, cinematic strings",
    instrumentsKo: "가야금, 해금, 대금, 부드러운 장구, 영화적인 현악기",
    tempo: "92 BPM",
    lyricEn: ["Old colors bloom tonight", "Drums and strings awaken light", "Step by step, the stories stay", "We carry them into today"],
    lyricKo: ["오래된 색이 피어나", "장단 속에 빛이 깨어", "한 걸음씩 이야기는", "오늘까지 이어져요"]
  },
  environment: {
    moodEn: "hopeful, nature-centered, airy, and restorative",
    moodKo: "희망적이고 자연 중심적이며 맑고 회복적인 분위기",
    instrumentsEn: "soft piano, airy pads, marimba, light woodwinds, nature-like percussion",
    instrumentsKo: "부드러운 피아노, 공기감 있는 패드, 마림바, 가벼운 목관, 자연을 닮은 타악기",
    tempo: "80 BPM",
    lyricEn: ["Tiny hands can heal the ground", "Listen to the living sound", "Leaf and wave and sky agree", "Hope begins with you and me"],
    lyricKo: ["작은 손이 땅을 살려", "살아 있는 소릴 들어", "잎과 물결 하늘까지", "희망은 우리로 시작해"]
  },
  science: {
    moodEn: "curious, bright, precise, and playful",
    moodKo: "호기심 많고 밝으며 명확하고 장난스러운 분위기",
    instrumentsEn: "clean synth plucks, pizzicato strings, xylophone, light electronic pulse",
    instrumentsKo: "깨끗한 신스 플럭, 피치카토 현악, 실로폰, 가벼운 전자 펄스",
    tempo: "96 BPM",
    lyricEn: ["Ask a question, try and see", "Every clue can set us free", "Count the stars and test the light", "Learning makes the morning bright"],
    lyricKo: ["질문하고 살펴봐요", "단서마다 길이 돼요", "별을 세고 빛을 보고", "배움이 아침을 밝혀요"]
  },
  culture: {
    moodEn: "warm, diverse, community-centered, and colorful",
    moodKo: "따뜻하고 다채로우며 공동체 중심의 문화적 분위기",
    instrumentsEn: "acoustic guitar, light percussion, piano, clarinet, soft ensemble textures",
    instrumentsKo: "어쿠스틱 기타, 가벼운 타악기, 피아노, 클라리넷, 부드러운 앙상블 질감",
    tempo: "88 BPM",
    lyricEn: ["Different colors, different ways", "Every home has songs to raise", "When we listen, we can see", "Many hearts make harmony"],
    lyricKo: ["다른 색과 다른 길", "집집마다 노래가 있어", "귀 기울여 바라보면", "여러 마음이 화음 돼요"]
  },
  history: {
    moodEn: "reflective, noble, cinematic, and gently adventurous",
    moodKo: "성찰적이고 품격 있으며 영화적이고 부드러운 모험 분위기",
    instrumentsEn: "warm strings, low piano, soft brass, frame drum, subtle archival texture",
    instrumentsKo: "따뜻한 현악기, 낮은 피아노, 부드러운 금관, 프레임 드럼, 은은한 기록물 질감",
    tempo: "74 BPM",
    lyricEn: ["Footsteps echo through the years", "Old names whisper past our ears", "What we learn and what we keep", "Lights the road beneath our feet"],
    lyricKo: ["발자국이 시간을 건너", "오래된 이름 속삭여요", "배우고 지켜 가는 것", "우리 길을 밝혀 줘요"]
  },
  life: {
    moodEn: "cozy, practical, friendly, and reassuring",
    moodKo: "포근하고 실용적이며 친근하고 안심되는 분위기",
    instrumentsEn: "ukulele, soft piano, brushed drums, hand claps, warm bass",
    instrumentsKo: "우쿨렐레, 부드러운 피아노, 브러시 드럼, 손뼉 리듬, 따뜻한 베이스",
    tempo: "90 BPM",
    lyricEn: ["Little steps can start the day", "Kind words help us find the way", "Try again and breathe in slow", "Good new habits start to grow"],
    lyricKo: ["작은 걸음 하루 열고", "다정한 말 길을 찾아", "다시 하고 숨을 쉬면", "좋은 습관 자라나요"]
  },
  education: {
    moodEn: "clear, encouraging, bright, and classroom-friendly",
    moodKo: "명확하고 격려하며 밝고 수업에 어울리는 분위기",
    instrumentsEn: "xylophone, piano, light drums, pizzicato strings, soft chorus",
    instrumentsKo: "실로폰, 피아노, 가벼운 드럼, 피치카토 현악, 부드러운 합창",
    tempo: "100 BPM",
    lyricEn: ["Try it once and try once more", "Every question opens a door", "Read and count and draw the clue", "Learning feels like something new"],
    lyricKo: ["한 번 하고 또 해봐요", "질문마다 문이 열려", "읽고 세고 단서 그리면", "배움은 새로워져요"]
  },
  religion: {
    moodEn: "peaceful, respectful, reflective, and gentle",
    moodKo: "평화롭고 존중감 있으며 성찰적이고 부드러운 분위기",
    instrumentsEn: "soft piano, warm choir pad, gentle bells, light strings",
    instrumentsKo: "부드러운 피아노, 따뜻한 합창 패드, 잔잔한 종소리, 가벼운 현악기",
    tempo: "72 BPM",
    lyricEn: ["Quiet hearts can learn to hear", "Kindness makes the pathway clear", "Different lights can softly shine", "Respectful hands meet yours and mine"],
    lyricKo: ["고요한 마음 들을 수 있어", "친절은 길을 밝혀 줘요", "다른 빛도 부드럽게", "존중의 손을 맞잡아요"]
  },
  christianity: {
    moodEn: "thankful, gentle, hopeful, and reverent",
    moodKo: "감사롭고 부드러우며 희망적이고 경건한 분위기",
    instrumentsEn: "warm piano, soft choir, acoustic guitar, light strings, gentle bells",
    instrumentsKo: "따뜻한 피아노, 부드러운 합창, 어쿠스틱 기타, 가벼운 현악기, 잔잔한 종소리",
    tempo: "78 BPM",
    lyricEn: ["Thank You for the morning light", "Guide my heart to choose what's right", "With kind hands, I share today", "Love will gently lead the way"],
    lyricKo: ["아침 빛을 감사해요", "바른 마음 이끌어요", "다정한 손 나누어요", "사랑이 길을 비춰요"]
  },
  buddhism: {
    moodEn: "peaceful, mindful, compassionate, and spacious",
    moodKo: "평화롭고 마음챙김이 있으며 자비롭고 여백 있는 분위기",
    instrumentsEn: "soft temple bell, bamboo flute, warm drone, gentle hand percussion, airy pads",
    instrumentsKo: "부드러운 종소리, 대나무 피리, 따뜻한 드론, 잔잔한 손 타악기, 공기감 있는 패드",
    tempo: "70 BPM",
    lyricEn: ["Breathe in calm, breathe out light", "Kindness grows in quiet sight", "Step by step, the heart can see", "Peace begins inside of me"],
    lyricKo: ["고요를 들이쉬고", "빛으로 내쉬어요", "한 걸음씩 마음 보며", "평화는 내 안에서"]
  },
  advertising: {
    moodEn: "catchy, bright, concise, and brand-friendly",
    moodKo: "귀에 잘 들어오고 밝으며 간결하고 브랜드 친화적인 분위기",
    instrumentsEn: "punchy drums, bright synth plucks, claps, short brass hits, clean bass",
    instrumentsKo: "선명한 드럼, 밝은 신스 플럭, 손뼉, 짧은 브라스 히트, 깔끔한 베이스",
    tempo: "112 BPM",
    lyricEn: ["Here it comes, bright and new", "Made for me and made for you", "See the change, feel the light", "Simple joy in every sight"],
    lyricKo: ["밝고 새롭게 다가와", "너와 나를 위해 있어", "변화를 보고 빛을 느껴", "쉬운 기쁨이 보여요"]
  },
  travel: {
    moodEn: "open, scenic, breezy, and adventurous",
    moodKo: "탁 트이고 풍경감 있으며 산뜻하고 여행감 있는 분위기",
    instrumentsEn: "acoustic guitar, light drums, whistle melody, piano, airy pads",
    instrumentsKo: "어쿠스틱 기타, 가벼운 드럼, 휘파람 멜로디, 피아노, 공기감 있는 패드",
    tempo: "94 BPM",
    lyricEn: ["Pack a map and take the train", "New skies call my name again", "Every road and every view", "Turns into a memory new"],
    lyricKo: ["지도 들고 기차 타요", "새 하늘이 나를 불러", "모든 길과 모든 풍경", "새 추억이 되어 가요"]
  },
  interview: {
    moodEn: "intimate, thoughtful, modern, and human-centered",
    moodKo: "가깝고 사려 깊으며 현대적이고 사람 중심의 분위기",
    instrumentsEn: "felt piano, muted guitar, soft pulse, warm pads, minimal percussion",
    instrumentsKo: "펠트 피아노, muted 기타, 부드러운 펄스, 따뜻한 패드, 미니멀 타악기",
    tempo: "78 BPM",
    lyricEn: ["Tell me how the story grew", "What you felt and what you knew", "Every answer, soft and true", "Brings the heart a clearer view"],
    lyricKo: ["이야기가 자란 길을", "느낀 마음 들려줘요", "진심 어린 대답마다", "마음이 더 선명해져요"]
  }
};

const defaultMusicProfile = {
  moodEn: "warm, cinematic, child-friendly, and emotionally clear",
  moodKo: "따뜻하고 영화적이며 어린이에게 친근하고 감정선이 분명한 분위기",
  instrumentsEn: "soft piano, strings, celesta, light percussion, gentle ambient pads",
  instrumentsKo: "부드러운 피아노, 현악기, 첼레스타, 가벼운 타악기, 잔잔한 앰비언트 패드",
  tempo: "84 BPM",
  lyricEn: ["Here we go, a story starts", "Tiny dreams and open hearts", "Step by step, the light will grow", "Together we will find the glow"],
  lyricKo: ["이야기가 시작돼요", "작은 꿈과 열린 마음", "한 걸음씩 빛이 자라", "함께 길을 찾아가요"]
};

const buildStoryMusic = (payload) => {
  const category = payload.sample_category || "all";
  const profile = musicProfiles[category] || defaultMusicProfile;
  const selectedStyleEn = payload.music_style || "warm orchestral lullaby";
  const selectedStyleKo = musicStyleKo[selectedStyleEn] || "따뜻한 동화 배경음악";
  const ideaEn = localIdeaEn(payload.idea);
  const ideaKo = compactIdeaKo(payload.idea);
  const castKo = splitCharacterNotes(payload.characters).map((character) => character.nameKo).slice(0, 2).join(", ") || "주요 캐릭터";
  const manualEn = payload.music_prompt_en ? ` Follow the user's direct music direction: ${payload.music_prompt_en}.` : "";
  const manualKo = payload.music_prompt ? ` 사용자가 직접 지정한 음악 방향을 우선 반영합니다: ${payload.music_prompt}` : "";
  const storyBasisEn = payload.music_prompt_en || ideaEn;
  const storyBasisKo = payload.music_prompt || ideaKo;

  return {
    style_en: `Suno music prompt: ${selectedStyleEn}, ${profile.moodEn}, inspired by ${storyBasisEn}. Use ${profile.instrumentsEn}, ${profile.tempo}, memorable children's picture-book melody, clean intro, gentle build, polished family-friendly production, optional soft child choir, no harsh sounds.${manualEn}`,
    style_ko: `수노 음악 프롬프트: ${selectedStyleKo}, ${profile.moodKo}, '${storyBasisKo}'의 이야기 분위기를 반영합니다. ${profile.instrumentsKo}, ${profile.tempo}, 기억하기 쉬운 동화책 멜로디, 깨끗한 도입부, 부드러운 고조, 가족 친화적인 완성도 높은 프로덕션, 선택적 어린이 합창, 거친 소리 없음.${manualKo}`,
    lyrics_en: payload.include_lyrics ? `[Verse]\n${profile.lyricEn[0]}\n${profile.lyricEn[1]}\n[Chorus]\n${profile.lyricEn[2]}\n${profile.lyricEn[3]}` : "",
    lyrics_ko: payload.include_lyrics ? `[Verse]\n${profile.lyricKo[0]}\n${profile.lyricKo[1]}\n[Chorus]\n${profile.lyricKo[2]}\n${profile.lyricKo[3]}\n\n가사 메모: ${castKo}의 여정과 '${ideaKo}'의 핵심 감정을 어린이도 따라 부를 수 있게 유지합니다.` : ""
  };
};

const buildLocalPreview = (payload) => {
  const sceneCount = clampNumber(payload.scene_count, 3, 10, 4);
  const tools = payload.tools || [];
  const styleKo = visualStyleKo[payload.visual_style] || "전문적인 동화책 이미지 스타일";

  const scenes = Array.from({ length: sceneCount }, (_, index) => {
    const beat = buildLocalSceneBeat(payload, index, sceneCount);
    const promptMap = Object.fromEntries(
      tools.map((tool) => [
        tool,
        buildToolPrompt(tool, payload, index + 1, beat.title_en, beat.title_ko, beat.summary_en, beat.summary_ko)
      ])
    );
    return {
      title_en: beat.title_en,
      title_ko: beat.title_ko,
      scene_no: index + 1,
      summary_en: beat.summary_en,
      summary_ko: beat.summary_ko,
      visual_note: beat.visual_note,
      prompts: promptMap
    };
  });

  return {
    project_title_en: "The Little Star Mailroom",
    project_title_ko: "작은 별 우체국",
    logline_en: `A polished children's story package based on: ${payload.idea}`,
    logline_ko: `입력한 스토리를 바탕으로 작성한 동화책형 이미지·영상 생성 프롬프트 패키지입니다.`,
    character_sheets: buildLocalCharacterSheets(payload, styleKo),
    scenes,
    music: buildStoryMusic(payload)
  };
};

const buildLocalStepPreview = (payload) => {
  const full = buildLocalPreview(payload);
  if (payload.generation_step === "scenario") {
    return {
      project_title_en: full.project_title_en,
      project_title_ko: full.project_title_ko,
      logline_en: full.logline_en,
      logline_ko: full.logline_ko,
      scenes: full.scenes.map(({ prompts, ...scene }) => scene)
    };
  }
  if (payload.generation_step === "characters") {
    return { character_sheets: full.character_sheets };
  }
  if (payload.generation_step === "prompts") {
    return { scenes: full.scenes };
  }
  if (payload.generation_step === "music") {
    return { music: full.music };
  }
  return full;
};

const clipboardText = (button) => {
  const target = button.closest("[data-copy]");
  const text = copyTextFromScope(button, target);
  if (!text) return;
  const originalLabel = button.dataset.label || button.textContent;
  button.dataset.label = originalLabel;
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = "복사됨";
    setTimeout(() => {
      button.textContent = originalLabel;
    }, 1100);
  });
};

const copyTextFromScope = (button, target) => {
  const accordionItem = button.classList.contains("copy-all-top")
    ? button.closest(".accordion-item")
    : null;
  const promptBlock = button.classList.contains("copy-all-small")
    ? button.closest(".prompt-block")
    : null;
  const scopedTexts = Array.from((accordionItem || promptBlock || target)?.querySelectorAll(".copy-text") || [])
    .map((item) => item.textContent.trim())
    .filter(Boolean);
  if (scopedTexts.length && (accordionItem || promptBlock)) {
    return scopedTexts.join("\n\n");
  }
  return target ? target.dataset.copy : "";
};

const copyButton = (text, label = "복사", extraClass = "") =>
  `<button class="copyPrompt copy-button ${extraClass}" type="button" data-copy="${escapeHtml(text)}">${label}</button>`;

const editButton = () =>
  `<button class="editPrompt edit-button" type="button" aria-label="내용 직접 수정">✎</button>`;

const copyBlock = (title, text) => `
  <div class="copy-block" data-copy="${escapeHtml(text)}">
    <div class="copy-block-head">
      <strong>${title}</strong>
      <div class="inline-actions">
        ${editButton()}
        ${copyButton(text)}
      </div>
    </div>
    <p class="copy-text" tabindex="0">${escapeHtml(text)}</p>
  </div>
`;

const renderStoryboard = (data) => {
  const scenes = data.scenes || [];
  if (!scenes.length) {
    storyboardOutput.className = "accordion empty-state";
    storyboardOutput.textContent = "작성된 스토리보드 장면이 없습니다. 입력 내용을 조금 더 구체적으로 작성해 주세요.";
    return;
  }

  storyboardOutput.className = "accordion";
  storyboardOutput.innerHTML = scenes
    .map((scene, index) => {
      const sceneNo = scene.scene_no || index + 1;
      const summaryKo = scene.summary_ko || "";
      const summaryEn = scene.summary_en || "";
      const visualNote = scene.visual_note || "장면 연출 노트";
      const storyboardAll = [summaryKo, summaryEn, visualNote].filter(Boolean).join("\n\n");
      return `
        <article class="accordion-item ${index === 0 ? "open" : ""}">
          <div class="accordion-head">
            <button class="accordion-trigger" type="button" aria-expanded="${index === 0}">
              <span>
                <em class="scene-badge">SCENE ${String(sceneNo).padStart(2, "0")}</em>
                <strong>${escapeHtml(scene.title_ko || `장면 ${sceneNo}`)}</strong>
                ${escapeHtml(scene.title_en || `Scene ${sceneNo}`)}
              </span>
              <b>＋</b>
            </button>
            ${copyButton(storyboardAll, "전체 복사", "copy-all-top")}
          </div>
          <div class="accordion-panel">
            <div class="prompt-block">
              <div class="prompt-block-title">
                <h4>스토리보드 장면 / Storyboard Beat</h4>
                ${copyButton(storyboardAll, "전체 복사", "copy-all-small")}
              </div>
              ${copyBlock("KR", summaryKo)}
              ${copyBlock("EN", summaryEn)}
              ${copyBlock("연출 메모", visualNote)}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
};

const renderPrompts = (data) => {
  const scenes = data.scenes || [];
  if (!scenes.length) {
    promptOutput.className = "accordion empty-state";
    promptOutput.textContent = "작성된 이미지/영상 프롬프트가 없습니다. 스토리 내용을 조금 더 구체적으로 작성해 주세요.";
    return;
  }

  promptOutput.className = "accordion";
  promptOutput.innerHTML = scenes
    .map((scene, index) => {
      const sceneNo = scene.scene_no || index + 1;
      const prompts = scene.prompts || {};
      const scenePromptAll = Object.entries(prompts)
        .map(([tool, prompt]) => [
          `${tool} · SCENE ${String(sceneNo).padStart(2, "0")}`,
          prompt.image_en || "",
          prompt.image_ko || "",
          prompt.video_en || "",
          prompt.video_ko || ""
        ].filter(Boolean).join("\n"))
        .join("\n\n");
      const promptBlocks = Object.entries(prompts)
        .map(([tool, prompt]) => {
          const imageEn = prompt.image_en || "";
          const imageKo = prompt.image_ko || "";
          const videoEn = prompt.video_en || "";
          const videoKo = prompt.video_ko || "";
          const toolAll = `${imageEn}\n\n${imageKo}\n\n${videoEn}\n\n${videoKo}`;
          return `
            <article class="prompt-block">
              <div class="prompt-block-title">
                <h4>${escapeHtml(tool)} · SCENE ${String(sceneNo).padStart(2, "0")}</h4>
                ${copyButton(toolAll, "전체 복사", "copy-all-small")}
              </div>
              ${copyBlock("Image Prompt EN / 이미지 프롬프트 영문", imageEn)}
              ${copyBlock("이미지 프롬프트 한글", imageKo)}
              ${copyBlock("Video Prompt EN / 영상 프롬프트 영문", videoEn)}
              ${copyBlock("영상 프롬프트 한글", videoKo)}
            </article>
          `;
        })
        .join("");

      return `
        <article class="accordion-item ${index === 0 ? "open" : ""}">
          <div class="accordion-head">
            <button class="accordion-trigger" type="button" aria-expanded="${index === 0}">
              <span>
                <em class="scene-badge">SCENE ${String(sceneNo).padStart(2, "0")}</em>
                <strong>${escapeHtml(scene.title_ko || `장면 ${sceneNo}`)}</strong>
                ${escapeHtml(scene.title_en || `Scene ${sceneNo}`)}
              </span>
              <b>＋</b>
            </button>
            ${copyButton(scenePromptAll, "전체 복사", "copy-all-top")}
          </div>
          <div class="accordion-panel">
            ${promptBlocks}
          </div>
        </article>
      `;
    })
    .join("");
};

const renderCharacterSheets = (sheets = []) => {
  if (!sheets.length) {
    characterOutput.className = "accordion empty-state";
    characterOutput.textContent = "캐릭터 시트 생성 프롬프트가 아직 작성되지 않았습니다. 주인공과 등장인물 메모를 조금 더 구체적으로 입력해 주세요.";
    return;
  }

  characterOutput.className = "accordion";
  characterOutput.innerHTML = sheets
    .map((character, index) => {
      const promptEn = character.sheet_prompt_en || "";
      const promptKo = character.sheet_prompt_ko || "";
      const negativeEn = character.negative_prompt_en || "";
      const negativeKo = character.negative_prompt_ko || "";
      const identityAll = [
        character.role_en || "",
        character.role_ko || "",
        character.appearance_en || "",
        character.appearance_ko || "",
        character.costume_en || "",
        character.costume_ko || "",
        character.personality_en || "",
        character.personality_ko || ""
      ].filter(Boolean).join("\n\n");
      const consistencyAll = [
        character.consistency_rules_en || "",
        character.consistency_rules_ko || ""
      ].filter(Boolean).join("\n\n");
      const sheetAll = [promptEn, promptKo, negativeEn, negativeKo].filter(Boolean).join("\n\n");
      const characterAll = [identityAll, consistencyAll, sheetAll].filter(Boolean).join("\n\n");
      return `
        <article class="accordion-item ${index === 0 ? "open" : ""}">
          <div class="accordion-head">
            <button class="accordion-trigger" type="button" aria-expanded="${index === 0}">
              <span>
                <strong>${escapeHtml(character.name_en || `Character ${index + 1}`)}</strong>
                ${escapeHtml(character.name_ko || "등장인물")}
              </span>
              <b>＋</b>
            </button>
            ${copyButton(characterAll, "전체 복사", "copy-all-top")}
          </div>
          <div class="accordion-panel">
            <div class="prompt-block">
              <div class="prompt-block-title">
                <h4>Character Identity / 캐릭터 정체성</h4>
                ${copyButton(identityAll, "전체 복사", "copy-all-small")}
              </div>
              ${copyBlock("Role EN", character.role_en || "")}
              ${copyBlock("역할 KR", character.role_ko || "")}
              ${copyBlock("Appearance EN", character.appearance_en || "")}
              ${copyBlock("외형 KR", character.appearance_ko || "")}
              ${copyBlock("Costume EN", character.costume_en || "")}
              ${copyBlock("의상 KR", character.costume_ko || "")}
              ${copyBlock("Personality EN", character.personality_en || "")}
              ${copyBlock("성격 KR", character.personality_ko || "")}
            </div>
            <div class="prompt-block">
              <div class="prompt-block-title">
                <h4>Consistency Rules / 일관성 유지 규칙</h4>
                ${copyButton(consistencyAll, "전체 복사", "copy-all-small")}
              </div>
              ${copyBlock("EN", character.consistency_rules_en || "")}
              ${copyBlock("KR", character.consistency_rules_ko || "")}
            </div>
            <div class="prompt-block">
              <div class="prompt-block-title">
                <h4>Character Sheet Generation Prompt / 캐릭터 시트 생성 프롬프트</h4>
                ${copyButton(sheetAll, "전체 복사", "copy-all-small")}
              </div>
              ${copyBlock("EN", promptEn)}
              ${copyBlock("KR", promptKo)}
              ${copyBlock("Negative EN", negativeEn)}
              ${copyBlock("네거티브 KR", negativeKo)}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
};

const renderMusic = (music = {}) => {
  const styleAll = `${music.style_en || ""}\n\n${music.style_ko || ""}`;
  const lyricsAll = `${music.lyrics_en || "Instrumental version recommended."}\n\n${music.lyrics_ko || "연주곡 버전을 권장합니다."}`;
  const musicAll = `${styleAll}\n\n${lyricsAll}`;
  musicOutput.innerHTML = `
    <article class="accordion-item open">
      <div class="accordion-head">
        <button class="accordion-trigger" type="button" aria-expanded="true">
          <span>
            <strong>Suno Music Prompt</strong>
            이미지·영상 프롬프트에 어울리는 수노 음악 스타일과 가사
          </span>
          <b>＋</b>
        </button>
        ${copyButton(musicAll, "전체 복사", "copy-all-top")}
      </div>
      <div class="accordion-panel">
        <div class="prompt-block">
          <div class="prompt-block-title">
            <h4>Style / 스타일</h4>
            ${copyButton(styleAll, "전체 복사", "copy-all-small")}
          </div>
          ${copyBlock("Style EN", music.style_en || "No English music prompt generated.")}
          ${copyBlock("스타일 KR", music.style_ko || "한국어 음악 프롬프트가 아직 없습니다.")}
        </div>
        <div class="prompt-block">
          <div class="prompt-block-title">
            <h4>Lyrics / 가사</h4>
            ${copyButton(lyricsAll, "전체 복사", "copy-all-small")}
          </div>
          ${copyBlock("Lyrics EN", music.lyrics_en || "Instrumental version recommended.")}
          ${copyBlock("가사 KR", music.lyrics_ko || "연주곡 버전을 권장합니다.")}
        </div>
      </div>
    </article>
  `;
  musicOutput.className = "accordion";
};

document.addEventListener("click", (event) => {
  const editTarget = event.target.closest(".editPrompt");
  if (editTarget) {
    event.preventDefault();
    event.stopPropagation();
    const block = editTarget.closest(".copy-block");
    const editableText = block?.querySelector(".copy-text");
    if (!block || !editableText) return;

    const isEditing = editableText.getAttribute("contenteditable") === "true";
    if (isEditing) {
      editableText.setAttribute("contenteditable", "false");
      editableText.classList.remove("editing");
      block.dataset.copy = editableText.textContent.trim();
      editTarget.textContent = "✎";
      editTarget.setAttribute("aria-label", "내용 직접 수정");
    } else {
      editableText.setAttribute("contenteditable", "true");
      editableText.classList.add("editing");
      editTarget.textContent = "완료";
      editTarget.setAttribute("aria-label", "수정 완료");
      editableText.focus();
    }
    return;
  }

  const copyTarget = event.target.closest(".copyPrompt");
  if (copyTarget) {
    event.preventDefault();
    event.stopPropagation();
    clipboardText(copyTarget);
    return;
  }

  const referenceRemoveButton = event.target.closest("[data-reference-remove]");
  if (referenceRemoveButton) {
    event.preventDefault();
    const removeIndex = Number(referenceRemoveButton.dataset.referenceRemove);
    if (Number.isInteger(removeIndex)) removeReferenceImage(removeIndex);
    return;
  }

  const toolTab = event.target.closest("[data-tool-tab]");
  if (toolTab && toolPreview) {
    document.querySelectorAll("[data-tool-tab]").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-expanded", "false");
    });
    toolTab.classList.add("active");
    toolTab.setAttribute("aria-expanded", "true");
    const preview = toolPreviewText[toolTab.dataset.toolTab] || toolPreviewText.FLOW;
    toolPreview.innerHTML = `<strong>${escapeHtml(preview.title)}</strong><p>${escapeHtml(preview.body)}</p>`;
    return;
  }

  const sampleCategoryButton = event.target.closest("[data-sample-category]");
  if (sampleCategoryButton) {
    event.preventDefault();
    document.querySelectorAll("[data-sample-category]").forEach((item) => item.classList.remove("active"));
    sampleCategoryButton.classList.add("active");
    fillSample(sampleCategoryButton.dataset.sampleCategory, true);
    return;
  }

  const trigger = event.target.closest(".accordion-trigger");
  if (!trigger) return;
  const item = trigger.closest(".accordion-item");
  const isOpen = item.classList.toggle("open");
  trigger.setAttribute("aria-expanded", String(isOpen));
});

renderMusicStyleButtons();
renderSampleCategoryButtons();
setStepButtons();

document.querySelectorAll("input[name='tools']").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const tools = selectedTools();
    if (tools.length > 2) {
      checkbox.checked = false;
      setStatus("이미지/영상 프롬프트 도구는 한 번에 최대 2개까지만 선택할 수 있습니다.", "error");
      return;
    }
    if (completedStep >= 3) {
      completedStep = 2;
      setStepButtons();
      promptOutput.className = "accordion empty-state";
      promptOutput.textContent = "도구 선택이 바뀌었습니다. 4번 이미지·영상 프롬프트 생성을 다시 눌러 주세요.";
      musicOutput.className = "accordion empty-state";
      musicOutput.textContent = "이미지·영상 프롬프트를 다시 작성한 뒤 5번 수노 음악 프롬프트 생성을 눌러 주세요.";
    }
  });
});

sampleButton.addEventListener("click", () => {
  fillSample("all", true);
});

customSceneButton.addEventListener("click", () => {
  const sceneInput = document.querySelector("#sceneCount");
  sceneInput.focus();
  sceneInput.select();
  setStatus("장면 수를 3부터 10 사이로 직접 입력할 수 있습니다.");
});

customDurationButton.addEventListener("click", () => {
  customDurationWrap.hidden = !customDurationWrap.hidden;
  if (!customDurationWrap.hidden) {
    customDurationInput.focus();
    setStatus("영상 길이를 6초부터 3690초(1시간 1분 30초) 사이로 직접 입력할 수 있습니다.");
  }
});

customMusicPromptButton.addEventListener("click", () => {
  customMusicPromptWrap.hidden = !customMusicPromptWrap.hidden;
  customMusicPromptButton.textContent = customMusicPromptWrap.hidden ? "직접 입력 열기" : "직접 입력 닫기";
  if (!customMusicPromptWrap.hidden) {
    customMusicPromptInput.focus();
    setStatus("수노 음악 제작에 반영할 프롬프트를 직접 입력할 수 있습니다.");
  }
});

customMusicPromptInput.addEventListener("input", () => {
  musicPromptManuallyEdited = true;
});

referenceImagesInput.addEventListener("change", updateReferenceList);

clearButton.addEventListener("click", () => {
  form.reset();
  latestResult = null;
  currentSampleCategory = "all";
  musicPromptManuallyEdited = false;
  completedStep = 0;
  setStepButtons();
  setResultActions(false);
  customDurationWrap.hidden = true;
  customDurationInput.value = "";
  customMusicPromptWrap.hidden = true;
  customMusicPromptInput.value = "";
  customMusicPromptButton.textContent = "직접 입력 열기";
  updateReferenceList();
  characterOutput.className = "accordion empty-state";
  characterOutput.textContent = "아직 작성된 캐릭터 시트 프롬프트가 없습니다. 스토리와 인물 정보를 입력하면 더 정확해집니다.";
  storyboardOutput.className = "accordion empty-state";
  storyboardOutput.textContent = "아직 작성된 스토리보드가 없습니다. 스토리 내용을 입력해 주세요.";
  promptOutput.className = "accordion empty-state";
  promptOutput.textContent = "아직 작성된 이미지/영상 프롬프트가 없습니다. 스토리보드를 먼저 작성해 주세요.";
  musicOutput.className = "accordion empty-state";
  musicOutput.textContent = "먼저 영상 스토리보드와 이미지·영상 프롬프트를 작성하면 수노 음악 프롬프트 버튼이 활성화됩니다.";
  clearStatus();
});

copyAllButton.addEventListener("click", () => {
  if (!latestResult) return;
  navigator.clipboard.writeText(JSON.stringify(latestResult, null, 2)).then(() => {
    copyAllButton.textContent = "전체 복사됨";
    setTimeout(() => {
      copyAllButton.textContent = "전체 결과 복사";
    }, 1200);
  });
});

downloadJsonButton.addEventListener("click", () => {
  if (!latestResult) return;
  const blob = new Blob([JSON.stringify(latestResult, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "storyforge_prompt_package.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

musicPromptButton.addEventListener("click", () => {
  if (!latestResult) return;
  renderMusic(latestResult.music);
  setStatus("수노 배경음악 프롬프트를 표시했습니다. 스타일과 가사를 복사해 Suno에 붙여 넣을 수 있습니다.");
  location.hash = "#music";
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("storyforge-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("storyforge-theme") === "dark") {
  document.body.classList.add("dark");
}

const buildPayload = (generationStep) => {
  const idea = document.querySelector("#idea").value.trim();
  const tools = selectedTools();
  const manualMusicPrompt = !customMusicPromptWrap.hidden && musicPromptManuallyEdited
    ? customMusicPromptInput.value.trim()
    : "";
  return {
    generation_step: generationStep,
    idea,
    characters: document.querySelector("#characterNotes").value.trim(),
    characters_en: localCharacterEn(document.querySelector("#characterNotes").value.trim()),
    characters_ko: localCharacterKo(document.querySelector("#characterNotes").value.trim()),
    audience: document.querySelector("#audience").value.trim(),
    visual_style: document.querySelector("#visualStyle").value,
    scene_count: clampNumber(document.querySelector("#sceneCount").value, 3, 10, 4),
    duration: selectedDuration(),
    reference_images: referenceImageMeta(),
    sample_category: currentSampleCategory,
    music_style: selectedMusicStyle(),
    music_prompt: manualMusicPrompt,
    music_prompt_en: localMusicPromptEn(manualMusicPrompt),
    tools,
    include_lyrics: document.querySelector("#includeLyrics").checked,
    instrumental: document.querySelector("#instrumental").checked,
    previous_result: latestResult || {}
  };
};

const stepStatus = {
  scenario: {
    loading: "2번 시나리오를 생성 중입니다. 장면 제목과 스토리보드 흐름만 먼저 만듭니다.",
    done: "2번 시나리오 생성이 완료되었습니다. 다음은 3번 캐릭터 시트 프롬프트 생성입니다.",
    hash: "#storyboard",
    stepNo: 1
  },
  characters: {
    loading: "3번 캐릭터 시트 프롬프트를 생성 중입니다. 주인공과 등장인물을 별도 시트로 나눕니다.",
    done: "3번 캐릭터 시트 프롬프트 생성이 완료되었습니다. 다음은 4번 이미지·영상 프롬프트 생성입니다.",
    hash: "#characters",
    stepNo: 2
  },
  prompts: {
    loading: "4번 이미지·영상 프롬프트를 생성 중입니다. 선택한 도구만 처리합니다.",
    done: "4번 이미지·영상 프롬프트 생성이 완료되었습니다. 다음은 5번 수노 음악 프롬프트 생성입니다.",
    hash: "#prompts",
    stepNo: 3
  },
  music: {
    loading: "5번 수노 음악 프롬프트를 생성 중입니다. 스토리 분위기와 선택 옵션을 반영합니다.",
    done: "5번 수노 음악 프롬프트 생성이 완료되었습니다.",
    hash: "#music",
    stepNo: 4
  }
};

const validateStep = (payload) => {
  if (!payload.idea) {
    return "스토리 내용을 입력해 주세요. 빈 입력으로는 시나리오와 프롬프트를 작성할 수 없습니다.";
  }
  if (payload.generation_step === "prompts" && !payload.tools.length) {
    return "4번 이미지·영상 프롬프트를 만들려면 FLOW, Midjourney, Kling, HeyGen 중 1개 이상을 선택해 주세요.";
  }
  if (payload.tools.length > 2) {
    return "이미지/영상 프롬프트 도구는 한 번에 최대 2개까지만 선택할 수 있습니다.";
  }
  return "";
};

const renderStep = (step, data) => {
  const merged = mergeGeneratedResult(data);
  if (step === "scenario") {
    renderStoryboard(merged);
    characterOutput.className = "accordion empty-state";
    characterOutput.textContent = "시나리오가 준비되었습니다. 3번 캐릭터 시트 프롬프트 생성을 눌러 주세요.";
  }
  if (step === "characters") {
    renderCharacterSheets(merged.character_sheets);
    promptOutput.className = "accordion empty-state";
    promptOutput.textContent = "캐릭터 시트가 준비되었습니다. 도구를 최대 2개 선택한 뒤 4번 이미지·영상 프롬프트 생성을 눌러 주세요.";
  }
  if (step === "prompts") {
    renderPrompts(merged);
    musicOutput.className = "accordion empty-state";
    musicOutput.textContent = "이미지·영상 프롬프트가 준비되었습니다. 5번 수노 음악 프롬프트 생성을 눌러 주세요.";
  }
  if (step === "music") {
    renderMusic(merged.music);
  }
};

const runGenerationStep = async (step) => {
  const payload = buildPayload(step);
  const validationError = validateStep(payload);
  if (validationError) {
    setStatus(validationError, "error");
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  setStatus(stepStatus[step].loading);

  [scenarioButton, characterSheetButton, imageVideoPromptButton, sunoPromptButton].forEach((button) => {
    if (button) button.disabled = true;
  });

  try {
    if (isLocalPreview()) {
      const data = buildLocalStepPreview(payload);
      renderStep(step, data);
      completedStep = Math.max(completedStep, stepStatus[step].stepNo);
      setStepButtons();
      setStatus(stepStatus[step].done);
      location.hash = stepStatus[step].hash;
      return;
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const contentType = response.headers.get("content-type") || "";
    let data;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      throw new Error("AI API 응답 형식이 올바르지 않습니다. 배포 설정을 확인해 주세요.");
    }
    if (!response.ok) {
      throw new Error(data.error || "AI API 호출 중 오류가 발생했습니다.");
    }
    renderStep(step, data);
    completedStep = Math.max(completedStep, stepStatus[step].stepNo);
    setStepButtons();
    setStatus(stepStatus[step].done);
    location.hash = stepStatus[step].hash;
  } catch (error) {
    const message = error.name === "AbortError"
      ? "응답 시간이 길어지고 있습니다. 잠시 후 다시 시도하거나 장면 수를 줄여 주세요."
      : error.message === "Failed to fetch"
        ? "AI API에 연결하지 못했습니다. 로컬에서는 http://localhost:8000으로 열고, 배포 후에는 Vercel 환경 변수와 /api/generate 설정을 확인해 주세요."
        : error.message;
    setStatus(message, "error");
    setStepButtons();
  } finally {
    clearTimeout(timeout);
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runGenerationStep("scenario");
});

characterSheetButton.addEventListener("click", () => runGenerationStep("characters"));
imageVideoPromptButton.addEventListener("click", () => runGenerationStep("prompts"));
sunoPromptButton.addEventListener("click", () => runGenerationStep("music"));
