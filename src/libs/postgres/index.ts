import { Client, QueryResult } from 'pg';

import { logger } from 'src/libs/logger';

import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from 'src/config';

// todo:: (maybe) custom type parsers with get and set type parser
// import * as types from 'pg-types';

// todo:: (refactor) Should be done with Pool's to have transactions allowed
export class PostgresClient {
    private client: Client;

    public isConnected: boolean;

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

        this.query = this.query.bind(this);

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

    async query<T>(query: string, values?: unknown[]): Promise<QueryResult<T>> {
        logger.info(
            `Executing query: ${query}${
                values?.length
                    ? `\n\t\x1b[33mValues: ( ${values
                          ?.map((item) => (item instanceof Array ? `[${item.join(', ')}]` : item))
                          .join(', ')} )\x1b[0m`
                    : ''
            }`
        );
        return this.client.query<T>(query, values);
    }
}
