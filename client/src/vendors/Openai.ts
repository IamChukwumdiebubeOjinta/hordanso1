import { Configuration, OpenAIApi } from "openai";


const configuration: Configuration = new Configuration({
  apiKey: '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',
});

const openai: OpenAIApi = new OpenAIApi(configuration);

export default openai