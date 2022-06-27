import styled from 'styled-components';

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    flex: 1;
  }

  form {
    display: flex;
    column-gap: 2rem;

    input {
      flex: 1;
      height: 1.5rem;
    }

    button {
      background: #000;
      border-radius: 100%;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;
