import styled from "styled-components";

import { BUTTON_TYPES } from "constants/button";
import { usePlayer } from "contexts/player";
import { GAME_LEVELS } from "constants/game";

import Button from "components/Button";

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 55px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d9d9d9;
  border-radius: 22px;
  max-width: 616px;
  width: 100%;
  min-height: 448px;
  margin-bottom: 46px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 410px;
  gap: 38px;
  padding: 20px;
`;

const Input = styled.input`
  height: 110px;
  font-size: 25px;
  background: #f2f2f2;
  border: 1px solid #000000;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 35px;
`;

export default function WelcomeScreen({ onChooseLevel }) {
  const { playerInfo, setPlayerInfo } = usePlayer();

  const onChange = ({ target: { value } }) => {
    setPlayerInfo({ ...playerInfo, name: value });
  };

  return (
    <Card>
      <form>
        <CardContent>
          <Input
            placeholder="Player name"
            onChange={onChange}
            required
            value={playerInfo.name}
          />
          <ButtonsWrapper>
            {GAME_LEVELS.map(({ label }) => (
              <Button
                label={label}
                key={label}
                active={playerInfo.level === label}
                size={BUTTON_TYPES.SQUARE}
                onClick={() => onChooseLevel(label)}
              />
            ))}
          </ButtonsWrapper>
        </CardContent>
      </form>
    </Card>
  );
}
