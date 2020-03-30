import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ngoId = localStorage.getItem('ngoId');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId,
        }
      });

      history.push('/profile');
      alert('Case succesfully registered.')
    } catch (err) {
      alert('Register error, try again.');
    }
  }

  return (
    <div className="new-incident-container">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"/>

        <h1>Register new case</h1>
        <p>Describe the case in detail, to find a hero willing to save this companion.</p>

        <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#E02041" />
              Home
        </Link>
      </section>

      <form onSubmit={handleNewIncident}>
        <input 
          placeholder="Case title"
          required={true}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        
        <textarea 
          placeholder="Description"
          required={true}
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        
        <input 
          placeholder="Value in Dollars"
          required={true}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        

        <button className="button" type="submit">Register</button>
      </form>
    </div>
  </div>
  );
}