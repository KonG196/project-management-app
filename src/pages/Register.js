import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { Button } from '@mui/material';
import { encryptPassword } from '../components/encryptUsers'; // Імпорт bcrypt функції

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    let role = 'user'; // За замовчуванням звичайний користувач
    if (email.includes('.admin@') || email === "maks060691@gmail.com") {
      role = 'admin'; // Адміністратор
    }

    if (password !== confirmPassword) {
      alert('Паролі не співпадають');
      return;
    }

    const hashedPassword = await encryptPassword(password); // Хешуємо пароль
    const newUser = { email, password: hashedPassword, name, role };

    // Отримати існуючих користувачів
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Перевірити, чи існує користувач з таким email
    if (users.some((user) => user.email === email)) {
      alert('Користувач з такою електронною поштою вже існує');
      return;
    }

    // Додати нового користувача до масиву
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Зареєстрований користувач:', newUser);

    // Перенаправити на сторінку входу
    navigate('/login');
  };

  return (
    <AuthForm
      title="Реєстрація"
      fields={[
        {
          label: "Ім'я",
          type: 'text',
          value: name,
          onChange: (e) => setName(e.target.value),
          required: true,
        },
        {
          label: 'Email',
          type: 'email',
          value: email.toLowerCase(),
          onChange: (e) => setEmail(e.target.value),
          required: true,
        },
        {
          label: 'Пароль',
          type: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
        },
        {
          label: 'Підтвердити пароль',
          type: 'password',
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
          required: true,
        },
      ]}
      onSubmit={handleRegister}
      footer={
        <Button onClick={() => navigate('/login')} variant="text" color="secondary">
          Увійти
        </Button>
      }
    />
  );
};

export default Register;
