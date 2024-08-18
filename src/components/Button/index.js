import { ButtonWrapper, KeyHint } from "./index.styles";

export default function Button({
  label,
  type = "default",
  size,
  onClick,
  keyboardHint = false,
  ...props
}) {
  return (
    <ButtonWrapper size={size} type={type} onClick={onClick} {...props}>
      {keyboardHint && <KeyHint>{keyboardHint}</KeyHint>}
      {label}
    </ButtonWrapper>
  );
}
