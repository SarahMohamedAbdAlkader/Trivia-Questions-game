import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";

import { getCategoryQuestions } from "services/questions";
import { usePlayer } from "contexts/player";
import { BUTTON_TYPES } from "constants/button";

import Button from "components/Button/index";
import KeyboardHints from "components/KeyboardHints/index";

const QUESTIONS_TYPE = {
  BOOLEON: "boolean",
  MULTI: "multiple",
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  padding: 20px;
`;

const QuestionTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 34px;
  text-align: center;
  white-space: pre-wrap;
`;

const AnswersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1096px;
  width: 100%;
  gap: 57px;
  margin-bottom: 130px;
`;

const SkipNextWrapper = styled.div`
  display: flex;
  gap: 57px;
  margin-bottom: 50px;
`;

export default function GameQuestions() {
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(0);

  const { playerInfo } = usePlayer();
  const navigate = useNavigate();

  const onRetrieveQuestions = useCallback(async () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const category = queryParameters.get("category");
    try {
      const { results } = await getCategoryQuestions({
        amount: 10,
        category,
        difficulty: playerInfo.level,
        token: playerInfo?.sessionToken,
      });
      setQuestions(results);
    } catch (error) {}
  }, [playerInfo.level, playerInfo?.sessionToken]);

  const getNextQuestion = () => {
    setQuestionId(questionId + 1);
  };

  useEffect(() => {
    onRetrieveQuestions();
  }, [onRetrieveQuestions]);

  const currentQuestion = questions[questionId];
  return (
    <Wrapper>
      <QuestionTitle>{currentQuestion?.question}</QuestionTitle>
      <AnswersWrapper>
        {currentQuestion?.type === QUESTIONS_TYPE.MULTI ? (
          [
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer,
          ].map((value) => <Button label={value} />)
        ) : (
          <>
            <Button label="True" />
            <Button label="False" />
          </>
        )}
      </AnswersWrapper>
      <SkipNextWrapper>
        <Button
          label="Skip"
          onClick={getNextQuestion}
          size={BUTTON_TYPES.SMALL}
        />
        <Button
          label="Next"
          onClick={getNextQuestion}
          size={BUTTON_TYPES.SMALL}
        />
      </SkipNextWrapper>
      <KeyboardHints showSkip showNext showAnswers />
    </Wrapper>
  );
}
