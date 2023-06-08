/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BaseRepository } from 'src/repositories/base-repository';

export class UserRepository extends BaseRepository {
    public async findById(id: string) {
        const result = await this.db.query(
            `SELECT * FROM "Users"
            WHERE "deletedAt" IS NULL
                AND "id" = $1
            LIMIT 1;`,
            [id]
        );

        return result?.rows[0];
    }
}
