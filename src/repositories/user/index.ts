import { BaseRepository } from 'src/repositories/base.repository';
import { ShortUserInfo } from 'src/repositories/user/types';

export class UserRepository extends BaseRepository {
    public async findById(id: number): Promise<ShortUserInfo> {
        const result = await this.db.query<ShortUserInfo>(
            `
            SELECT  "id",
                    "email",
                    "firstName",
                    "lastName",
                    "createdAt",
                    "updatedAt"
            FROM "Users"
            WHERE   "deletedAt" IS NULL
                AND "id" = $1
            LIMIT 1;`,
            [id]
        );

        return result?.rows[0];
    }
}
