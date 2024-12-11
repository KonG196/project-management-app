import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import AuthForm from '../components/AuthForm';
import { Button } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    // Отримати список зареєстрованих користувачів
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Знайти користувача з відповідними даними
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      dispatch(login(user));
      console.log('Логін успішний:', user);
      navigate('/');
    } else {
      setError('Невірний email або пароль');
    }
  };

  return (
    <AuthForm
      title="Вхід"
      fields={[
        {
          label: 'Email',
          type: 'email',
          value: email,
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
      ]}
      onSubmit={handleLogin}
      footer={
        <Button onClick={() => navigate('/register')} variant="text" color="secondary">
          Зареєструватися
        </Button>
      }
    />
  );
};

export default LoginPage;
