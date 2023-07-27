import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';
import keys from '../keys';
import config from '../keys/config';
import { AxiosResponse } from 'axios';

export default class openaiController {
    private openai: OpenAIApi;
    private creatorUsername: string;
    private readonly configuration = new Configuration({
        apiKey: keys.openaiApiKey,
    });

    constructor(creatorUsername: string) {
        this.openai = new OpenAIApi(this.configuration);
        this.creatorUsername = creatorUsername;
    }

    public async createPrompt(message: string): Promise<string> {
        if (message.trim() === '') return config.error_response;

        const chatCompletion: AxiosResponse<CreateChatCompletionResponse, any> = await this.openai.createChatCompletion(
            {
                model: config.model,
                messages: [
                    { role: 'system', content: `User asking the question is named ${this.creatorUsername}.` },
                    {
                        role: 'system',
                        content: config.system_prompt,
                    },
                    { role: 'user', content: message },
                ],
            }
        );
        const response: string | undefined = chatCompletion.data.choices[0].message?.content;
        if (response === undefined) return config.error_response;
        return response;
    }
}
