import styled from "styled-components";

import LetterHighlighter from "components/LetterHighlighter";

import { ReactComponent as MoveAround } from "assets/icons/move-around.svg";

const ButtonWrapper = styled.span`
  display: flex;
  font-size: 25px;
`;

const AnswerButtonWrapper = styled.span`
  display: flex;
  font-size: 25px;
  gap: 3px;
`;

const Wrapper = styled.footer`
  display: flex;
  gap: 29px;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
`;

export default function KeyboardHints({
  showSkip,
  showNext,
  showAnswers,
  showLevels,
  showSelect,
  showStart,
}) {
  return (
    <Wrapper>
      <ButtonWrapper>
        <MoveAround /> move around
      </ButtonWrapper>
      {showLevels && (
        <>
          <ButtonWrapper>
            <LetterHighlighter letter={"e"} /> asy
          </ButtonWrapper>
          <ButtonWrapper>
            <LetterHighlighter letter={"m"} /> edium
          </ButtonWrapper>
          <ButtonWrapper>
            <LetterHighlighter letter={"h"} /> ard{" "}
          </ButtonWrapper>
          <ButtonWrapper>
            <LetterHighlighter letter={"p"} /> lay
          </ButtonWrapper>
        </>
      )}
      {showSelect && (
        <ButtonWrapper>
          <LetterHighlighter letter={"␣"} /> Select
        </ButtonWrapper>
      )}
      {showStart && (
        <ButtonWrapper>
          <LetterHighlighter letter={"s"} /> tart
        </ButtonWrapper>
      )}
      {showSkip && (
        <ButtonWrapper>
          <LetterHighlighter letter={"s"} /> kip
        </ButtonWrapper>
      )}
      {showNext && (
        <ButtonWrapper>
          <LetterHighlighter letter={"n"} /> ext
        </ButtonWrapper>
      )}
      {showAnswers && (
        <AnswerButtonWrapper>
          <LetterHighlighter letter={"1"} />
          <LetterHighlighter letter={"2"} />
          <LetterHighlighter letter={"3"} />
          <LetterHighlighter letter={"4"} />
          Answer
        </AnswerButtonWrapper>
      )}
    </Wrapper>
  );
}
