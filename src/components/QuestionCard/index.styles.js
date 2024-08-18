import styled from "styled-components";

export const QuestionCardWrapper = styled.div`
  border-radius: 4px; 
  max-width: 330px;
  height; 100px;
  text-align: center;
  background: ${({ active, disabled }) =>
    disabled ? "gray" : active ? "green" : "#b6b6b6"};
  color: ${({ active }) => (active ? "white" : "black")};
  border: 1px solid #000000;
  padding: 10px;
  white-space: nowrap;
  width: 18.5vw;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  @media (max-width: 768px) {
    width: 35%;
  };
  @media (max-width: 576px) {
    width: 100%;
  }
`;
