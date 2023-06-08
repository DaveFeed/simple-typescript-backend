import jwt, { JwtPayload, Algorithm, Secret } from 'jsonwebtoken';
import { JWT_ALGORITHM, ACCESS_TOKEN_SECRET } from 'src/config';

export class JwtService {
    private readonly jwtAlgorithm: Algorithm;

    private readonly accessTokenSecret: Secret;

    constructor() {
        this.jwtAlgorithm = JWT_ALGORITHM as Algorithm;
        this.accessTokenSecret = ACCESS_TOKEN_SECRET;
    }

    public sign(payload: JwtPayload, secret: Secret): string {
        return jwt.sign(payload, secret, {
            algorithm: this.jwtAlgorithm
        });
    }

    public signAccessToken(payload: JwtPayload): string {
        return this.sign(payload, this.accessTokenSecret);
    }
}
