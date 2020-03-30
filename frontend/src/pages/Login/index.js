import React, { useState } from 'react';  
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import './style.css';

import logoImg from '../../assets/logo.svg' 
import heroesImg from '../../assets/heroes.png';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');

    } catch (err) {
      alert('No NGO found with this ID.');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Log-in</h1>

            <input 
              placeholder="Your ID"
              value={id}
              onChange={event => setId(event.target.value)}
            />
            <button className="button" type="submit">Submit</button>

            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
              Register
            </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
    );
}