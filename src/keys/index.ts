import { config } from 'dotenv';
config({ path: '../.env' });

interface KeysInterface {
    clientToken: string;
    clientSecret: string;
    openaiApiKey: string;
}

const keys: KeysInterface = {
    clientToken: process.env.CLIENT_TOKEN ?? 'undefined',
    clientSecret: process.env.CLIENT_SECRET ?? 'undefined',
    openaiApiKey: process.env.OPENAI_API_KEY ?? 'undefined',
};

if (Object.values(keys).includes('undefined')) {
    throw new Error('The environment variables have not been set up correctly.');
}

console.log('\x1b[32m%s\x1b[0m', 'ENV loaded properly.');

export default keys;
