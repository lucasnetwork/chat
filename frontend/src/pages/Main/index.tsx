/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Container from './styles';
import ChatButton from '../../components/ChatButton';
import Chat from '../../components/Chat';

const socket = socketIOClient('http://localhost:3000');
function Main() {
  const [data, setData] = useState('');
  const [phone, setPhone] = useState('');
  const [messages, setMessages] = useState<
    { messages: string[]; phone: string }[]
  >([]);
  const [phoneContact, setPhoneContact] = useState<
    { phone: string; index: number } | undefined
  >(undefined);
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
        <button className="new_contact" type="button">
          Novo Contato
        </button>
        {messages.map((message, index) => (
          <ChatButton
            key={message.phone}
            data={message}
            onClick={() => {
              setPhoneContact({
                phone: message.phone,
                index,
              });
            }}
          />
        ))}
      </aside>
      {phoneContact ? (
        <Chat
          messages={messages[phoneContact.index].messages}
          onSubmit={(e) => {
            console.log(e);
            socket.emit('message', {
              phoneTo: phone,
              phone: localStorage.getItem('phone'),
              message: e,
            });
            const newMessages = [...messages];
            newMessages[phoneContact.index].messages = [
              ...newMessages[phoneContact.index].messages,
              e,
            ];
            setMessages(newMessages);
          }}
        />
      ) : (
        <form
          className="new_phone"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
            socket.emit('message', {
              phoneTo: phone,
              phone: localStorage.getItem('phone'),
              message: data,
            });
            setMessages((props) => [
              ...props,
              {
                messages: [data],
                phone,
              },
            ]);
            setPhone('');
          }}
        >
          <fieldset>
            <label htmlFor="phone">
              Telefone
              <input
                id="phone"
                placeholder="telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="message">
              Mensagem
              <input
                id="message"
                placeholder="Digite aqui"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </label>
          </fieldset>
          <button type="submit">Enviar</button>
        </form>
      )}
    </Container>
  );
}

export default Main;
