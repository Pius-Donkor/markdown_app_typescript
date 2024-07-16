import styled from "styled-components";
import ContentBar from "../ui/ContentBar";
import useGetScreen from "../hooks/useGetScreen";
import PreviewScreenIcons from "../ui/PreviewScreenIcons";
import { useDarkModeContext } from "../Context/DarkModeContext";

const EditorSection = styled.div<{ $ismobile?: boolean; $isDark?: boolean }>`
  width: ${({ $ismobile }) => ($ismobile ? "100%" : "50%")};
  overflow-y: auto;
  display: flex;
  background-color: ${({ $isDark }) =>
    $isDark ? "var(--color-white-d-0)" : "var(--color-white-0)"};
  flex-direction: column;
  min-height: calc(100% - 60px); /* Adjust height based on navbar height */
  @media screen and (max-width: 700px) {
    height: calc(100dvh - 60px);
  }
`;

const Editor = styled.textarea<{ $isDark?: boolean }>`
  color: ${({ $isDark }) =>
    $isDark ? "var(--color-grey-200)" : "var(--color-dark-0)"};
  width: 100%;
  height: calc(100% - 3rem);
  border: transparent;
  background-color: transparent;
  outline: none;
  resize: none;
  padding: 10px 20px;
  font-size: var(--font-size-medium);
  font-family: var(--roboto-mono);
  line-height: var(--line-height);
`;

interface MarkdownProps {
  input: string;
  setInput: (parameter: string) => void;
  fullPreview: boolean;
  setFullPreview: (parameter: boolean) => void;
}

export default function Markdown({
  input,
  setInput,
  fullPreview,
  setFullPreview,
}: MarkdownProps) {
  const { isMobile } = useGetScreen();
  const { isDarkMode } = useDarkModeContext();
  if (isMobile && !fullPreview)
    return (
      <EditorSection $isDark={isDarkMode} $ismobile={isMobile}>
        <ContentBar $isDark={isDarkMode}>
          <span>markdown</span>
          <PreviewScreenIcons state={fullPreview} setState={setFullPreview} />
        </ContentBar>
        <Editor
          $isDark={isDarkMode}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </EditorSection>
    );

  return fullPreview ? (
    ""
  ) : (
    <EditorSection $isDark={isDarkMode}>
      <ContentBar $isDark={isDarkMode}>
        <span>markdown</span>
      </ContentBar>
      <Editor
        $isDark={isDarkMode}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </EditorSection>
  );
}
