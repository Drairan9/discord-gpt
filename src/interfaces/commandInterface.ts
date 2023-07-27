import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable,
} from 'discord.js';
import { ExtendedClient } from '../client/client';

export interface ExtendedInteractionInterface extends CommandInteraction {
    member: GuildMember;
}

interface RunOptionsInterface {
    client: ExtendedClient;
    interaction: ExtendedInteractionInterface;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptionsInterface) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;
