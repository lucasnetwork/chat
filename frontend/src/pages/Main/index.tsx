/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Container from './styles';
import ChatButton from '../../components/ChatButton';

const socket = socketIOClient('http://localhost:3000');
function Main() {
  const [data, setData] = useState('');
  const [phone, setPhone] = useState('');
  const [messages, setMessages] = useState<
    { messages: string[]; phone: string }[]
  >([]);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('conectado');
      socket.emit('identity', {
        phone: localStorage.getItem('phone'),
      });
      socket.on('message', (e) => {
        const newMessages = [...messages];
        console.log('data', e);
        const findIndex = messages.findIndex(
          (value) => value.phone === e.phone,
        );
        if (findIndex > -1) {
          newMessages[findIndex].messages = [
            ...newMessages[findIndex].messages,
            e.message,
          ];
        } else {
          newMessages.push({
            messages: [e.message],
            phone: e.phone,
          });
        }
        console.log('messages', newMessages);
        setMessages(newMessages);
      });
    });
  }, []);
  return (
    <Container>
      <aside>
        {messages.map((message) => (
          <ChatButton key={message.phone} data={message} />
        ))}
      </aside>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          socket.emit('message', {
            phoneTo: phone,
            phone: localStorage.getItem('phone'),
            message: data,
          });
        }}
      >
        <input
          placeholder="telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder="Digite aqui"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit">clicar</button>
      </form>
    </Container>
  );
}

export default Main;
