import { QuestionCardWrapper } from "./index.styles";

export default function QuestionCard({ value, id, active, onClick, disabled }) {
  return (
    <QuestionCardWrapper
      key={id}
      active={active}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </QuestionCardWrapper>
  );
}
