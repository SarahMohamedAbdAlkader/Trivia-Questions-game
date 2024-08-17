import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { BUTTON_TYPES } from "constants/button";
import { getSessionToken } from "services/session";
import { usePlayer } from "contexts/player";
import { KEYBOARD_KEYS } from "constants/keyboard-keys";
import { GAME_LEVELS_KEYS } from "constants/game";

import WelcomeScreen from "components/WelcomeScreen/index";
import Button from "components/Button";
import KeyboardHints from "components/KeyboardHints";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  const onChooseLevel = (level) => {
    setPlayerInfo({ ...playerInfo, level });
  };

  window.onkeydown = function (e) {
    if (e.target.tagName === "INPUT") {
      return;
    }
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === KEYBOARD_KEYS.E) {
      onChooseLevel(GAME_LEVELS_KEYS.EASY);
    } else if (code === KEYBOARD_KEYS.M) {
      onChooseLevel(GAME_LEVELS_KEYS.MEDIUM);
    } else if (code === KEYBOARD_KEYS.H) {
      onChooseLevel(GAME_LEVELS_KEYS.HARD);
    } else if (code === KEYBOARD_KEYS.P) {
      onSubmit();
    }
  };

  useEffect(() => {
    if (data?.token) {
      const { token } = data;
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 6);
      setPlayerInfo({ ...playerInfo, sessionToken: token });
      setCookie("sessionToken", token, { expires: expirationDate });
    }
  }, [playerInfo, setCookie, setPlayerInfo, data]);

  useEffect(() => {
    setPlayerInfo({
      ...playerInfo,
      name: cookies?.playerName,
      sessionToken: cookies?.sessionToken,
    });
  }, []);

  const onSubmit = () => {
    if (!playerInfo.name) {
      alert("Please, Enter your name first");
      return;
    }
    setIsSubmitActive(true);
    setCookie("playerName", playerInfo.name);
    setCookie("playerLever", playerInfo.level);
    navigate("/category");
  };

  return (
    <Wrapper>
      <MainContent>
        <WelcomeScreen onChooseLevel={onChooseLevel} />
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
