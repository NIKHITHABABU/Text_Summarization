from transformers import BartForConditionalGeneration, BartTokenizer
from googletrans import Translator
from fastapi import FastAPI, Form
import uvicorn
import PyPDF2

app = FastAPI()

# # Load the BART model and tokenizer
model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")
tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")

# Function to read PDF and summarize
def read_pdf(filename):
    with open('pdfs/'+filename, 'rb') as pdf_file:                
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        page_nums = len(pdf_reader.pages)
        for page_obj in pdf_reader.pages:
            text = page_obj.extract_text()
            summarized_text = summarize(text, target_language="en")
            return summarized_text

# Function to summarize text
def summarize(text, min_length=100, max_length=300, target_language="en"):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=1024)
    summary_ids = model.generate(
        inputs["input_ids"],
        min_length=min_length,
        max_length=max_length,
        early_stopping=True,
        num_beams=4,
        no_repeat_ngram_size=2,
        length_penalty=2.0
    )
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    translator = Translator()
    translated_text = translator.translate(summary, dest=target_language)
    return translated_text.text

@app.post("/api/summarize")
async def summarize_text(text: str = Form(...), lang: str = Form(...), wordcount: int = Form(...)):
    summarized_text = summarize(text,min_length=wordcount , target_language=lang)
    return { "summary": summarized_text, "status_code": 200 }

@app.post("/api/summarizethepdf")
async def summarize_pdf(filename: str = Form(...)):
    summarized_text = read_pdf(filename)
    return { "summary": summarized_text, "status_code": 200 }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)