import styled from "styled-components";

export const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 34px;
  text-align: center;
  white-space: pre-wrap;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 69px;
  margin-bottom: 20px;
`;

export const CategoriesContent = styled.div`
  max-width: 1110px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 60px;
  @media (max-width: 576px) {
    gap: 30px;
  }
`;
