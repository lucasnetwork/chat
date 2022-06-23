/* eslint-disable react/function-component-definition */
import React from 'react';
import Container from './styles';

const ChatButton: React.FC<{
  data: {
    messages: string[];
    phone: string;
  };
}> = ({ data }) => {
  return (
    <Container>
      <button type="button">
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
