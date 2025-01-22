// Desc: OCR API
import path from 'path';
import fs from 'fs';
import Tesseract from 'tesseract.js';
import axios from 'axios';
const __dirname = path.resolve();

const Ocr = async (req, res, config) => {
    const base64Data = req.body.image;
    const base64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = Buffer.from(base64, 'base64');

    const folderPath = path.join(__dirname, 'images');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const filePath = path.join(folderPath, 'image.png');
    fs.writeFile(filePath, binaryData, (err) => {
        if (err) {
            console.error('Failed to save image:', err);
        }
    });

    await Tesseract.recognize(filePath, 'eng', { logger: m => console.log(m) })
        .then(async ({ data: { text } }) => {
            const extracted_text = text.replace(/\r?\n|\r/g, ' ');
            await axios.post(config.summarizer.py.host + config.summarizer.py.endpoint, { text: `"${extracted_text}"`, lang: 'en', wordcount:150 },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    res.status(200).json({ text: extracted_text, summary: response.data.summary });
                })
                .catch((error) => {
                    res.status(400).send(error);
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error extracting text from image');
        });
}

export default Ocr;