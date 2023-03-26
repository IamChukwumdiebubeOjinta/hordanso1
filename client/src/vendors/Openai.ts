import { Configuration, OpenAIApi } from "openai";

const configuration: Configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai: OpenAIApi = new OpenAIApi(configuration);

export default openai;