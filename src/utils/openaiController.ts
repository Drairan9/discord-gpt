import { ChatCompletionRequestMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';
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

    public async createPrompt(message: string, lastMessages: ChatCompletionRequestMessage[]): Promise<string> {
        try {
            if (message.trim() === '') return config.error_response;
            const usernameFromConfig = config.username_mapping.find(
                (name) => name.username.toLocaleLowerCase() === this.creatorUsername
            );
            const realName = usernameFromConfig ? usernameFromConfig.real_name : this.creatorUsername;
            const chatCompletion: AxiosResponse<CreateChatCompletionResponse, any> =
                await this.openai.createChatCompletion({
                    model: config.model,
                    messages: [
                        ...lastMessages,
                        {
                            role: 'system',
                            content: config.system_prompt,
                        },
                        { role: 'system', content: `User first name is ${realName}.` },
                        { role: 'user', content: message },
                    ],
                });
            if (chatCompletion.status !== 200) {
                console.log(chatCompletion.request?.data);
                return config.error_response;
            }
            const response: string | undefined = chatCompletion.data.choices[0].message?.content;
            if (response === undefined) return config.error_response;
            return response;
        } catch (err: any) {
            if (err?.status !== 200) {
                console.error(err?.response.data.error);
            } else {
                console.error(err);
            }
            return config.error_response;
        }
    }
}
