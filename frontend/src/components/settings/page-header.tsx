import { Header } from "./styled-components";

function PageHeader({ setOpenPanel, openPanel }: PageHeaderProps) {
  return (
    <Header>
      <h1>Settings</h1>
      <button onClick={() => setOpenPanel((prev) => !prev)}>
        {openPanel ? "X" : ">"}
      </button>
    </Header>
  );
}

export default PageHeader;
