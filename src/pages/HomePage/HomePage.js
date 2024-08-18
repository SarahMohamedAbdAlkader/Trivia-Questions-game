import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { BUTTON_TYPES } from "constants/button";
import { getSessionToken } from "services/session";
import { usePlayer } from "contexts/player";
import { KEYBOARD_KEYS } from "constants/keyboard-keys";
import { GAME_LEVELS_KEYS } from "constants/game";

import WelcomeScreen from "components/WelcomeScreen/index";
import Button from "components/Button";
import KeyboardHints from "components/KeyboardHints";
import { MainContent, Wrapper } from "./HomePage.styles";

export default function HomePage() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [enteredData, setEnteredData] = useState({
    level: GAME_LEVELS_KEYS.EASY,
    name: cookies?.name,
  });

  const navigate = useNavigate();
  const { playerInfo, setPlayerInfo } = usePlayer();

  const { data } = useQuery({
    queryKey: ["sessionToken"],
    queryFn: getSessionToken,
    enabled: !cookies?.sessionToken,
  });

  const onChooseLevel = (level) => {
    setEnteredData((prev) => ({ ...prev, level }));
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
  }, [data, playerInfo, setCookie, setPlayerInfo]);

  useEffect(() => {
    if (!playerInfo?.sessionToken) {
      setPlayerInfo({
        ...playerInfo,
        name: cookies?.playerName,
        sessionToken: cookies?.sessionToken,
      });
    }
  }, [
    playerInfo,
    setPlayerInfo,
    setCookie,
    cookies?.sessionToken,
    cookies?.playerName,
  ]);

  const onSubmit = () => {
    if (!enteredData.name) {
      alert("Please, Enter your name first");
      return;
    }
    setPlayerInfo((prev) => ({
      ...prev,
      ...enteredData,
      selectedCatgeory: null,
    }));
    setIsSubmitActive(true);
    setCookie("playerName", enteredData.name);
    setCookie("playerLever", enteredData.level);
    removeCookie("categoryName");
    navigate("/category");
  };

  return (
    <Wrapper>
      <MainContent>
        <WelcomeScreen
          enteredData={enteredData}
          setEnteredData={setEnteredData}
          onChooseLevel={onChooseLevel}
        />
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
