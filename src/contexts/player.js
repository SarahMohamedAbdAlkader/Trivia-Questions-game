import { GAME_LEVELS_KEYS } from "constants/game";
import React, { createContext, useContext, useState } from "react";

export const PlayerContext = createContext({});
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState({
    level: GAME_LEVELS_KEYS.EASY,
    name: "Anonymous player",
    selectedCategories: [],
  });

  return (
    <PlayerContext.Provider
      value={{
        playerInfo,
        setPlayerInfo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
