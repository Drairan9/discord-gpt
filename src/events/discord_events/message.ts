import { ChatCompletionRequestMessage } from 'openai';
import client from '../..';
import { Event } from '../../client/event';
import config from '../../keys/config';
import openaiController from '../../utils/openaiController';

export default new Event('messageCreate', async (message) => {
    if (client.user === null) return;
    if (!message.mentions.has(client.user)) return;

    const botName: string = `@${client.user.username}`;
    const filteredMessage: string = message.cleanContent.replace(new RegExp(botName, 'g'), '').trimStart(); // Remove ping `@bot` from the message

    message.channel.sendTyping();
    if (filteredMessage.trim() === '') return message.reply(config.no_content_response);

    const lastMessages = await message.channel.messages.fetch({ limit: 5 });
    const lastMessagesPreparedArray: ChatCompletionRequestMessage[] = [];
    lastMessages.forEach((mes) => {
        const role = mes.author.id === message.author.id ? 'assistant' : 'user';
        const content = mes.cleanContent.replace(new RegExp(botName, 'g'), '').trimStart();
        lastMessagesPreparedArray.push({ role, content });
    });

    const response: string = await new openaiController(message.author.username).createPrompt(
        filteredMessage,
        lastMessagesPreparedArray
    );
    message.reply(response);
    // message.reply('xd');
});
