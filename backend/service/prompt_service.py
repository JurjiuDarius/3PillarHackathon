from ebooklib import epub
from models.document import Document
from bs4 import BeautifulSoup
import google.generativeai as genai
import ebooklib
import os

non_chapter_keywords = [
    "cover",
    "titlepage",
    "acknowledgements",
    "dedication",
    "preface",
    "copyright",
]
PROMPT = "{} Based on the above text, answer the following question: {}. Also, quote the text on which you based your answer."
GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-pro")


def get_chapter_refs(book):
    chapter_refs = []
    for item in book.get_items():
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            chapter_refs.append(item.get_name())
    return chapter_refs


def answer_question_for_chapter(question, document_id, chapter):
    document = Document.query.get(document_id)
    epub_path = document.file_path

    book = epub.read_epub(epub_path)
    chapter_refs = get_chapter_refs(book)

    for ref in chapter_refs:

        html_content = book.get_item_with_href(ref).get_content().decode("utf-8")
        # Extract just the text, get rid of all other tags
        soup = BeautifulSoup(html_content, "html.parser")

        # Extract just the text content
        text_content = soup.get_text()

        split_content = text_content.split("\n")
        split_content = [x for x in split_content if x != ""]
        if len(split_content) > 0:
            if len(split_content[0]) < 50:
                if split_content[0].lower() == chapter.lower():
                    answer = get_gemini_answer(question, text_content)
                    return answer, 200

    return "The chapter does not exist", 200


def get_gemini_answer(question, text_content):
    prompt = PROMPT.format(text_content, question)
    answer = model.generate_content(prompt)
    return answer.text
