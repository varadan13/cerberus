
export class AuthService {
    constructor(passwordService, connection ) {}

    async createToken(identifier , password) {
        const user = await this.connection.getRepository(User).findOne({
            where: {
                identifier,
            },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const passwordMatches = await this.passwordService.check(password, user.passwordHash);

        if (!passwordMatches) {
            throw new UnauthorizedException();
        }
        const payload = { identifier, roles: user.roles };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });

        return { user, token };
    }

    async validateUser(payload): Promise<any> {
        return await this.connection.getRepository(User).findOne({
            where: {
                identifier: payload.identifier,
            },
        });
    }
}
