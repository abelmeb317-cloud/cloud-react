import { supabase } from "../lib/supabase";
import { formatSize, getFileIcon } from "../utils/fileUtils";

const BUCKET = "cloudreact-files";

export async function uploadFile(file) {
  const safeName = file.name.replace(/[\\/]/g, "_");
  const storagePath = `${crypto.randomUUID()}-${safeName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file);

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: storagePath,
    name: file.name,
    type: file.type || "Unknown file",
    size: formatSize(file.size),
    date: new Date().toLocaleDateString(),
    color: "blue",
    icon: getFileIcon(file),
    starred: false,
    trashed: false,
    storagePath,
    demo: false,
  };
}

export async function deleteStoredFile(file) {
  if (file.demo || !file.storagePath) {
    return;
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([file.storagePath]);

  if (error) {
    throw new Error(error.message);
  }
}
