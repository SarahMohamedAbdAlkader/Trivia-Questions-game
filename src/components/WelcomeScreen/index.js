import { BUTTON_TYPES } from "constants/button";
import { GAME_LEVELS } from "constants/game";

import Button from "components/Button";

import { ButtonsWrapper, Card, CardContent, Input } from "./index.styles";

export default function WelcomeScreen({
  onChooseLevel,
  enteredData,
  setEnteredData,
}) {
  const onChange = ({ target: { value } }) => {
    setEnteredData((prev) => ({ ...prev, name: value }));
  };

  return (
    <Card>
      <CardContent>
        <Input
          placeholder="Player name"
          onChange={onChange}
          required
          value={enteredData.name || ""}
        />
        <ButtonsWrapper>
          {GAME_LEVELS.map(({ label }) => (
            <Button
              label={label}
              key={label}
              active={enteredData.level === label}
              size={BUTTON_TYPES.SQUARE}
              onClick={() => onChooseLevel(label)}
            />
          ))}
        </ButtonsWrapper>
      </CardContent>
    </Card>
  );
}
