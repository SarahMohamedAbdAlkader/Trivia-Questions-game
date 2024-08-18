import { useNavigate } from "react-router-dom/";

import Button from "components/Button/index";

import { Wrapper } from "./404.styles";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Button label="New Game" onClick={() => navigate("/")} />
    </Wrapper>
  );
}
