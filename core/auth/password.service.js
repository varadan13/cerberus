const SALT_ROUNDS = 12;

class PasswordService {
  hash(plaintext) {
    return bcrypt.hash(plaintext, SALT_ROUNDS);
  }

  check(plaintext, hash) {
    return bcrypt.compare(plaintext, hash);
  }
}
