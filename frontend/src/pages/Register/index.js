import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg' 

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [fu, setFu] = useState('');

  const history = useHistory();
  
  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      fu,
    };

    try {
      const response = await api.post('ongs', data);

      alert (`Your acess ID: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert('Register error, try again.')
    }
  }

  return  (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Register</h1>
          <p>Register, join the platform and help people to find the cases from your NGO.</p>

          <Link className="back-link" to="/">
                <FiArrowLeft size={16} color="#E02041" />
                Go back
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="NGO Name" 
            required="true"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            required="true"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input 
            placeholder="Whats-App"
            required="true"
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="City"
              required="true" 
              value={city}
              onChange={event => setCity(event.target.value)}
            />
            <input 
              placeholder="FU"
              required="true"
              maxLength="2"
              style={{ width: 80 }}
              value={fu}
              onChange={event => setFu(event.target.value)}
            />
          </div>

          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}