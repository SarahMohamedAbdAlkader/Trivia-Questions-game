import { useNavigate } from "react-router-dom";

import { usePlayer } from "contexts/player";

import Button from "components/Button/index";
import PieChart from "components/PieChart/index";
import StackedBarChart from "components/StackedBarChart/index";

import {
  Card,
  CardsWrapper,
  ContentWrapper,
  Label,
  TimeValue,
  TimeWrapper,
  Wrapper,
} from "./ScoreScreen.styles";
import { useEffect } from "react";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!gameQuestion.length) {
      navigate("/");
    }
  }, [gameQuestion, navigate]);

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
            <StackedBarChart gameQuestion={gameQuestion || []} />
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
