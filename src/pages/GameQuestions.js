import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { getCategoryQuestions } from "services/questions";
import { usePlayer } from "contexts/player";
import { BUTTON_TYPES } from "constants/button";

import Button from "components/Button/index";
import KeyboardHints from "components/KeyboardHints/index";
import {
  AUTO_SKIPPING_TIME_IN_SECONDS,
  GAME_LEVELS_KEYS,
  MAX_NUMBER_OF_CATEGORIES,
  MAX_NUMBER_OF_QUESTIONS,
} from "constants/game";

const QUESTIONS_TYPE = {
  BOOLEON: "boolean",
  MULTI: "multiple",
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

const TimerWrapper = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 50px;
`;

export default function GameQuestions() {
  const [questionId, setQuestionId] = useState(0);
  const [choosenAnswer, setChoosenAnswer] = useState(null);

  const navigate = useNavigate();
  const { playerInfo, setGameQuestion, spendedTime, setSpendedTime } =
    usePlayer();
  const queryParameters = new URLSearchParams(window.location.search);
  const category = queryParameters.get("category");
  const startTime = new Date();
  const { data, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: () =>
      getCategoryQuestions({
        amount: 10,
        category,
        difficulty: playerInfo.level,
        token: playerInfo?.sessionToken,
      }),
  });
  const questions = data?.results || [];
  const currentQuestion = questions[questionId];

  const getNextQuestion = () => {
    setQuestionId(questionId + 1);
  };

  const onChooseAnswer = (value) => {
    setChoosenAnswer(value);
  };
  const findCatgoryInSavedQuestions = (prev) => {
    const findCategoryIndex = prev.findIndex(
      ({ category }) => category === currentQuestion.category
    );
    return findCategoryIndex;
  };

  const onSkip = () => {
    setGameQuestion((prev) => {
      const findCategoryIndex = findCatgoryInSavedQuestions(prev);
      if (findCategoryIndex > -1) {
        const category = { ...prev[findCategoryIndex] };
        prev.splice(findCategoryIndex, 1);
        return [
          ...prev,
          {
            ...category,
            skipped: category?.skipped ? category.skipped + 1 : 1,
          },
        ];
      } else {
        return [
          ...prev,
          {
            category: currentQuestion.category,
            skipped: 1,
          },
        ];
      }
    });
    getNextQuestion();
  };

  const onSubmitAnswer = () => {
    if (!choosenAnswer) {
      alert("Please choose an answer");
      return;
    }
    setGameQuestion((prev) => {
      const findCategoryIndex = findCatgoryInSavedQuestions(prev);
      if (findCategoryIndex > -1) {
        const category = { ...prev[findCategoryIndex] };
        prev.splice(findCategoryIndex, 1);
        return [
          ...prev,
          {
            ...category,
            ...(choosenAnswer === currentQuestion.correct_answer && {
              correct: category.correct ? category.correct + 1 : 1,
            }),
            ...(choosenAnswer !== currentQuestion.correct_answer && {
              false: category.false ? category.false + 1 : 1,
            }),
          },
        ];
      }
      return [
        ...prev,
        {
          category: currentQuestion.category,
          correct: choosenAnswer === currentQuestion.correct_answer ? 1 : 0,
          false: choosenAnswer !== currentQuestion.correct_answer ? 1 : 0,
        },
      ];
    });
    if (questionId >= MAX_NUMBER_OF_QUESTIONS) {
      const endTime = new Date();
      const firstDateInMs = startTime.getTime();
      const secondDateInMs = endTime.getTime();
      setSpendedTime(spendedTime + (secondDateInMs - firstDateInMs));
      if (playerInfo.selectedCategories.length === MAX_NUMBER_OF_CATEGORIES) {
        navigate("/score");
      } else {
        navigate("/category");
      }
    }
    getNextQuestion();
  };

  const getSkippingTimeBasOnDifficulty = () => {
    switch (playerInfo.level) {
      case GAME_LEVELS_KEYS.EASY:
        return AUTO_SKIPPING_TIME_IN_SECONDS.EASY;
      case GAME_LEVELS_KEYS.MEDIUM:
        return AUTO_SKIPPING_TIME_IN_SECONDS.MEDIUM;
      case GAME_LEVELS_KEYS.HARD:
        return AUTO_SKIPPING_TIME_IN_SECONDS.HARD;
      default:
        return AUTO_SKIPPING_TIME_IN_SECONDS.EASY;
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSkip();
    }, getSkippingTimeBasOnDifficulty() * 1000);

    return () => clearTimeout(timeoutId);
  }, [questionId]);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div>Too late...</div>;
    }

    return (
      <div>
        <div>Remaining</div>
        <div>{remainingTime}</div>
        <div>seconds</div>
      </div>
    );
  };

  return (
    <Wrapper>
      {isLoading ? (
        "...isLoading"
      ) : (
        <>
          <TimerWrapper>
            <CountdownCircleTimer
              isPlaying
              duration={getSkippingTimeBasOnDifficulty()}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </TimerWrapper>
          <Content>
            <QuestionTitle>{currentQuestion?.question}</QuestionTitle>
            <AnswersWrapper>
              {currentQuestion?.type === QUESTIONS_TYPE.MULTI ? (
                [
                  ...currentQuestion.incorrect_answers,
                  currentQuestion.correct_answer,
                ].map((value) => (
                  <Button
                    label={value}
                    onClick={() => onChooseAnswer(value)}
                    active={choosenAnswer === value}
                    // type={
                    //   !choosenAnswer
                    //     ? "default"
                    //     : choosenAnswer === currentQuestion?.correct_answer
                    //     ? "sucess"
                    //     : "danger"
                    // }
                  />
                ))
              ) : (
                <>
                  <Button
                    label="True"
                    onClick={() => onChooseAnswer("True")}
                    active={choosenAnswer === "True"}
                  />
                  <Button
                    label="False"
                    onClick={() => onChooseAnswer("False")}
                    active={choosenAnswer === "False"}
                  />
                </>
              )}
            </AnswersWrapper>
            <SkipNextWrapper>
              <Button label="Skip" onClick={onSkip} size={BUTTON_TYPES.SMALL} />
              <Button
                label="Next"
                onClick={onSubmitAnswer}
                size={BUTTON_TYPES.SMALL}
              />
            </SkipNextWrapper>
          </Content>
          <KeyboardHints showSkip showNext showAnswers />
        </>
      )}
    </Wrapper>
  );
}
