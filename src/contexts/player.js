import React, { createContext, useContext, useState } from "react";

import { GAME_LEVELS_KEYS } from "constants/game";

export const PlayerContext = createContext({});
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState({
    level: GAME_LEVELS_KEYS.EASY,
    name: null,
    selectedCategories: [],
  });
  const [gameQuestion, setGameQuestion] = useState([]);
  const [spendedTime, setSpendedTime] = useState(0);

  return (
    <PlayerContext.Provider
      value={{
        playerInfo,
        setPlayerInfo,
        gameQuestion,
        setGameQuestion,
        spendedTime,
        setSpendedTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
