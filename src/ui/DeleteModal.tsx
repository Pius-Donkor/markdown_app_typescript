import styled from "styled-components";
import Button from "./Button";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100dvw;
  height: 100dvh;
  background-color: #0000008b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteBox = styled.div`
  padding: 20px;
  background-color: var(--color-white-0);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 20rem;
  border-radius: 5px;
  border: none;
`;

const HeadingText = styled.p`
  font-family: var(--roboto-slap);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-dark-300);
`;

const DeleteText = styled.p`
  font-family: var(--roboto-slap);
  font-size: var(--font-size-medium);
  color: var(--color-grey-100);
  line-height: var(--line-height);
`;

interface ModalProps {
  handleDelete: () => void;
  handleShowModal: () => void;
  currentDocumentName: string | undefined;
}

export default function DeleteModal({
  handleDelete,
  currentDocumentName,
  handleShowModal,
}: ModalProps) {
  return (
    <Modal onClick={handleShowModal}>
      <DeleteBox>
        <HeadingText>Delete this document?</HeadingText>
        <DeleteText>
          Are you sure you want to delete the `{currentDocumentName}` document
          and its contents? This action cannot be reversed.
        </DeleteText>
        <Button onClick={handleDelete}>Confirm & Delete</Button>
      </DeleteBox>
    </Modal>
  );
}
