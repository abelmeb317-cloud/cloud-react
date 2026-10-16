import { Plus } from "lucide-react";

export default function UploadButton({ uploading, onUpload }) {
  return (
    <>
      <button
        className="primary-button"
        disabled={uploading}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Plus size={18} />
        {uploading ? "Uploading..." : "Upload files"}
      </button>

      <input id="file-upload" type="file" multiple hidden onChange={onUpload} />
    </>
  );
}
