import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
`;

export const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  max-width: 1072px;
  gap: 34px;
  margin-bottom: 75px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 486px;
  min-height: 264px;
  height: fit-content;
  background: #e8e8e8;
  border: 1px solid #000000;
  border-radius: 4px;
  width: 100%;
`;

export const Label = styled.span`
  font-size: 40px;
  line-height: 52.8px;
`;

export const TimeValue = styled.span`
  font-size: 80px;
  line-height: 52.8px;

  line-height: 52.8px;
`;

export const TimeWrapper = styled.span`
  display: flex;
  align-items: flex-end;
  margin-top: 30px;
`;
