import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // You can adjust the salt rounds as needed

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};