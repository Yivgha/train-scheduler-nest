import * as bcrypt from 'bcryptjs';

export async function hashPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  if (!plainPassword || !hashedPassword) {
    throw new Error('Both password and hashed password are required');
  }

  return bcrypt.compare(plainPassword, hashedPassword);
}
