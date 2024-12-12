import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10; // Кількість ітерацій для генерації salt

// Шифрування пароля
export const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Хешування пароля з salt
  return hashedPassword;
};

// Перевірка пароля
export const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword); // Порівняння пароля з хешем
  return isMatch; // Повертає true, якщо пароль співпадає
};
