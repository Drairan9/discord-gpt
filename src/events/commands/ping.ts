import { Command } from '../../client/command';

export default new Command({
    name: 'ping',
    description: 'Test ping command.',
    run: async ({ interaction }) => {
        try {
            interaction.reply('Pong!');
        } catch (err) {
            console.error(err);
        }
    },
});
