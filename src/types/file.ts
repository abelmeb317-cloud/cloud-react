import {
  Folder,
  FileText,
  Image as ImageIcon,
  FileArchive,
} from "lucide-react";

export const initialFiles = [
  {
    id: "demo-1",
    name: "Project Proposal.pdf",
    type: "PDF document",
    size: "2.4 MB",
    date: "Oct 14, 2026",
    color: "purple",
    icon: FileText,
    starred: true,
    trashed: false,
    demo: true,
  },
  {
    id: "demo-2",
    name: "Brand Assets",
    type: "Folder",
    size: "18 items",
    date: "Oct 13, 2026",
    color: "orange",
    icon: Folder,
    starred: false,
    trashed: false,
    demo: true,
  },
  {
    id: "demo-3",
    name: "Homepage Design.png",
    type: "PNG image",
    size: "4.8 MB",
    date: "Oct 12, 2026",
    color: "pink",
    icon: ImageIcon,
    starred: false,
    trashed: false,
    demo: true,
  },
  {
    id: "demo-4",
    name: "Product Backup.zip",
    type: "ZIP archive",
    size: "156 MB",
    date: "Oct 10, 2026",
    color: "blue",
    icon: FileArchive,
    starred: false,
    trashed: false,
    demo: true,
  },
];

export const navigation = [
  { label: "Overview", iconName: "layout-dashboard" },
  { label: "My Files", iconName: "files" },
  { label: "Recent", iconName: "clock-3" },
  { label: "Starred", iconName: "star" },
  { label: "Trash", iconName: "trash-2" },
];

export const pageTitles = {
  Overview: "Overview",
  "My Files": "My Files",
  Recent: "Recent Files",
  Starred: "Starred Files",
  Trash: "Trash",
  Settings: "Settings",
};
