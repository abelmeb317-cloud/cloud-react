import { useState } from "react";
import DashboardLayout from "./components/DashboardLayout.jsx";
import FilePreviewModal from "./components/FilePreviewModal.jsx";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { useFiles, useFilteredFiles } from "./hooks/useFiles";
import "./app.css";

export default function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [openFile, setOpenFile] = useState(null);

  const {
    files,
    notice,
    clearNotice,
    uploading,
    uploadFiles,
    toggleStar,
    toggleTrash,
    deletePermanently,
  } = useFiles();

  const filteredFiles = useFilteredFiles(files, activePage, search);

  const visibleFiles =
    activePage === "Overview" ? filteredFiles.slice(0, 5) : filteredFiles;

  const totalFiles = files.filter((file) => !file.trashed).length;

  const starredCount = files.filter(
    (file) => file.starred && !file.trashed,
  ).length;

  const trashCount = files.filter((file) => file.trashed).length;

  function changePage(page) {
    setActivePage(page);
    setSearch("");
  }

  return (
    <DashboardLayout
      activePage={activePage}
      onNavigate={changePage}
      search={search}
      onSearchChange={setSearch}
      notice={notice}
      onDismissNotice={clearNotice}
    >
      {activePage === "Settings" ? (
        <Settings />
      ) : (
        <Dashboard
          activePage={activePage}
          files={visibleFiles}
          totalFiles={totalFiles}
          starredCount={starredCount}
          trashCount={trashCount}
          uploading={uploading}
          onUpload={uploadFiles}
          openFileId={openFile?.id}
          onOpenFile={setOpenFile}
          onNavigate={changePage}
          onToggleStar={toggleStar}
          onToggleTrash={toggleTrash}
          onDelete={deletePermanently}
        />
      )}
      <FilePreviewModal file={openFile} onClose={() => setOpenFile(null)} />
    </DashboardLayout>
  );
}
