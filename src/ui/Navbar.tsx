import styled from "styled-components";
import Icon from "./Icon";
import DocumentInput from "./DocumentInput";
import Button from "./Button";
import { ChangeEvent } from "react";
import useGetScreen from "../hooks/useGetScreen";
import { RiDeleteBinLine } from "react-icons/ri";
// navbar
const StyledNavbar = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "shifted",
})<{ shifted: boolean }>`
  background-color: var(--color-dark-200);
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  transition: margin-left 0.3s ease;
  width: 100vw;
  margin-left: ${({ shifted }) => (shifted ? "250px" : "0")};
`;

// image tag for the icons
const OpenCloseIcon = styled.img<{ open?: boolean }>`
  width: ${({ open }) => (open ? "30px" : "25px")};
  &:hover {
    background-color: var(--color-orange-0);
  }
  @media screen and (max-width: 700px) {
    width: ${({ open }) => (open ? "25px" : "20px")};
  }
`;

// markdown heading
const StyledHeading = styled.span`
  color: var(--color-white-0);
  letter-spacing: var(--char-spacing);
  font-size: var(--font-size-small);
  text-transform: uppercase;
  font-weight: var(--text-bold);
`;

// button for containing icons
const ButtonIcon = styled.button<{ $ismobile?: boolean }>`
  background-color: var(--color-dark-300);
  height: 4rem;
  width: 4.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 300ms;
  &:hover {
    background-color: var(--color-orange-0);
  }

  @media screen and (max-width: 700px) {
    height: ${({ $ismobile }) => ($ismobile ? "fit-content" : "4rem")};
    width: ${({ $ismobile }) => ($ismobile ? "fit-content" : "4rem")};
  }
`;

const DeleteIcon = styled(RiDeleteBinLine)`
  font-size: 30px;
  color: var(--color-grey-100);
  transition: color 300ms;
  cursor: pointer;
  &:hover {
    color: var(--color-orange-0);
  }
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
`;

interface NavbarProps {
  sidebarVisible: boolean;
  currentDocument: { name: string; createdAt: string; content: string } | null;
  setSidebarVisible: (visible: boolean) => void;
  handleShowModal: () => void;
  handleSave: () => void;
  handleNameChange: (parameter: ChangeEvent<HTMLInputElement>) => void;
}

function Navbar({
  sidebarVisible,
  currentDocument,
  setSidebarVisible,
  handleShowModal,
  handleSave,
  handleNameChange,
}: NavbarProps) {
  const { isMobile } = useGetScreen();
  return (
    <StyledNavbar shifted={sidebarVisible}>
      <SubContainer>
        <ButtonIcon onClick={() => setSidebarVisible(!sidebarVisible)}>
          {sidebarVisible ? (
            <OpenCloseIcon src="/assets/icon-close.svg" alt="OpenCloseIcon" />
          ) : (
            <OpenCloseIcon
              src="/assets/icon-menu.svg"
              alt="OpenCloseIcon"
              open
            />
          )}
        </ButtonIcon>
        {!isMobile && <StyledHeading>Markdown</StyledHeading>}
        {currentDocument && (
          <DocumentInput
            currentDocument={currentDocument}
            handleNameChange={handleNameChange}
          />
        )}
      </SubContainer>

      <div>
        {currentDocument && (
          <SubContainer>
            <DeleteIcon onClick={handleShowModal} />
            <Button onClick={handleSave} $ismobile={isMobile}>
              <Icon src="/assets/icon-save.svg" /> {!isMobile && "Save change"}
            </Button>
          </SubContainer>
        )}
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
