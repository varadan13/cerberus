// route "auth"

class AuthController {
  constructor(authService) {}

  async login(loginDto) {
    const { user, token } = await this.authService.createToken(
      loginDto.username,
      loginDto.password
    );

    if (token) {
      return {
        token,
        user: this.publiclyAccessibleUser(user),
      };
    }
  }

  async me(request) {
    const user = request.user;
    return this.publiclyAccessibleUser(user);
  }

  publiclyAccessibleUser(usery) {
    return {
      id: user.id,
      identifier: user.identifier,
      roles: user.roles,
    };
  }
}
