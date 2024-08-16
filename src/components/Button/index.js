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

const ButtonWrapper = styled.button`
  background: ${({ active }) => (active ? "#666" : "#b6b6b6")};
  color: ${({ active }) => (active ? "white" : "#000000")};
  font-size: 25px;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  width: ${({ size }) => getButtonWidth({ size })};
  height: ${({ size }) => getButtonHeight({ size })};
`;

export default function Button({ label, size, onClick, active = false }) {
  return (
    <ButtonWrapper
      size={size}
      type="button"
      onClick={onClick}
      active={!!active}
    >
      {label}
    </ButtonWrapper>
  );
}
