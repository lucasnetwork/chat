/* eslint-disable react/function-component-definition */
import React, { MouseEventHandler } from 'react';
import Container from './styles';

const ChatButton: React.FC<{
  data: {
    messages: string[];
    phone: string;
  };
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ data, onClick }) => {
  return (
    <Container>
      <button type="button" onClick={onClick}>
        <img />
        <div>
          <h2>{data.phone}</h2>
          <p>{data.messages[data.messages.length - 1]}</p>
        </div>
      </button>
    </Container>
  );
};

export default ChatButton;
