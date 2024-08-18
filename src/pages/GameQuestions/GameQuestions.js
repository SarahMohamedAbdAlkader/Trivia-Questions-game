import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import shuffle from "lodash/shuffle";
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
  QUESTIONS_TYPE,
} from "constants/game";
import { KEYBOARD_KEYS } from "constants/keyboard-keys";

import {
  AnswersWrapper,
  Content,
  QuestionTitle,
  SkipNextWrapper,
  TimerWrapper,
  Wrapper,
} from "./GameQuestions.styles";

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
        ...(!!category && { category }),
        difficulty: playerInfo.level,
        token: playerInfo?.sessionToken,
      }),
  });

  const questions = useMemo(() => data?.results || [], [data]);
  let currentQuestion = useMemo(
    () => questions[questionId] || {},
    [questions, questionId]
  );

  const multiShuffledAnswers = useMemo(() => {
    return (
      currentQuestion.type === QUESTIONS_TYPE.MULTI &&
      shuffle([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ])
    );
  }, [currentQuestion]);

  const getNextQuestion = useCallback(() => {
    setQuestionId(questionId + 1);
  }, [questionId]);

  const onChooseAnswer = (value) => {
    setChoosenAnswer(value);
  };

  const findCatgoryInSavedQuestions = useCallback(
    (prev) => {
      const findCategoryIndex = prev.findIndex(
        ({ category }) => category === currentQuestion.category
      );
      return findCategoryIndex;
    },
    [currentQuestion.category]
  );

  const onSkip = useCallback(() => {
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
  }, [
    currentQuestion.category,
    findCatgoryInSavedQuestions,
    getNextQuestion,
    setGameQuestion,
  ]);

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
    setChoosenAnswer(null);
    currentQuestion = {};
  };

  const getSkippingTimeBasOnDifficulty = useCallback(() => {
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
  }, [playerInfo.level]);

  useEffect(() => {
    if (questionId >= data?.results?.length) {
      navigate("/category");
    }
    const timeoutId = setTimeout(() => {
      onSkip();
    }, getSkippingTimeBasOnDifficulty() * 1000);

    return () => clearTimeout(timeoutId);
  }, [
    questionId,
    data?.results?.length,
    getSkippingTimeBasOnDifficulty,
    navigate,
    onSkip,
  ]);

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

  const getPressedKeyFunction = (keyCode) => {
    switch (keyCode) {
      case KEYBOARD_KEYS.T:
        return (
          currentQuestion.type === QUESTIONS_TYPE.BOOLEON &&
          setChoosenAnswer("True")
        );
      case KEYBOARD_KEYS.F:
        return (
          currentQuestion.type === QUESTIONS_TYPE.BOOLEON &&
          setChoosenAnswer("False")
        );
      case KEYBOARD_KEYS.S:
        return onSkip();
      case KEYBOARD_KEYS.N:
        return onSubmitAnswer();
      default:
        return;
    }
  };

  window.onkeydown = function (e) {
    if (e.target.tagName === "INPUT") {
      return;
    }
    const { ONE, TWO, THREE, FOUR } = KEYBOARD_KEYS;
    const code = e.keyCode ? e.keyCode : e.which;
    if (
      currentQuestion.type === QUESTIONS_TYPE.MULTI &&
      [ONE, TWO, THREE, FOUR].includes(code)
    ) {
      const INDEXS_MAPPER = {
        [ONE]: 0,
        [TWO]: 1,
        [THREE]: 2,
        [FOUR]: 3,
      };
      const index = INDEXS_MAPPER[code];
      setChoosenAnswer(multiShuffledAnswers[index]);
    } else getPressedKeyFunction(code);
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
              onComplete={() => ({ shouldRepeat: true, delay: 0 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </TimerWrapper>
          <Content>
            <QuestionTitle>{currentQuestion?.question}</QuestionTitle>
            <AnswersWrapper>
              {currentQuestion?.type === QUESTIONS_TYPE.MULTI ? (
                multiShuffledAnswers.map((value, index) => (
                  <Button
                    label={value}
                    onClick={() => onChooseAnswer(value)}
                    active={choosenAnswer === value}
                    keyboardHint={index + 1}
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
                    keyboardHint="T"
                    size={BUTTON_TYPES.LARGE}
                  />
                  <Button
                    label="False"
                    onClick={() => onChooseAnswer("False")}
                    active={choosenAnswer === "False"}
                    keyboardHint="F"
                    size={BUTTON_TYPES.LARGE}
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
