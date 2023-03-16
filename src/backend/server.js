import express from "express";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";

// 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
const app = express();
const port = process.env.PORT || 4000;
const configuration = new Configuration({
    apiKey: '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',
  });
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

async function callApi() {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });
      console.log(response.data.choices[0].text);
    } catch (error) {
      console.log(error.message)
    }
}

callApi()

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});