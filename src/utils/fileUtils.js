import { FileText, Image as ImageIcon, FileArchive } from "lucide-react";

export function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;

  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

export function getFileIcon(file) {
  if (
    file.type?.startsWith("image/") ||
    /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name)
  ) {
    return ImageIcon;
  }

  if (/\.(zip|rar|7z|tar|gz)$/i.test(file.name)) {
    return FileArchive;
  }

  return FileText;
}
