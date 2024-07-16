import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import Navbar from "./ui/Navbar";
import Sidebar from "./ui/Sidebar";
import Markdown from "./features/Markdown";
import { formatDate, generateUniqueId } from "./utils/helper";
import Preview from "./features/Preview";
import { DarkModeProvider } from "./Context/DarkModeContext";
import GlobalStyles from "./Styles/GlobalStyles";
import DeleteModal from "./ui/DeleteModal";
import toast, { Toaster } from "react-hot-toast";

interface Document {
  createdAt: string;
  name: string;
  content: string;
  id: string;
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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const savedDocuments = JSON.parse(
      localStorage.getItem("markdown-documents") || "[]"
    ) as Document[];
    setDocuments(savedDocuments);
    setCurrentDocument(savedDocuments?.[0] || null);
  }, []);

  useEffect(() => {
    if (currentDocument !== null) {
      setInput(currentDocument.content);
    } else {
      setInput("");
    }
  }, [currentDocument]);

  const handleShowModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const saveToLocalStorage = (docs: Document[]) => {
    localStorage.setItem("markdown-documents", JSON.stringify(docs));
  };

  function handleSave() {
    if (currentDocument) {
      const updatedDocuments = documents.map((doc) =>
        doc.id === currentDocument.id
          ? { ...currentDocument, content: input }
          : doc
      );
      setDocuments(updatedDocuments);
      saveToLocalStorage(updatedDocuments);
      toast.success("Document saved successfully");
    }
  }

  const handleDelete = () => {
    const updatedDocuments = documents.filter((doc) => doc !== currentDocument);
    setDocuments(updatedDocuments);
    saveToLocalStorage(updatedDocuments);
    setCurrentDocument(updatedDocuments?.[0] || null);
    toast.success("Document deleted successfully");
  };

  const handleCreate = () => {
    const newDocument: Document = {
      createdAt: formatDate(),
      name: "untitled-document.md",
      content: "",
      id: generateUniqueId(),
    };
    setDocuments([...documents, newDocument]);
    saveToLocalStorage([...documents, newDocument]);
    setCurrentDocument(newDocument);
  };

  const handleSelectDocument = (doc: Document) => {
    setCurrentDocument(doc);
    setSidebarVisible(false);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentDocument) {
      const updatedDocument = {
        ...currentDocument,
        name: event.target.value,
        content: input,
      };
      const updatedDocuments = documents.map((doc) =>
        doc.id === currentDocument.id ? updatedDocument : doc
      );
      setDocuments(updatedDocuments);
      setCurrentDocument(updatedDocument);
      saveToLocalStorage(updatedDocuments);
    }
  };

  return (
    <DarkModeProvider>
      <GlobalStyles />
      <Toaster position="top-center" reverseOrder={false} />
      <AppContainer>
        {showDeleteModal && (
          <DeleteModal
            handleDelete={handleDelete}
            currentDocumentName={currentDocument?.name}
            handleShowModal={handleShowModal}
          />
        )}
        <Navbar
          currentDocument={currentDocument}
          handleShowModal={handleShowModal}
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
            <>
              <Markdown
                input={input}
                setInput={setInput}
                fullPreview={fullPreview}
                setFullPreview={setFullPreview}
              />
              <Preview
                input={input}
                setFullPreview={setFullPreview}
                fullPreview={fullPreview}
              />
            </>
          )}
        </MainContent>
      </AppContainer>
    </DarkModeProvider>
  );
};

export default App;
