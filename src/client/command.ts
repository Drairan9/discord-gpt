import { CommandType } from '../interfaces/commandInterface';

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}
