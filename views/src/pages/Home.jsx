import { CopyToClipboard } from 'react-copy-to-clipboard';
import Navbar from "../components/Navbar"
import { Helmet } from "react-helmet"
import config from "../../../config/config.js"
import '../assets/css/home.css'
import { useEffect, useState } from "react"
import { Toaster, toast } from 'sonner';
import Copy from "../assets/icons/Copy"
import Speak from "../assets/icons/Speak"
import language from '../../../languages/language';
import Footer from '../components/Footer';
import Bulb from '../assets/icons/Bulb';
import File from '../assets/icons/File';
import Reset from '../assets/icons/Reset';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Backdrop, Box, Slider, Typography } from '@mui/material';
import Progressbar from '../components/Progressbar.jsx';

const MAX = 250;
const MIN = 100;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

const Home = () => {

  // Input Text
  const [inpText, setInpText] = useState(''); // The input text to be summarized.
  const [showSpeak, setShowSpeak] = useState(false);
  useEffect(() => {
    if (!inpText) {
      setShowSpeak(false);
    } else {
      setShowSpeak(true);
    }
  }, [inpText]);
  
  const [val, setVal] = useState(MIN);
  const [textToCopy, setTextToCopy] = useState(''); // The text you want to copy.
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied.
  const [showCopy, setShowCopy] = useState(false); // To show the copy button [true/false
  const [open, setOpen] = useState(false);


  useEffect(() => {
    open ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
  }, [open]);

  const loadingtext = ['Analyzing text', 'Summarizing text', 'Generating summary', 'Almost done'];
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((loading) =>
        loading < 3 ? loading + 1 : 3
      );
    }, 7000);
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    if (copyStatus === true) {
      toast.success('Copied to clipboard.', {
        duration: 1500,
        position: 'bottom-right',
        showIcon: true,
        icon: '📋',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '16px',
        }
      })
    }
  }, [copyStatus]);

  useEffect(() => {
    if (textToCopy.length > 0) {
      setShowCopy(true);
      setLoading(0);
    } else {
      setShowCopy(false);
      setLoading(0);
    }
  }, [textToCopy]);

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };


  const { register, handleSubmit } = useForm();

  const submitSummarize = (data) => {
    data.wordcount = val;
    setOpen(true);
    axios.post(config.summarizer.js.host + config.summarizer.js.endpoint, data)
      .then((response) => {
        setTextToCopy(response.data.summary);
        setOpen(false);
        setLoading(0);
      })
  };

  // speak
  const speak = () => {
    if (!inpText) {
      alert('Please enter some text to speak.');
      return;
    }
    responsiveVoice.speak(inpText, "UK English Female");
  };

  const resetFields = () => {
    setInpText('');
    setTextToCopy('')
  }

  const handleChange = (_, newValue) => {
    setVal(newValue);
  };



  return (
    <>
      <Helmet><title className='uppercase'>{config.name}</title></Helmet>
      <Navbar />
      <section className="bg-gradient-to-b from-gray-900 to-[#131e29] min-h-[90vh]">
        <div className="flex flex-col items-center space-x-0 space-y-10 justify-center py-10 md:flex-row md:space-y-0 md:space-x-10">

          {/* Input Component  */}
          <div className='output-wrapper'>
            <textarea id="inputtext" value={inpText} {...register('text')} onChange={(e) => setInpText(e.target.value)} className="inputtextarea " placeholder="Write or paste your text here..." />
            {
              showSpeak ? <div className="output-cpy-btn">
                <button className='p-1 rounded' onClick={speak}>
                  <Speak />
                </button>
              </div> : null
            }
          </div>
          <div>
            <select id="countries" {...register('lang')} className="bg-gray-50 font-bold w-36 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {language.map((lang) => (
                <option className='font-bold' key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            {/* <h1 className='text-center text-white mt-2'>Word Count</h1>
            <Box sx={{ width: 150 }}>
              <Slider
                marks={marks}
                step={10}
                value={val}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                onChange={handleChange}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="body2"
                  onClick={() => setVal(MIN)}
                  sx={{ cursor: 'pointer', color: 'white' }}
                >
                  {MIN}
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => setVal(MAX)}
                  sx={{ cursor: 'pointer', color: 'white' }}
                >
                  {MAX}
                </Typography>
              </Box>
            </Box> */}
            <button onClick={handleSubmit(submitSummarize)} type="button" className="text-white w-36 mt-3 flex flex-row bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600">
              <Bulb fill='#ffffff' stroke='#ffffff' />&nbsp;
              Summarize
            </button>
            <a href="/upload">
              <button type="button" className="text-white w-36 mt-3 flex flex-row bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5  justify-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600">
                <File fill='#ffffff' stroke='#ffffff' />&nbsp;
                From File
              </button>
            </a>
            <button onClick={resetFields} type="button" className="text-white w-36 mt-3 flex flex-row bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5  justify-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600">
              <Reset fill='#ffffff' stroke='#ffffff' />&nbsp;
              Reset
            </button>
          </div>


          {/* Output Component */}
          <div className='output-wrapper'>
            <textarea value={textToCopy} onChange={(e) => setTextToCopy(e.target.value)} className="inputtextarea" placeholder="Summarized text will appear here..." disabled={!showCopy} readOnly />
            {showCopy ?
              <div className='output-cpy-btn'>
                <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
                  <button className='p-1 rounded'>
                    <Copy />
                  </button>
                </CopyToClipboard>
              </div> : null}
          </div>

        </div>
      </section>
      <Toaster richColors position="bottom-right" />
      <Backdrop
        sx={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)' }}
        open={open}
      >
        <div className='text-center'>
          <h1 className='text-xl pb-2 font-skyer'>
            {loadingtext[loading]}
          </h1>
          <Progressbar />
        </div>
      </Backdrop>
      <Footer />
    </>
  )
}

export default Home