/* eslint-disable no-unused-vars */
import { FC, useState } from 'react';
import Container from './styles';

interface ChatProps {
  onSubmit: (message: string) => void;
}

const Chat: FC<ChatProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  return (
    <Container>
      <div />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(message);
          setMessage('');
        }}
      >
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">a</button>
      </form>
    </Container>
  );
};

export default Chat;
