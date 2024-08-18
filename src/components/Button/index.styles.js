import styled from "styled-components";

import { BUTTON_TYPES } from "constants/button";

const getButtonHeight = ({ size }) => {
  switch (size) {
    case BUTTON_TYPES.SMALL:
      return "46px";
    default:
      return "100px";
  }
};

const getButtonWidth = ({ size }) => {
  switch (size) {
    case BUTTON_TYPES.SQUARE:
      return "100px";
    case BUTTON_TYPES.SMALL:
      return "192px";
    default:
      return "330px";
  }
};

const getButtonFontSize = ({ size }) => {
  switch (size) {
    case BUTTON_TYPES.SQUARE:
      return "25px";
    case BUTTON_TYPES.SMALL:
      return "25px";
    default:
      return "40px";
  }
};

export const ButtonWrapper = styled.button`
  position: relative;
  background: ${({ active }) => (active ? "#666" : "#b6b6b6")};
  color: ${({ active }) => (active ? "white" : "#000000")};
  font-size: 25px;
  font-size: ${({ size }) => getButtonFontSize({ size })};
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  width: ${({ size }) => getButtonWidth({ size })};
  min-height: ${({ size }) => getButtonHeight({ size })};
  height: fit-content;
`;

export const KeyHint = styled.span`
  position: absolute;
  top: 8px;
  left: 13px;
  font-size: 25px;
  border: 1px solid rgba(0, 0, 0, 1);
  width: 15px;
  padding: 10px;
`;
