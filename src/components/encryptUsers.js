const fs = require('fs');
const CryptoJS = require('crypto-js');

// Дані про користувачів
const users = [
  {
    email: 'maks060691@gmail.com',
    password: 'password123',
    name: 'Admin',
    role: 'admin',
  },
  {
    email: 'user1@example.com',
    password: 'userpassword',
    name: 'User One',
    role: 'user',
  },
];

// Ключ шифрування
const secretKey = 'my-secret-key';

// Шифрування даних
const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(users), secretKey).toString();

// Запис у JSON-файл
fs.writeFileSync('users.json', JSON.stringify({ data: encryptedData }));

console.log('Дані успішно зашифровані та збережені!');
