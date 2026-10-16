import { Folder, Star, Clock3 } from "lucide-react";

export default function QuickAccess({ totalFiles, starredCount, onNavigate }) {
  const items = [
    {
      title: "My Files",
      count: totalFiles,
      icon: Folder,
      color: "purple",
    },
    {
      title: "Starred",
      count: starredCount,
      icon: Star,
      color: "yellow",
    },
    {
      title: "Recent",
      count: totalFiles,
      icon: Clock3,
      color: "blue",
    },
  ];

  return (
    <section className="quick-section">
      <div className="section-heading">
        <div>
          <h2>Quick access</h2>
          <p>Jump back into your work</p>
        </div>
      </div>

      <div className="quick-grid">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className="quick-card"
              key={item.title}
              onClick={() => onNavigate(item.title)}
            >
              <div className={`quick-icon quick-${item.color}`}>
                <Icon size={22} />
              </div>

              <div>
                <strong>{item.title}</strong>
                <span>{item.count} items</span>
              </div>

              <span className="quick-arrow">↗</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
