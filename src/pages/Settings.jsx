export default function Settings() {
  return (
    <section className="panel settings-panel">
      <h2>Workspace settings</h2>
      <p>CloudReact workspace preferences</p>

      <div className="setting-row">
        <span>
          <strong>Workspace name</strong>
          <small>Shown to workspace members</small>
        </span>
        <strong>My Workspace</strong>
      </div>

      <div className="setting-row">
        <span>
          <strong>Storage plan</strong>
          <small>Your current storage allowance</small>
        </span>
        <strong>Free · 10 GB</strong>
      </div>

      <div className="setting-row">
        <span>
          <strong>Account</strong>
          <small>Signed-in profile</small>
        </span>
        <strong>john@example.com</strong>
      </div>
    </section>
  );
}
