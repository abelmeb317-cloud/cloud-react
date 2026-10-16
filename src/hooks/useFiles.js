import { useMemo, useState } from "react";
import { initialFiles } from "../types/file";
import { uploadFile, deleteStoredFile } from "../services/fileService";

export function useFiles() {
  const [files, setFiles] = useState(initialFiles);
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadFiles(event) {
    const selected = Array.from(event.target.files || []);
    event.target.value = "";

    if (!selected.length) return;

    setUploading(true);
    setNotice("Uploading files to Supabase...");

    try {
      const uploaded = [];

      for (const file of selected) {
        uploaded.push(await uploadFile(file));
      }

      setFiles((current) => [...uploaded, ...current]);
      setNotice(`${uploaded.length} file(s) uploaded successfully!`);
    } catch (error) {
      console.error("Upload failed:", error);
      setNotice(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  function toggleStar(id) {
    setFiles((current) =>
      current.map((file) =>
        file.id === id ? { ...file, starred: !file.starred } : file,
      ),
    );
  }

  function toggleTrash(id) {
    setFiles((current) =>
      current.map((file) =>
        file.id === id ? { ...file, trashed: !file.trashed } : file,
      ),
    );
  }

  async function deletePermanently(id) {
    const file = files.find((item) => item.id === id);
    if (!file) return;

    try {
      await deleteStoredFile(file);

      setFiles((current) => current.filter((item) => item.id !== id));

      setNotice("File deleted.");
    } catch (error) {
      console.error("Delete failed:", error);
      setNotice(`Delete failed: ${error.message}`);
    }
  }

  function clearNotice() {
    setNotice("");
  }

  return {
    files,
    setFiles,
    notice,
    setNotice,
    clearNotice,
    uploading,
    uploadFiles,
    toggleStar,
    toggleTrash,
    deletePermanently,
  };
}

export function useFilteredFiles(files, activePage, search) {
  return useMemo(() => {
    return files.filter((file) => {
      if (activePage === "Trash" && !file.trashed) return false;
      if (activePage !== "Trash" && file.trashed) return false;
      if (activePage === "Starred" && !file.starred) return false;

      return file.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [files, activePage, search]);
}
