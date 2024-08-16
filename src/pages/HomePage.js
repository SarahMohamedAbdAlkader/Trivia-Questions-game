import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { BUTTON_TYPES } from "constants/button";

import WelcomeScreen from "components/WelcomeScreen/index";
import Button from "components/Button";
import KeyboardHints from "components/KeyboardHints";
import { getSessionToken } from "services/session";
import { usePlayer } from "contexts/player";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  height: calc(100% - 10%);
`;

export default function HomePage() {
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [cookies, setCookie] = useCookies();

  const navigate = useNavigate();
  const { playerInfo, setPlayerInfo } = usePlayer();

  const { data } = useQuery({
    queryKey: ["sessionToken"],
    queryFn: getSessionToken,
    enabled: !cookies?.sessionToken,
  });

  useEffect(() => {
    if (data?.token) {
      const { token } = data;
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 6);
      setPlayerInfo({ ...playerInfo, sessionToken: token });
      setCookie("sessionToken", token, { expires: expirationDate });
    }
  }, [playerInfo, setCookie, setPlayerInfo, data]);

  const onSubmit = () => {
    setIsSubmitActive(true);
    setCookie("playerName", playerInfo.name);
    setCookie("playerLever", playerInfo.level);
    navigate("/category");
  };

  return (
    <Wrapper>
      <MainContent>
        <WelcomeScreen />
        <Button
          label="PLAY"
          size={BUTTON_TYPES.SMALL}
          onClick={onSubmit}
          active={isSubmitActive}
        />
      </MainContent>
      <KeyboardHints showLevels />
    </Wrapper>
  );
}
