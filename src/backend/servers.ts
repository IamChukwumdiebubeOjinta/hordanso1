import {env} from 'process'
import express from "express";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";
import { AxiosRequestConfig } from 'axios';

interface OpenAITranslateConfig extends AxiosRequestConfig {
    engine: string;
  }

// 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
const app = express();
const port = process.env.PORT || 3000;
const configuration = new Configuration({
    organization: "org-DtDtcQSD7BUwH8p2FCsJFIkz",
    apiKey: env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

async function callApi() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });
      console.log(response.data.choices[0].text);

}

callApi()

// app.post("/", async (req, res) => {
//   const message = req.body.message;

//   try {
//     if (message.startsWith("Translate:")) {
//         const text = message.substring(10).trim();
        
        // const response = await openai.listEngines({
        //   engine: "text-davinci-002",
        //   text,
        //   targetLanguage: "es"
        // });
//   if (response.data.translations.length > 0) {
//     const translatedText = response.data.translations[0].translated_text;
//     console.log(`Translated text: ${translatedText}`);
//     res.send(translatedText);
//   } 
//   else {
//     console.log(`No translations found.`);
//     res.send("No translations found.");
//   }
        // const translatedText = response.data.translations[0].translated_text;
        // res.send(translatedText);
    //   } 
//       else {
//         res.send("Invalid message format.");
//       }
//   } catch (error) {
//     res.send(error)
//   }
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
