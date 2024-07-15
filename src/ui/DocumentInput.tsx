import styled, { css } from "styled-components";
import Icon from "./Icon";
import { ChangeEvent } from "react";
import useGetScreen from "../hooks/useGetScreen";

const listStyles = css`
  cursor: pointer;
`;

const StyledContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "islist",
})<{ islist?: boolean }>`
  ${({ islist }) => (islist ? listStyles : "")}
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: ${({ islist }) =>
    islist ? "transparent" : "solid var(--color-grey-0) 1.5px"};
  padding-left: ${({ islist }) => (islist ? "0" : "10px")};
  transition: color 300ms;
  &:hover .documentName {
    color: var(--color-orange-0);
  }
  @media screen and (max-width: 700px) {
    border-left: transparent;
    padding-left: 0;
    gap: ${({ islist }) => (islist ? "1rem" : "0.5rem")};
  }
`;
const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.span`
  border: transparent;
  background-color: transparent;
  font-size: var(--font-size-medium);
  color: var(--color-white-100);
  padding: 5px 0px;
  outline: none;
  min-width: 15rem;
  transition: border-bottom 0.2s ease;
`;

const StyledInput = styled.input<{ $ismobile?: boolean }>`
  border: transparent;
  background-color: transparent;
  font-size: var(--font-size-medium);
  color: var(--color-white-100);
  padding: 5px 0px;
  outline: none;
  width: ${({ $ismobile }) => ($ismobile ? "10rem" : "15rem")};
  transition: border-bottom 0.2s ease;
  &::placeholder {
    font-size: var(--font-size-medium);
    color: var(--color-white-100);
  }
  &:hover,
  &:focus {
    border-bottom: solid var(--color-white-0) 1.5px;
  }
`;

const StyledSpan = styled.span`
  font-size: var(--font-size-light);
  color: var(--color-grey-100);
`;

interface DocumentInputProps {
  notInput?: boolean;
  date?: boolean | string;
  currentDocument?: { name: string; createdAt: string; content: string } | null;
  handleNameChange?: (parameter: ChangeEvent<HTMLInputElement>) => void;
  documentName?: string;
  onClick?: () => void;
  isList?: boolean;
}

function DocumentInput({
  notInput = false,
  date = false,
  currentDocument,
  handleNameChange = () => {},
  documentName = "",
  onClick = () => {},
  isList = false,
}: DocumentInputProps) {
  const { isMobile } = useGetScreen();
  return (
    <StyledContainer islist={isList} onClick={onClick}>
      {notInput ? (
        <>
          <Icon type="small" src="/assets/icon-document.svg" />
          <StyledInputContainer>
            <StyledSpan>{date}</StyledSpan>
            <StyledName className="documentName">{documentName}</StyledName>
          </StyledInputContainer>
        </>
      ) : (
        <>
          <Icon type="small" src="/assets/icon-document.svg" />
          <StyledInputContainer>
            {!isMobile && <StyledSpan>{currentDocument?.name}</StyledSpan>}
            <StyledInput
              $ismobile={isMobile}
              placeholder={currentDocument?.name}
              value={currentDocument?.name}
              onChange={handleNameChange}
              type="text"
            />
          </StyledInputContainer>
        </>
      )}
    </StyledContainer>
  );
}

export default DocumentInput;
