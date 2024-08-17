import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { usePlayer } from "contexts/player";

import Button from "components/Button/index";
import PieChart from "components/PieChart/index";
import StackedBarChart from "components/StackedBarChart /index";

const Wrapper = styled.div`
  height: 100%;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  max-width: 1072px;
  gap: 34px;
  margin-bottom: 75px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 486px;
  height: 264px;
  background: #e8e8e8;
  border: 1px solid #000000;
  border-radius: 4px;
  width: 100%;
`;

const Label = styled.span`
  font-size: 40px;
  line-height: 52.8px;
`;

const TimeValue = styled.span`
  font-size: 80px;
  line-height: 52.8px;

  line-height: 52.8px;
`;

const TimeWrapper = styled.span`
  display: flex;
  align-items: flex-end;
  margin-top: 30px;
`;

export default function ScoreScreen() {
  const { playerInfo, gameQuestion, spendedTime } = usePlayer();
  const navigate = useNavigate();

  const time = spendedTime / 1000;

  const correctAnswers = gameQuestion.reduce(
    (accumulator, current) => accumulator + (current.correct || 0),
    0
  );
  const falseAnswers = gameQuestion.reduce(
    (accumulator, current) => accumulator + (current.false || 0),
    0
  );
  const skippedAnswers = gameQuestion.reduce(
    (accumulator, current) => accumulator + (current.skipped || 0),
    0
  );

  return (
    <Wrapper>
      <Label>{playerInfo.name}</Label>
      <ContentWrapper>
        <CardsWrapper>
          <Card>
            <Label>Time</Label>
            <TimeWrapper>
              <TimeValue>{time > 60 ? time / 60 : time}</TimeValue>
              <Label>{time > 60 ? "min" : "sec"}</Label>
            </TimeWrapper>
          </Card>
          <Card>
            <PieChart
              correctAnswers={correctAnswers}
              falseAnswers={falseAnswers}
              skippedAnswers={skippedAnswers}
            />
          </Card>
          <Card>
            <StackedBarChart gameQuestion={gameQuestion} />
          </Card>
          {/* <Card>
            <div>Time</div>
            <div>{time > 60 ? `${time / 60} min` : `${time} sec`} </div>
          </Card> */}
        </CardsWrapper>
        <Button label="New Game" onClick={() => navigate("/")} />
      </ContentWrapper>
    </Wrapper>
  );
}
