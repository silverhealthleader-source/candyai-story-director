import json
import os
from pathlib import Path
from http.server import BaseHTTPRequestHandler
from urllib.parse import unquote, urlparse

from openai import OpenAI


SYSTEM_PROMPT = """
You are a senior children's book storyboard director and multimodal prompt engineer.
Create professional bilingual English/Korean prompt packages for image-generation tools,
video-generation tools, character sheet generation prompts, and Suno music prompts.
Do not claim that images, videos, or music are being generated directly. Return JSON only.
"""


PROJECT_ROOT = Path(__file__).resolve().parent.parent
STATIC_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
}


def _json_response(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def _send_static(handler, request_path):
    parsed_path = unquote(urlparse(request_path).path)
    clean_path = parsed_path.strip("/")
    if not clean_path:
        clean_path = "index.html"

    file_path = (PROJECT_ROOT / clean_path).resolve()
    if not str(file_path).startswith(str(PROJECT_ROOT)) or not file_path.is_file():
        file_path = PROJECT_ROOT / "index.html"

    content = file_path.read_bytes()
    handler.send_response(200)
    handler.send_header("Content-Type", STATIC_TYPES.get(file_path.suffix.lower(), "application/octet-stream"))
    handler.send_header("Content-Length", str(len(content)))
    handler.end_headers()
    handler.wfile.write(content)


def _validate(payload):
    idea = str(payload.get("idea", "")).strip()
    tools = payload.get("tools", [])
    try:
        scene_count = int(payload.get("scene_count", 4) or 4)
    except (TypeError, ValueError):
        return "장면 수는 숫자로 입력해 주세요."
    if not idea:
        return "작품 아이디어를 입력해 주세요."
    if not isinstance(tools, list) or not tools:
        return "최소 1개 이상의 프롬프트 도구를 선택해 주세요."
    if scene_count < 3 or scene_count > 50:
        return "장면 수는 3개에서 50개 사이로 설정해 주세요."
    reference_images = payload.get("reference_images", [])
    if isinstance(reference_images, list) and len(reference_images) > 5:
        return "레퍼런스 이미지는 최대 5개까지 사용할 수 있습니다."
    return None


def _build_user_prompt(payload):
    schema = {
        "project_title_en": "string",
        "project_title_ko": "string",
        "logline_en": "string",
        "logline_ko": "string",
        "character_sheets": [
            {
                "name_en": "string",
                "name_ko": "string",
                "role_en": "string",
                "role_ko": "string",
                "appearance_en": "string",
                "appearance_ko": "string",
                "costume_en": "string",
                "costume_ko": "string",
                "personality_en": "string",
                "personality_ko": "string",
                "consistency_rules_en": "string",
                "consistency_rules_ko": "string",
                "sheet_prompt_en": "string",
                "sheet_prompt_ko": "string",
                "negative_prompt_en": "string",
                "negative_prompt_ko": "string"
            }
        ],
        "scenes": [
            {
                "scene_no": "number, starting at 1",
                "title_en": "string",
                "title_ko": "string",
                "summary_en": "string",
                "summary_ko": "string",
                "visual_note": "string in Korean",
                "prompts": {
                    "FLOW": {
                        "image_en": "string",
                        "image_ko": "string",
                        "video_en": "string",
                        "video_ko": "string"
                    }
                }
            }
        ],
        "music": {
            "style_en": "string",
            "style_ko": "string",
            "lyrics_en": "string",
            "lyrics_ko": "string"
        }
    }
    return f"""
Create a complete storyboard and prompt-writing package using this exact JSON shape:
{json.dumps(schema, ensure_ascii=False)}

Project idea: {payload.get("idea")}
Character notes: {payload.get("characters")}
English-adapted character notes: {payload.get("characters_en")}
Reference images: {json.dumps(payload.get("reference_images", []), ensure_ascii=False)}
Audience: {payload.get("audience")}
Visual style: {payload.get("visual_style")}
Selected sample/category: {payload.get("sample_category")}
Scene count: {payload.get("scene_count")}
Video duration per scene: {payload.get("duration")}
Tools to include under each scene.prompts: {", ".join(payload.get("tools", []))}
Selected music style: {payload.get("music_style")}
User music prompt direction: {payload.get("music_prompt")}
English-adapted music prompt direction: {payload.get("music_prompt_en")}
Include lyrics: {payload.get("include_lyrics")}
Instrumental preference: {payload.get("instrumental")}

Rules:
- Keep the response concise enough for a web app. Prefer practical production-ready prompts over long explanations.
- Write each storyboard summary in 1 sentence per language.
- Write each image/video prompt as one compact production prompt per language, not a paragraph essay.
- Write character sheet fields as compact but specific descriptions.
- The app writes prompts only. It does not directly create images, videos, or music.
- Make the quality suitable for a polished children's picture book and short-form video production.
- Create separate character sheets for the protagonist and every named supporting character found in Character notes.
- Do not merge supporting characters into the protagonist sheet. Each named character must have its own object in character_sheets.
- If Character notes include multiple people or creatures separated by periods, slashes, semicolons, or name-colon patterns, treat each one as a separate character sheet.
- If only one character is explicitly provided, create that protagonist sheet plus one useful supporting character sheet inferred from the story idea.
- Character sheets must lock visible identity: silhouette, face, hair, clothing, colors, props, age range, personality, and continuity rules.
- Character sheet prompts must be reusable before image/video prompt use to keep characters consistent.
- If reference image metadata is provided, treat those files as visual reference materials and mention how to use them for style, character consistency, color palette, costume, props, composition, or mood.
- Do not claim that the server has visually analyzed uploaded images. Use the provided reference image names and formats as user-supplied reference cues.
- For every selected tool, write both image-generation prompts and video-generation prompts in English and Korean.
- Fields ending in _en must be written in polished English.
- Fields ending in _ko must be written in natural Korean sentences. Do not mix English phrases into Korean fields except fixed tool names such as FLOW, Midjourney, Kling, HeyGen, and Suno.
- If the user provides Korean input, translate or adapt it into English for _en fields. If the user provides English input, translate or adapt it into Korean for _ko fields.
- Prefer English-adapted character notes and English-adapted music prompt direction for _en fields when provided.
- Include the relevant character consistency details inside every scene prompt.
- Number every scene clearly from Scene 01 to the requested scene count.
- Every storyboard scene must have a unique title, unique action, unique emotional beat, and unique visual note.
- Do not repeat the same storyboard summary with only the scene number changed.
- Scene titles must reflect the selected category and the user's actual story idea. Do not use generic fixed titles when a category or topic is available.
- Build a clear story arc across scenes: opening, inciting event, decision, exploration, obstacle, emotional turn, cooperation, climax, resolution, and closing image. For shorter scene counts, compress this arc without repeating beats.
- FLOW prompts should emphasize shot planning, continuity, and camera motion.
- Midjourney prompts should emphasize visual style, composition, lighting, aspect ratio, and no text artifacts.
- Kling prompts should emphasize motion, physics, camera path, and temporal consistency.
- HeyGen prompts should emphasize presenter/avatar direction, narration tone, and background.
- Suno output must be a music-generation prompt including genre, mood, instruments, tempo, vocal direction, and production style in English and Korean.
- If User music prompt direction is empty, infer the Suno genre, mood, instruments, tempo, vocal direction, and lyrics from the project idea, selected category, character sheets, and storyboard arc.
- If User music prompt direction is provided, treat it as the primary music direction while still adapting it to the story mood.
- The Suno style and lyrics must change when the story idea or selected category changes. Do not reuse fixed generic lyrics.
- Lyrics must mention or emotionally reflect the story premise, protagonist journey, or core theme without copying protected songs.
- Reflect the selected music style and the user's direct music prompt direction in the Suno style output.
- If the user music prompt conflicts with the story mood, gently adapt it while preserving the user's intent.
- If lyrics are requested, provide short child-friendly lyrics in English and Korean. If instrumental is preferred, keep lyrics optional and brief.
- Avoid copying the exact style of living artists, studios, composers, singers, or copyrighted characters.
- Return valid JSON only. No markdown fences.
"""


def _generate(payload):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY 환경 변수가 설정되어 있지 않습니다.")

    client = OpenAI(api_key=api_key, timeout=45)
    response = client.responses.create(
        model=os.environ.get("OPENAI_MODEL", "gpt-4.1-mini"),
        input=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": _build_user_prompt(payload)},
        ],
        text={"format": {"type": "json_object"}},
        max_output_tokens=int(os.environ.get("OPENAI_MAX_OUTPUT_TOKENS", "6500")),
        temperature=0.8,
    )
    return json.loads(response.output_text)


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        _json_response(self, 200, {"ok": True})

    def do_GET(self):
        _send_static(self, self.path)

    def do_POST(self):
        try:
            length = int(self.headers.get("content-length", 0))
            payload = json.loads(self.rfile.read(length).decode("utf-8") or "{}")
        except json.JSONDecodeError:
            _json_response(self, 400, {"error": "요청 형식이 올바르지 않습니다."})
            return

        validation_error = _validate(payload)
        if validation_error:
            _json_response(self, 400, {"error": validation_error})
            return

        try:
            result = _generate(payload)
            _json_response(self, 200, result)
        except Exception as exc:
            _json_response(self, 500, {"error": f"AI 프롬프트 작성에 실패했습니다: {str(exc)}"})
