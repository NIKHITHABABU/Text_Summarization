import axios from "axios";

const Summarize = async (req, res, config) => {
    let { text, lang, wordcount } = req.body;
    if(wordcount == undefined){
        wordcount = 150
    }
    axios.post(config.summarizer.py.host + config.summarizer.py.endpoint, { text:`"${text}"`, lang, wordcount },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

export default Summarize;