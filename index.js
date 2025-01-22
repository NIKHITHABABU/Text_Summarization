import express from "express";
import bodyParser from "body-parser";
import "colors";
import path from "path";
import config from "./config/config.js";
const __dirname = path.resolve();
import Summarize from "./api/js/summarize.js";
import Ocr from "./api/js/ocr.js";
import SummarizePDF from "./api/js/pdf.js";
import multer from "multer";

// Clear the console
console.clear();

// Initialize Express
const app = express();
const uploadsDir = path.join(__dirname, 'pdfs');
const pdfs = multer({ dest: uploadsDir });

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.static(path.join(__dirname, "/dist")));

// Home endpoint
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.post("/api/summarize", (req, res) => {
  Summarize(req, res, config);
});

app.post("/api/ocr", (req, res) => {
  Ocr(req, res, config);
});

app.post('/api/summarize_pdf', pdfs.single('file'), (req, res) => {
  SummarizePDF(req, res, config);
});

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`.green.bold);
  console.log(`URL: http://localhost:${config.server.port}`.yellow.bold);
});
