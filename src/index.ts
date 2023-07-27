import { ExtendedClient } from './client/client';

const client = new ExtendedClient();

(async () => {
    client.start();
})();

export default client;
