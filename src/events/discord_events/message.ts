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

    const response: string = await new openaiController(message.author.username).createPrompt(filteredMessage);
    message.reply(response);
});
