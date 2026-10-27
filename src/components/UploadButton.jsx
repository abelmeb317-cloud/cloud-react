// import { Plus } from "lucide-react";

// export default function UploadButton({ uploading, onUpload }) {
//   return (
//     <>
//       <button
//         className="primary-button"
//         disabled={uploading}
//         onClick={() => document.getElementById("file-upload")?.click()}
//       >
//         <Plus size={18} />
//         {uploading ? "Uploading..." : "Upload files"}
//       </button>

//       <input id="file-upload" type="file" multiple hidden onChange={onUpload} />
//     </>
//   );
// }

import { Plus, X, AlertCircle } from "lucide-react";
import { useState } from "react";
 import "./style/UploadButton.scss";

export default function UploadButton({ uploading, onUpload, onFileUploaded }) {
  const [error, setError] = useState("");

  const handleChange = async (event) => {
    setError("");

    try {
      const uploaded = await onUpload(event);
      if (uploaded?.length) {
        onFileUploaded(uploaded[uploaded.length - 1]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload files.");
    }
  };

  return (
    <div className="flex w-fit max-w-full flex-col gap-3">
      <button
        type="button"
        className="primary-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        disabled={uploading}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Plus size={18} />
        {uploading ? "Uploading..." : "Upload files"}
      </button>

      <input
        id="file-upload"
        type="file"
        multiple
        hidden
        onChange={handleChange}
      />

      {error && (
        <div className="upload-error" role="alert">
          <AlertCircle size={20} className="shrink-0" />

          <span className="flex-1">{error}</span>

          <button
            type="button"
            className="upload-error-dismiss"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
