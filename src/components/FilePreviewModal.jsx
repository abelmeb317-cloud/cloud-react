import { useEffect, useState } from "react";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function FilePreviewModal({ file, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [localPreview, setLocalPreview] = useState(null);
  const [textPreview, setTextPreview] = useState(null);

  const fileName = file?.name || file?.fileName || "Untitled file";
  const fileUrl =
    (localPreview?.file === file && localPreview.url) ||
    file?.url ||
    file?.previewUrl ||
    file?.downloadUrl;
  const extension = fileName.split(".").pop()?.toLowerCase();
  const isImage =
    file?.type?.startsWith("image/") ||
    ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg", "avif"].includes(
      extension,
    );
  const isPdf = file?.type?.includes("pdf") || extension === "pdf";
  const isText =
    file?.type?.startsWith("text/") ||
    [
      "csv",
      "html",
      "js",
      "jsx",
      "json",
      "md",
      "ts",
      "tsx",
      "txt",
      "xml",
      "yaml",
      "yml",
    ].includes(extension);

  useEffect(() => {
    if (!file) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [file, onClose]);

  useEffect(() => {
    setZoom(1);
  }, [file]);

  useEffect(() => {
    setLocalPreview(null);
    if (!file?.sourceFile) return;

    const url = URL.createObjectURL(file.sourceFile);
    setLocalPreview({ file, url });
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!file || !isText) {
      setTextPreview(null);
      return;
    }

    let active = true;
    setTextPreview({ file, status: "loading" });

    const readContent = file.sourceFile
      ? file.sourceFile.text()
      : fileUrl
        ? fetch(fileUrl).then((response) => {
            if (!response.ok) {
              throw new Error(`Could not load file (${response.status}).`);
            }
            return response.text();
          })
        : Promise.reject(new Error("This file does not have a preview URL."));

    readContent
      .then((content) => {
        if (active) setTextPreview({ file, status: "loaded", content });
      })
      .catch((error) => {
        if (active) {
          setTextPreview({
            file,
            status: "error",
            error:
              error instanceof Error
                ? error.message
                : "Could not read this file.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [file, fileUrl, isText]);

  const currentTextPreview =
    textPreview?.file === file ? textPreview : null;

  if (!file) return null;

  const changeZoom = (amount) => {
    setZoom((current) =>
      Math.min(3, Math.max(0.25, Number((current + amount).toFixed(2)))),
    );
  };

  return (
    <div
      className="file-preview-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="file-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Preview ${fileName}`}
      >
        <header className="preview-header">
          <div className="preview-file-info">
            <span className="preview-file-icon">
              <FileText size={21} />
            </span>

            <div className="preview-file-title">
              <h2 title={fileName}>{fileName}</h2>
              <p>
                {isPdf
                  ? "Currently viewing · PDF document"
                  : isImage
                    ? "Currently viewing · Image"
                    : isText
                      ? "Currently viewing · Text file"
                      : "Currently viewing · File"}
              </p>
            </div>
          </div>

          <div className="preview-actions">
            {isImage && (
              <>
                <button
                  type="button"
                  title="Zoom out"
                  aria-label="Zoom out"
                  onClick={() => changeZoom(-0.25)}
                >
                  <ZoomOut size={18} />
                </button>

                <span className="zoom-value">{Math.round(zoom * 100)}%</span>

                <button
                  type="button"
                  title="Zoom in"
                  aria-label="Zoom in"
                  onClick={() => changeZoom(0.25)}
                >
                  <ZoomIn size={18} />
                </button>

                <button
                  type="button"
                  title="Reset zoom"
                  aria-label="Reset zoom"
                  onClick={() => setZoom(1)}
                >
                  <RotateCcw size={17} />
                </button>
              </>
            )}

            {fileUrl && (
              <>
                <a
                  className="preview-action-link"
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open in new tab"
                  aria-label="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>

                <a
                  className="preview-action-link"
                  href={fileUrl}
                  download={fileName}
                  title="Download file"
                  aria-label="Download file"
                >
                  <Download size={18} />
                </a>
              </>
            )}

            <button
              type="button"
              className="preview-close"
              onClick={onClose}
              aria-label="Close preview"
              title="Close preview"
            >
              <X size={21} />
            </button>
          </div>
        </header>

        <main className="preview-content">
          {isText ? (
            <div className="text-viewer">
              {!currentTextPreview ||
              currentTextPreview.status === "loading" ? (
                <p role="status">Loading {fileName}...</p>
              ) : currentTextPreview.status === "error" ? (
                <div className="preview-message" role="alert">
                  <FileText size={42} />
                  <h3>Could not display this file</h3>
                  <p>{currentTextPreview.error}</p>
                </div>
              ) : (
                <pre>{currentTextPreview.content}</pre>
              )}
            </div>
          ) : file.sourceFile && !fileUrl ? (
            <div className="preview-message" role="status">
              <FileText size={42} />
              <h3>Preparing preview</h3>
              <p>Loading {fileName}...</p>
            </div>
          ) : !fileUrl ? (
            <div className="preview-message">
              <FileText size={42} />
              <h3>Preview unavailable</h3>
              <p>
                This file does not have a preview URL. Check that the file has
                been uploaded and its URL is available.
              </p>
            </div>
          ) : isPdf ? (
            <iframe
              className="pdf-viewer"
              src={`${fileUrl}#toolbar=1&navpanes=0`}
              title={`PDF preview: ${fileName}`}
            />
          ) : isImage ? (
            <div className="image-viewer">
              <img
                src={fileUrl}
                alt={fileName}
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
          ) : (
            <div className="preview-message">
              <FileText size={42} />
              <h3>Preview not supported</h3>
              <p>
                This file type cannot be displayed here. Download it or open it
                in a new tab if your browser supports it.
              </p>

              <div className="preview-fallback-actions">
                <a href={fileUrl} target="_blank" rel="noreferrer">
                  Open file
                </a>
                <a href={fileUrl} download={fileName}>
                  Download file
                </a>
              </div>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}
