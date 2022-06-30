import styled from 'styled-components';

export default styled.div`
  display: flex;
  height: 100%;

  > aside {
    width: 300px;
    border-right: 1px solid #000;
  }
  > div {
    flex: 1;
  }

  .new_contact {
    width: 100%;
    height: 5rem;
    background: #42bfdd;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
  }

  .new_phone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    fieldset {
      border: none;
      margin-top: 0.5rem;
      label {
        display: flex;
        flex-direction: column;

        input {
          height: 2rem;
          width: 300px;
        }
      }
    }

    button {
      width: 300px;
      cursor: pointer;
      height: 2rem;
      background: #084b83;
      color: #fff;
      border: none;
      margin-top: 1rem;
      border-radius: 8px;
    }
  }
`;
