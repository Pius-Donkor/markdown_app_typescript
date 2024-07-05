import styled from "styled-components";

interface IconProps {
  type?: string | null;
}

const Icon = styled.img<IconProps>`
  width: ${({ type }) => (type === "small" ? "15px" : "20px")};
  height: ${({ type }) => (type === "small" ? "15px" : "20px")};
  cursor: pointer;
`;

export default Icon;
