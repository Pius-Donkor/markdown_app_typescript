import styled from "styled-components";
import ContentBar from "../ui/ContentBar";

const EditorSection = styled.div`
  width: 50%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 60px); /* Adjust height based on navbar height */
`;

const Editor = styled.textarea`
  width: 100%;
  height: 100%;
  border: transparent;
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
}

export default function Markdown({
  input,
  setInput,
  fullPreview,
}: MarkdownProps) {
  return fullPreview ? (
    ""
  ) : (
    <EditorSection>
      <ContentBar>
        <span>markdown</span>
      </ContentBar>
      <Editor value={input} onChange={(e) => setInput(e.target.value)} />
    </EditorSection>
  );
}
