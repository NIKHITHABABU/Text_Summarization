import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Backdrop } from "@mui/material";
import Progressbar from "../components/Progressbar";
import Copy from "../assets/icons/Copy";
import CopyToClipboard from "react-copy-to-clipboard";
import { Toaster, toast } from "sonner";
import axios from "axios";
import config from "../../../config/config";
import Reset from "../assets/icons/Reset";
import { Helmet } from "react-helmet";

const Upload = () => {
    const [outputReady, setOutputReady] = useState(false);
    const [textToCopy, setTextToCopy] = useState("");
    const [copyStatus, setCopyStatus] = useState(false);
    const [showCopy, setShowCopy] = useState(true);
    const [open, setOpen] = useState(false);

    const loadingtext = [
        "Analyzing",
        "Extracting Data",
        "Reading Text",
        "Summarizing Text",
        "Generating Summary",
        "Almost done",
    ];
    const [loading, setLoading] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setLoading((loading) => (loading < 5 ? loading + 1 : 5));
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }
    }, [open]);

    useEffect(() => {
        if (copyStatus === true) {
            toast.success("Copied to clipboard.", {
                duration: 1500,
                position: "bottom-right",
                showIcon: true,
                icon: "📋",
                style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "16px",
                },
            });
        }
    }, [copyStatus]);

    useEffect(() => {
        if (textToCopy.length > 0) {
            setShowCopy(true);
        } else {
            setShowCopy(false);
        }
    }, [textToCopy]);

    const onCopyText = () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            if (
                file.type === "image/png" ||
                file.type === "image/jpeg" ||
                file.type === "image/jpg"
            ) {
                setOpen(true);
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const base64Image = e.target.result;
                    axios.post(config.ocr.host + config.ocr.endpoint, { image: base64Image },
                        {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            }
                        }).then((response) => {
                            if (response.status === 200) {
                                const data = response.data;
                                setTextToCopy(data.summary);
                                setOutputReady(true);
                                setOpen(false);
                                setLoading(0);
                            }
                        }).catch((error) => {
                            alert("Error: " + error.message);
                            setLoading(0);
                        });
                };
                reader.readAsDataURL(file);
            } else if (file.type === "text/plain") {
                const text = await file.text();
                const data = { text: text, lang: "en" };
                setOpen(true);
                axios.post(config.summarizer.js.host + config.summarizer.js.endpoint, data,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                            const data = response.data;
                            setTextToCopy(data.summary);
                            setOutputReady(true);
                            setOpen(false);
                            setLoading(0);
                        }
                    }).catch((error) => {
                        console.error(error);
                        setLoading(0);
                    });
            } else if (file.type === "application/pdf") {
                setOpen(true);
                const pdf_file = file;
                const formData = new FormData();
                formData.append("file", pdf_file);
                axios.post(config.pdf.host + config.pdf.endpoint, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data application/x-www-form-urlencoded",
                    },
                }).then((response) => {
                    if (response.status === 200) {
                        const data = response.data;
                        setTextToCopy(data.summary);
                        setOutputReady(true);
                        setOpen(false);
                        setLoading(0);
                    }
                }).catch((error) => {
                    setLoading(0);
                    alert("Error: " + error.message);
                });
            } else {
                setLoading(0);
                toast.error("Invalid file type.", {
                    duration: 2500,
                    position: "bottom-right",
                    showIcon: true,
                    icon: "❌",
                    style: {
                        fontSize: "16px",
                        fontWeight: "bold",
                        padding: "16px",
                    },
                });
                window.location.reload();
            }
        }
    };

    const resetFields = () => {
        setOutputReady(false);
        setTextToCopy("")
    }

    return (
        <div>
            <Helmet><title className='uppercase'>{config.name} - Upload</title></Helmet>
            <Navbar />
            <div className="bg-[#2C3140] h-screen">
                {outputReady ? (
                    <center>
                        <div className="flex flex-col items-center space-x-0 space-y-10 justify-center py-10 md:flex-row md:space-y-0 md:space-x-10">
                            <div className="output-wrapper">
                                <textarea
                                    value={textToCopy}
                                    onChange={(e) => setTextToCopy(e.target.value)}
                                    className="inputtextareaocr"
                                    placeholder="Summarized text will appear here..."
                                    disabled={!showCopy}
                                    readOnly
                                />
                                {showCopy ? (
                                    <div className="output-cpy-btn-ocr">
                                        <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
                                            <button className="p-1 rounded">
                                                <Copy />
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <button type="button" onClick={resetFields} className="text-white w-36 mt-3 flex flex-row bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5  justify-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600">
                            <Reset fill='#ffffff' stroke='#ffffff' />&nbsp;
                            Reset
                        </button>
                    </center>
                ) : (
                    <div className="flex flex-row justify-center">
                        <div className="justify-center w-1/2 mt-36 font-one ">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer  dark:bg-gray-900 duration-700 hover:bg-black dark:border-gray-600 dark:hover:bg-[#2C3140]"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 md:h-10 md:w-44 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        PNG, JPG, TXT & PDF files are supported
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    accept=".txt, .png, .jpg, .jpeg, .pdf"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
            <Toaster richColors position="bottom-right" />
            <Backdrop
                sx={{
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(5px)",
                }}
                open={open}
            >
                <div className="text-center">
                    <h1 className="text-xl pb-2 font-skyer">{loadingtext[loading]}</h1>
                    <Progressbar />
                </div>
            </Backdrop>
        </div>
    );
};

export default Upload;
