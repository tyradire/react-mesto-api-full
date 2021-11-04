import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onSubmitRegister, setHeaderState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitRegister(email, password);
  };

  useEffect(() => {
    resetForm();
    setHeaderState({name: 'Войти', link: '/sign-in'});
  }, []);

  return(
    <div className="wrapper">
      <h2 className="wrapper__title">
        Регистрация
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
          <button type="submit" className="wrapper__link">Зарегистрироваться</button>
        </div>
        <div className="wrapper__additional">
          <p className="wrapper__additional-text">Уже зарегистрированы?</p>
          <Link className="wrapper__additional-link" to="/sign-in">Войти</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;