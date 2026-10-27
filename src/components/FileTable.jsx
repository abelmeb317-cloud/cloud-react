import { Star, Trash2, Files } from "lucide-react";

export default function FileTable({
  files,
  activePage,
  openFileId,
  onOpenFile,
  onToggleStar,
  onToggleTrash,
  onDelete,
}) {
  return (
    <section className="panel recent-panel">
      <div className="section-heading recent-heading">
        <div>
          <h2>
            {activePage === "Overview"
              ? "Recent files"
              : activePage === "Recent"
                ? "Recent Files"
                : activePage === "Starred"
                  ? "Starred Files"
                  : activePage}
          </h2>

          <p>
            {activePage === "Trash"
              ? "Restore or permanently remove deleted items"
              : "Your files and folders"}
          </p>
        </div>
      </div>

      <div className="file-table-wrap">
        <table className="file-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Last modified</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => {
              const Icon = file.icon;

              return (
                <tr
                  key={file.id}
                  className={file.id === openFileId ? "file-row-open" : ""}
                >
                  <td>
                    <div className="file-name">
                      <div className={`file-icon ${file.color}`}>
                        <Icon size={19} />
                      </div>
                      <button
                        type="button"
                        className="file-open-button"
                        onClick={() => onOpenFile(file)}
                        aria-label={`Open ${file.name}`}
                        aria-current={file.id === openFileId ? "true" : undefined}
                      >
                        {file.name}
                      </button>
                    </div>
                  </td>

                  <td className="muted-cell">{file.type}</td>
                  <td className="muted-cell">{file.size}</td>
                  <td className="muted-cell">{file.date}</td>

                  <td>
                    <div className="file-actions">
                      {activePage !== "Trash" && (
                        <button
                          className="row-menu"
                          title={file.starred ? "Remove star" : "Add star"}
                          aria-label={`Toggle star for ${file.name}`}
                          onClick={() => onToggleStar(file.id)}
                        >
                          <Star
                            size={16}
                            fill={file.starred ? "currentColor" : "none"}
                          />
                        </button>
                      )}

                      {activePage === "Trash" ? (
                        <>
                          <button
                            className="row-menu"
                            title="Restore file"
                            aria-label={`Restore ${file.name}`}
                            onClick={() => onToggleTrash(file.id)}
                          >
                            <Files size={16} />
                          </button>

                          <button
                            className="row-menu"
                            title="Delete permanently"
                            aria-label={`Delete ${file.name}`}
                            onClick={() => onDelete(file.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          className="row-menu"
                          title="Move to Trash"
                          aria-label={`Move ${file.name} to Trash`}
                          onClick={() => onToggleTrash(file.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {files.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-state">
                  {activePage === "Trash"
                    ? "Your Trash is empty."
                    : activePage === "Starred"
                      ? "You haven't starred any files yet."
                      : "No files found. Try another search or upload a file."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>Showing {files.length} files</span>
      </div>
    </section>
  );
}
