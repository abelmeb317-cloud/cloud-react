import UploadButton from "../components/UploadButton";
import StatsGrid from "../components/StatsGrid";
import QuickAccess from "../components/QuickAccess";
import FileTable from "../components/FileTable";
import { pageTitles } from "../types/file";

export default function Dashboard({
  activePage,
  files,
  totalFiles,
  starredCount,
  trashCount,
  uploading,
  onUpload,
  openFileId,
  onOpenFile,
  onNavigate,
  onToggleStar,
  onToggleTrash,
  onDelete,
}) {
  return (
    <>
      <div className="welcome-row">
        <div>
          <div className="eyebrow">YOUR CLOUD WORKSPACE</div>

          <h1>
            {activePage === "Overview"
              ? "Good morning, John 👋"
              : pageTitles[activePage]}
          </h1>

          <p className="page-subtitle">
            {activePage === "Overview"
              ? "Here's what's happening with your cloud storage today."
              : `Manage and organize your ${activePage.toLowerCase()}.`}
          </p>
        </div>

        {activePage !== "Trash" && (
          <UploadButton
            uploading={uploading}
            onUpload={onUpload}
            onFileUploaded={onOpenFile}
          />
        )}
      </div>

      {activePage === "Overview" && (
        <>
          <StatsGrid
            totalFiles={totalFiles}
            starredCount={starredCount}
            trashCount={trashCount}
          />

          <QuickAccess
            totalFiles={totalFiles}
            starredCount={starredCount}
            onNavigate={onNavigate}
          />
        </>
      )}

      <FileTable
        files={files}
        activePage={activePage}
        openFileId={openFileId}
        onOpenFile={onOpenFile}
        onToggleStar={onToggleStar}
        onToggleTrash={onToggleTrash}
        onDelete={onDelete}
      />

      <footer className="page-footer">
        © 2026 CloudReact
        <span>Secure cloud storage, made simple.</span>
      </footer>
    </>
  );
}
