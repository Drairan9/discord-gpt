import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection, GatewayIntentBits } from 'discord.js';
import { RegisterCommandsOptionsInterface } from '../interfaces/clientInterfaces';
import keys from '../keys';
import { glob } from 'glob';
import path from 'path';
import { CommandType } from '../interfaces/commandInterface';
import { Event } from './event';

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
            ],
        });
    }

    start() {
        this.loadModules();
        this.login(keys.clientToken);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommand({ commands, guildId }: RegisterCommandsOptionsInterface) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
        } else {
            this.application?.commands.set(commands);
        }
    }

    async loadModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles: string[] = await glob(`${__dirname}/../events/commands/*{.ts,.js}`);

        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(path.join('..', filePath));
            if (!command.name) return;

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on('ready', () => {
            this.registerCommand({
                commands: slashCommands,
            });
        });

        // Events
        const eventFiles: string[] = await glob(`${__dirname}/../events/discord_events/*{.ts,.js}`);

        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(path.join('..', filePath));
            this.on(event.event, event.run);
        });
    }
}
