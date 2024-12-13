import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import AuthForm from '../components/AuthForm';
import { Button } from '@mui/material';
import { verifyPassword } from '../components/encryptUsers';
import loadJSONData from '../LOAD_DATA';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      const isPasswordMatch = await verifyPassword(password, user.password);
      if (isPasswordMatch) {
        dispatch(login(user));
        navigate('/');
        return;
      }
    }

    setError('Невірний email або пароль');
  };

  return (
    <div>
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
      <Button
        onClick={loadJSONData}
        variant="contained"
        style={{ position: 'fixed', bottom: '10px', right: '10px' }}
      >
        Завантажити дані з файлу
      </Button>
    </div>
  );
};

export default LoginPage;
