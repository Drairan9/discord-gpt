import { CommandInteractionOptionResolver } from 'discord.js';
import client from '../..';
import { Event } from '../../client/event';
import { ExtendedInteractionInterface } from '../../interfaces/commandInterface';

export default new Event('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp('This command does not exist.');

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteractionInterface,
        });
    }
});
