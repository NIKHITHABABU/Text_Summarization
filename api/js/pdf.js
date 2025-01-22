import axios from 'axios';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const formData = new FormData();

const SummarizePDF = async (req, res, config) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const file = req.file;
    const destPath = path.join(__dirname, 'pdfs', file.originalname);
    await fs.copyFile(file.path, destPath, (err) => {
        if (err) {
            console.error('Error copying file:', err);
            return res.status(500).send('Error copying file');
        }
        fs.unlink(file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting temporary file:', unlinkErr);
            }
        });
    })

    setTimeout( async () => {
        await formData.append('filename', file.originalname);
        axios.post(config.summarizer.py.host + '/api/summarizethepdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            // delete the file after summarizing
            fs.unlink(destPath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
            res.send(response.data);
        }).catch((error) => {
            res.status(500).send('Error summarizing PDF');
        });
    }, 1500);

}


export default SummarizePDF;