/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import axios from 'axios';
import Container from './styles';
import ChatButton from '../../components/ChatButton';
import Chat from '../../components/Chat';

function Main() {
  const [data, setData] = useState('');
  const [phone, setPhone] = useState('');
  const [messages, setMessages] = useState<
    { messages: string[]; phone: string }[]
  >([]);
  const [phoneContact, setPhoneContact] = useState<
    { phone: string; index: number } | undefined
  >(undefined);
  const [socket, setSocket] = useState<Socket>();
  const [socketOn, setSocketOn] = useState(false);
  useEffect(() => {
    if (socketOn) {
      return;
    }
    setSocketOn(true);
    const token = localStorage.getItem('token');
    const newSocker = socketIOClient('http://localhost:3000', {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSocket(newSocker);
    const currentPhone = localStorage.getItem('phone');

    async function getMessages() {
      try {
        const response = await axios.get(`http://localhost:3000/message`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newMessages: { messages: string[]; phone: string }[] = [];
        response.data.forEach((res: any) => {
          const existMessage = newMessages.findIndex(
            (group) =>
              group.phone === res.toIdUser.phone ||
              group.phone === res.idUser.phone,
          );
          if (existMessage >= 0) {
            newMessages[existMessage].messages.push(res.message);
            return;
          }
          let newPhone = res.toIdUser.phone;
          if (newPhone?.toString() === currentPhone) {
            newPhone = res.idUser.phone;
          }
          newMessages.push({
            messages: [res.message],
            phone: newPhone,
          });
        });

        setMessages(newMessages);
      } catch {
        console.log('error');
      }
    }
    getMessages();
    newSocker.connect();
    newSocker.on('connect', function () {
      newSocker.emit('identity');
      newSocker.on('message', function (e) {
        console.log('test');
        setMessages((oldMessages) => {
          const newMessagesSocket = [...oldMessages];
          const findIndex = newMessagesSocket.findIndex(
            (value) => value.phone === e.phone,
          );
          if (findIndex > -1) {
            newMessagesSocket[findIndex].messages = [
              ...newMessagesSocket[findIndex].messages,
              e.message,
            ];
          } else {
            newMessagesSocket.push({
              messages: [e.message],
              phone: e.phone,
            });
          }
          console.log('newMessagesSocket', newMessagesSocket);
          return newMessagesSocket;
        });
      });
    });
  }, [messages, socketOn]);
  return (
    <Container>
      <aside>
        <button
          onClick={() => {
            setPhoneContact(undefined);
          }}
          className="new_contact"
          type="button"
        >
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
            if (socket) {
              socket.emit('message', {
                phoneTo: phone,
                message: e,
              });
              const newMessages = [...messages];
              newMessages[phoneContact.index].messages = [
                ...newMessages[phoneContact.index].messages,
                e,
              ];
              setMessages(newMessages);
            }
          }}
        />
      ) : (
        <form
          className="new_phone"
          onSubmit={(e) => {
            e.preventDefault();
            if (socket) {
              socket.emit('message', {
                phoneTo: phone,
                phone: localStorage.getItem('phone'),
                message: data,
              });
              const newMessages = [...messages];
              const messageIndex = newMessages.findIndex(
                (message) => message.phone === phone,
              );
              if (messageIndex > -1) {
                newMessages[messageIndex].messages.push(data);
              } else {
                newMessages.push({
                  messages: [data],
                  phone,
                });
              }
              setMessages(newMessages);
              setPhone('');
            }
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
