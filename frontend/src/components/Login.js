import React, { useState, useEffect } from 'react';

const Login = ({ onSubmitLogin, setHeaderState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitLogin(email, password)
  };

  useEffect(() => {
    resetForm();
    setHeaderState({name: 'Зарегистрироваться', link: '/sign-up'});
  }, []);

  return (
    <div className="wrapper">
      <h2 className="wrapper__title">
        Вход
      </h2>
      <form onSubmit={handleSubmit} className="wrapper__form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="wrapper__button-container">
          <button type="submit" className="wrapper__link">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default Login;