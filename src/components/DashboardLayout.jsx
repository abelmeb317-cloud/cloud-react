import { useState } from "react";
import {
  LayoutDashboard,
  Files,
  Clock3,
  Star,
  Trash2,
  Settings,
  Search,
  Bell,
  MoreHorizontal,
  Cloud,
  Menu,
  X,
  HardDrive,
} from "lucide-react";
import { navigation, pageTitles } from "../types/file";
import "./style/DashboardLayout.scss";
const icons = {
  "layout-dashboard": LayoutDashboard,
  files: Files,
  "clock-3": Clock3,
  star: Star,
  "trash-2": Trash2,
};

export default function DashboardLayout({
  activePage,
  onNavigate,
  search,
  onSearchChange,
  notice,
  onDismissNotice,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function navigate(page) {
    onNavigate(page);
    setSidebarOpen(false);
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Cloud size={23} />
          </div>

          <span>
            Cloud<span className="brand-light">React</span>
          </span>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <button className="workspace-switcher">
          <div className="workspace-avatar">C</div>
          <span>
            <strong>My Workspace</strong>
            <small>Free plan</small>
          </span>
          <MoreHorizontal size={19} />
        </button>

        <nav className="main-nav">
          {navigation.map(({ label, iconName }) => {
            const Icon = icons[iconName];

            return (
              <button
                key={label}
                className={`nav-item ${activePage === label ? "active" : ""}`}
                onClick={() => navigate(label)}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="workspace-label">PREFERENCES</div>

          <button
            className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
            onClick={() => navigate("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="storage-card">
            <div className="storage-card-top">
              <div className="storage-icon">
                <HardDrive size={18} />
              </div>
              <span>Storage</span>
              <strong>68%</strong>
            </div>

            <div className="storage-track">
              <div className="storage-fill" />
            </div>

            <p>6.8 GB of 10 GB used</p>

            <button onClick={() => navigate("Settings")}>
              Upgrade plan <span>→</span>
            </button>
          </div>

          <div className="profile">
            <div className="profile-avatar">JD</div>
            <div className="profile-info">
              <strong>John Doe</strong>
              <small>john@example.com</small>
            </div>
            <MoreHorizontal size={20} />
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <main className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="crumb-separator">/</span>
            <strong>{pageTitles[activePage]}</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search files..."
                aria-label="Search files"
              />
              <kbd>⌘ K</kbd>
            </label>

            <button
              className="notification-button"
              aria-label="Notifications"
              onClick={() => window.alert("You are all caught up!")}
            >
              <Bell size={19} />
              <i />
            </button>

            <div className="topbar-avatar">JD</div>
          </div>
        </header>

        <div className="page-content">
          {notice && (
            <div className="notice" role="status">
              <span>{notice}</span>
              <button onClick={onDismissNotice}>Dismiss</button>
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}
