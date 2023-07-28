import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import client from '../..';
import { Event } from '../../client/event';
import config from '../../keys/config';
import openaiController from '../../utils/openaiController';
import { Collection, Message } from 'discord.js';

export default new Event('messageCreate', async (message) => {
    if (client.user === null) return;
    if (!message.mentions.has(client.user)) return;

    const MAX_LAST_MESSAGES: number = 5;
    const botName: string = `@${client.user.username}`;
    const filteredMessage: string = message.cleanContent.replace(new RegExp(botName, 'g'), '').trimStart(); // Remove ping `@bot` from the message
    if (filteredMessage.trim() === '') return message.reply(config.no_content_response);
    message.channel.sendTyping();

    const lastMessages: Collection<string, Message> = await message.channel.messages.fetch({
        limit: MAX_LAST_MESSAGES,
    });

    const lastMessagesPreparedArray: ChatCompletionRequestMessage[] = [];
    lastMessages.forEach((bufferMessage) => {
        const role: ChatCompletionRequestMessageRoleEnum =
            bufferMessage.author.id === message.author.id
                ? ChatCompletionRequestMessageRoleEnum.Assistant
                : ChatCompletionRequestMessageRoleEnum.User;
        const content: string = bufferMessage.cleanContent.replace(new RegExp(botName, 'g'), '').trimStart();
        lastMessagesPreparedArray.push({ role, content });
    });

    const response: string = await new openaiController(message.author.username).createPrompt(
        filteredMessage,
        lastMessagesPreparedArray
    );
    message.reply(response);
});
