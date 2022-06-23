import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './styles';

function Login() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post('http://localhost:3000/login', {
              phone,
            })
            .then(() => {
              localStorage.setItem('phone', phone);
              navigate('/chat');
            });
        }}
      >
        <fieldset>
          <label htmlFor="phone">
            Telefone
            <input
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </fieldset>
        <button type="submit">Logar</button>
      </form>
    </Container>
  );
}

export default Login;
