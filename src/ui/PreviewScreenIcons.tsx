import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import styled, { css } from "styled-components";

const IconStyle = css`
  font-size: 20px;
  color: var(--color-grey-100);
  cursor: pointer;
  &:hover {
    color: var(--color-orange-0);
  }
`;

const ShowPreviewIcon = styled(FiEye)`
  ${IconStyle}
`;
const ClosePreviewIcon = styled(FiEyeOff)`
  ${IconStyle}
`;

interface PreviewScreenIcon {
  state: boolean;
  setState: (parameter: boolean) => void;
}

export default function PreviewScreenIcons({
  state,
  setState,
}: PreviewScreenIcon) {
  return (
    <>
      {state ? (
        <ClosePreviewIcon onClick={() => setState(!state)} />
      ) : (
        <ShowPreviewIcon onClick={() => setState(!state)} />
      )}
    </>
  );
}
