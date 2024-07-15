import styled from "styled-components";

interface IconProps {
  type?: string | null;
  hoverBackground?: string | null;
}

// const hoverStyle = css`
//   fill: var(--color-orange-0);
//   color: var(--color-orange-0);
// `;

const Icon = styled.img<IconProps>`
  width: ${({ type }) => (type === "small" ? "15px" : "20px")};
  height: ${({ type }) => (type === "small" ? "15px" : "20px")};

  /* transition: fill color 300ms; */

  cursor: pointer;
`;

export default Icon;
