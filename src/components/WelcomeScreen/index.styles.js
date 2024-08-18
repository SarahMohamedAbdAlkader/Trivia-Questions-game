import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 55px;
`;

export const Card = styled.div`
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

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 410px;
  gap: 38px;
  padding: 20px;
`;

export const Input = styled.input`
  height: 110px;
  font-size: 25px;
  background: #f2f2f2;
  border: 1px solid #000000;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 35px;
`;
