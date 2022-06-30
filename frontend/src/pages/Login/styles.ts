import styled from 'styled-components';

export default styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 300px;

    fieldset {
      border: none;

      label {
        display: flex;
        flex-direction: column;

        input {
          height: 2rem;
          margin-top: 0.5rem;
        }
      }
      margin-bottom: 1rem;
    }

    button {
      width: 100%;
      cursor: pointer;
      height: 2rem;
      background: #084b83;
      color: #fff;
      border: none;
      border-radius: 8px;
    }
  }
`;
