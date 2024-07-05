import styled, { css } from "styled-components";
import { parseMarkdown } from "../utils/helper";
import ContentBar from "../ui/ContentBar";
import Icon from "../ui/Icon";

const fullScreenStyles = css`
  width: 100%;
  display: flex;
`;

const EditorSection = styled.div`
  width: 50%;
  overflow-y: auto;
  height: calc(100vh - 60px); /* Adjust height based on navbar height */
`;

const PreviewSection = styled(EditorSection).withConfig({
  shouldForwardProp: (prop) => prop !== "isfullscreen",
})<{ isfullscreen: boolean }>`
  border-left: 1px solid var(--color-grey-300);
  ${({ isfullscreen }) => (isfullscreen ? fullScreenStyles : "")}
  align-items: center;
  flex-direction: column;
`;

const PreviewWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isfullscreen",
})<{ isfullscreen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ isfullscreen }) => (isfullscreen ? "50%" : "100%")};
  height: calc(100%-3rem);
`;

const StyledPreview = styled.div`
  width: 100%;
  height: calc(100%-3rem);
  padding: 20px;
  overflow-y: auto;
`;

interface PreviewProps {
  input: string;
  fullPreview: boolean;
  setFullPreview: (parameter: boolean) => void;
}
export default function Preview({
  input,
  fullPreview,
  setFullPreview,
}: PreviewProps) {
  return (
    <PreviewSection isfullscreen={fullPreview}>
      <ContentBar>
        <span>preview</span>
        {fullPreview ? (
          <Icon
            onClick={() => setFullPreview(!fullPreview)}
            src="/assets/icon-hide-preview.svg"
          />
        ) : (
          <Icon
            onClick={() => setFullPreview(!fullPreview)}
            src="/assets/icon-show-preview.svg"
          />
        )}
      </ContentBar>
      <PreviewWrapper isfullscreen={fullPreview}>
        <StyledPreview>{parseMarkdown(input)}</StyledPreview>
      </PreviewWrapper>
    </PreviewSection>
  );
}
