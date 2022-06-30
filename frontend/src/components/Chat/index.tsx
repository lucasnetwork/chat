/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { FC, useState } from 'react';
import Container from './styles';

interface ChatProps {
  onSubmit: (message: string) => void;
  messages: string[];
}

const Chat: FC<ChatProps> = ({ onSubmit, messages }) => {
  const [message, setMessage] = useState('');
  return (
    <Container>
      <div>
        {messages.map((oldMessage, index) => (
          <p key={index}>{oldMessage}</p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message) {
            onSubmit(message);
            setMessage('');
          }
        }}
      >
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">a</button>
      </form>
    </Container>
  );
};

export default Chat;
