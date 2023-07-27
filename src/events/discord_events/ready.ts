import { Event } from '../../client/event';
import configJson from '../../keys/config';

export default new Event('ready', () => {
    console.log('Bot is online!');
});
