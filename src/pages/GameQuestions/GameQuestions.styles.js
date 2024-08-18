import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const QuestionTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 34px;
  text-align: center;
  white-space: pre-wrap;
`;

export const AnswersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1096px;
  width: 100%;
  gap: 57px;
  margin-bottom: 130px;
`;

export const SkipNextWrapper = styled.div`
  display: flex;
  gap: 57px;
  margin-bottom: 50px;
`;

export const TimerWrapper = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 50px;
`;
