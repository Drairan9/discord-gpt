import { Event } from '../../client/event';
import configJson from '../../keys/config';

export default new Event('ready', () => {
    console.log('test');
    console.log('Bot is online!a');
    console.log(configJson);
});
