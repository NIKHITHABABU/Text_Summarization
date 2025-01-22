// Used to store all the configuration variables for the application

let jshost = 'http://localhost:3000';
const pyhost = 'http://localhost:8000';
// const pyhost = 'http://64.227.177.74:8000'
jshost = ''; // Use this if you want to use the same host as the frontend

const config = {
    name: 'Concisely',
    org: 'Xenith Inc.',
    server: {
        port: 3000,
    },
    summarizer: {
        js: {
            host: jshost,
            endpoint: '/api/summarize',
        },
        py: {
            host: pyhost,
            endpoint: '/api/summarize',
        },
    },
    ocr: {
        host: jshost,
        endpoint: '/api/ocr',
    },
    pdf: {
        host: jshost,
        endpoint: '/api/summarize_pdf',
    },
};

export default config;