import styled from "styled-components";
const ScrollWindow = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
  width: 100%;
  padding: 10px;
  gap: 10px;
  img {
    width: 100%;
  }
`;

const DropdownWithButtons = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const DropdownBox = styled.div<{ open?: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #170202;
  border: 2px solid var(--primary-color);
  width: 50%;
  place-self: center;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 400px;
  overflow-y: auto;
`;
const DropDownOpener = styled.button`
  width: 25%;
`;

const DropdownOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--primary-color);
  padding: 12px 16px;
  button {
    background-color: var(--primary-color);
    font-weight: bold;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;
const Section = styled.div`
  padding: 10px 30px;
  border-bottom: 1px solid #838383;
  display: flex;
  flex-direction: row;
  label {
    margin-bottom: 8px;
  }
  select,
  textarea {
    font-size: 24px;
    padding: 8px;
    resize: none;
  }
  textarea {
    width: 100%;
    height: 300px;
  }
`;
const LeftPanel = styled.div<{ open?: boolean }>`
  width: 600px;
  transform: translateX(${(props) => (props.open ? "0" : "-565px")});
  height: 100vh;
  background-color: #121212;
  overflow: auto;
`;
const LorasList = styled.ul`
  list-style-type: none;
  li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    input {
      width: 200px;
      margin-left: auto;
      margin-right: 50px;
      margin-top: 18px;
    }
    .input_label {
      position: absolute;
      top: 0;
      right: 40%;
      color: white;
    }
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
  background-color: #333;
  color: white;
  button {
    background-color: transparent;
    color: white;
    font-size: 24px;
    border: none;
    cursor: pointer;
  }
  h1 {
    font-size: 24px;
  }
`;
const Main = styled.main`
  overflow-y: auto;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;

export {
  DropdownWithButtons,
  DropdownBox,
  DropDownOpener,
  DropdownOption,
  Row,
  Column,
  Section,
  LeftPanel,
  LorasList,
  Header,
  Main,
  ScrollWindow,
};
