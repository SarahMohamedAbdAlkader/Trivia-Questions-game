import styled from "styled-components";

const Highlighter = styled.div`
  width: fit-content;
  height: fit-content;
  border: 1px solid #000000;
  background: #b6b6b6;
  color: #000000;
  text-transform: capitalize;
`;
export default function LetterHighlighter({ letter }) {
  return <Highlighter>{letter}</Highlighter>;
}
