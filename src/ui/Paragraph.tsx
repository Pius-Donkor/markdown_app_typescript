import styled, { css } from "styled-components";

interface ParagraphType {
  type?: "normal" | "numberPoint" | "point";
  content?: string;
  $isDark?: boolean;
}

const paragraphStyles = {
  normal: css``,
  numberPoint: css`
    padding-left: 20px;
    display: flex;
    gap: 10px;
  `,
  point: css`
    padding-left: 20px;
    margin-left: 20px;
    &::before {
      content: "•";
      color: var(--color-orange-0);
      position: absolute;
      left: 0;
      top: 3px;
    }
  `,
};

const Paragraph = styled.p<ParagraphType>`
  ${({ type = "normal" }) => paragraphStyles[type]}
  position: relative;
  color: ${({ $isDark }) =>
    $isDark ? "var(--color-grey-200)" : "var(--color-grey-100)"};
  line-height: var(--line-height);
  font-family: var(--roboto-slap);
  font-size: var(--font-size-small);

  word-wrap: break-word;
`;

export default Paragraph;
