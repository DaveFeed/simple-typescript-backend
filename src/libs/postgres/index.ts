import { Client } from 'pg';
import { logger } from 'src/libs/logger';
import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from 'src/config';

// todo:: (refactor) Could be done with Pool's
export class PostgresClient {
    client: Client;

    isConnected: boolean;

    constructor() {
        this.client = new Client({
            database: PG_DATABASE,
            host: PG_HOST,
            port: PG_PORT,
            user: PG_USER,
            password: PG_PASSWORD
        });
        this.isConnected = false;

        this.client.on('error', (err) => {
            logger.error(err, 'Postgres error');
        });

        this.connect();
    }

    async connect(): Promise<void> {
        if (!this.isConnected) {
            await this.client.connect();
            this.isConnected = true;
        }

        logger.info('Connected to Postgres.');
    }

    async disconnect(): Promise<void> {
        await this.client.end();
        this.isConnected = false;

        logger.info('Disconnected from Postgres.');
    }
}
