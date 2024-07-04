import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./ui/Navbar";
import Sidebar from "./ui/Sidebar";
import Markdown from "./features/Markdown";
import { formatDate } from "./utils/helper";
import Preview from "./features/Preview";

interface Document {
  createdAt: string;
  name: string;
  content: string;
}

interface MainContentProps {
  shifted: boolean;
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const MainContent = styled.div<MainContentProps>`
  width: 100vw;
  display: flex;
  margin-left: ${({ shifted }) => (shifted ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  overflow: hidden;
`;

const App = () => {
  const [input, setInput] = useState<string>("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [fullPreview, setFullPreview] = useState<boolean>(false);

  useEffect(() => {
    const savedDocuments = JSON.parse(
      localStorage.getItem("markdown-documents") || "[]"
    ) as Document[];
    setDocuments(savedDocuments);
  }, []);

  useEffect(() => {
    if (currentDocument !== null) {
      setInput(currentDocument.content);
    } else {
      setInput("");
    }
  }, [currentDocument]);

  const saveToLocalStorage = (docs: Document[]) => {
    localStorage.setItem("markdown-documents", JSON.stringify(docs));
  };

  const handleSave = () => {
    if (currentDocument) {
      const updatedDocuments = documents.map((doc) =>
        doc === currentDocument ? { ...currentDocument, content: input } : doc
      );
      setDocuments(updatedDocuments);
      saveToLocalStorage(updatedDocuments);
    }
  };

  const handleDelete = () => {
    const updatedDocuments = documents.filter((doc) => doc !== currentDocument);
    setDocuments(updatedDocuments);
    saveToLocalStorage(updatedDocuments);
    setCurrentDocument(null);
  };

  const handleCreate = () => {
    const newDocument: Document = {
      createdAt: formatDate(),
      name: "untitled-document.md",
      content: "",
    };
    setDocuments([...documents, newDocument]);
    saveToLocalStorage([...documents, newDocument]);
    setCurrentDocument(newDocument);
  };

  const handleSelectDocument = (doc: Document) => {
    setCurrentDocument(doc);
    setSidebarVisible(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentDocument) {
      const updatedDocument = { ...currentDocument, name: event.target.value };
      const updatedDocuments = documents.map((doc) =>
        doc === currentDocument ? updatedDocument : doc
      );
      setDocuments(updatedDocuments);
      setCurrentDocument(updatedDocument);
      saveToLocalStorage(updatedDocuments);
    }
  };

  return (
    <AppContainer>
      <Navbar
        currentDocument={currentDocument}
        handleDelete={handleDelete}
        handleSave={handleSave}
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
        handleNameChange={handleNameChange}
      />
      <Sidebar
        documents={documents}
        sidebarVisible={sidebarVisible}
        handleCreate={handleCreate}
        handleSelectDocument={handleSelectDocument}
      />

      <MainContent shifted={sidebarVisible}>
        {currentDocument && (
          <Markdown
            currentDocument={currentDocument}
            input={input}
            setInput={setInput}
            fullPreview={fullPreview}
          />
        )}
        <Preview
          input={input}
          setFullPreview={setFullPreview}
          fullPreview={fullPreview}
        />
      </MainContent>
    </AppContainer>
  );
};

export default App;
