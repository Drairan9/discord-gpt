import { ApplicationCommandDataResolvable } from 'discord.js';

export interface RegisterCommandsOptionsInterface {
    guildId?: string;
    commands: ApplicationCommandDataResolvable[];
}
