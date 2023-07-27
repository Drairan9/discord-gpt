import config from '../config.json';

const configOptions = ['model', 'system_prompt', 'no_content_response', 'error_response', 'username_mapping'];

configOptions.forEach((property) => {
    if (!config.hasOwnProperty(property)) {
        throw new Error(`config.json have not been set up correctly. Missing "${property}"`);
    }
});

console.log('\x1b[32m%s\x1b[0m', 'Config loaded properly.');

export default config;
