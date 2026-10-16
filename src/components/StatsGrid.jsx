import { Files, HardDrive, Star, Trash2 } from "lucide-react";

export default function StatsGrid({ totalFiles, starredCount, trashCount }) {
  const stats = [
    {
      label: "Total files",
      value: totalFiles,
      foot: "Files in your workspace",
      icon: Files,
      color: "purple",
    },
    {
      label: "Storage used",
      value: "6.8",
      unit: "GB",
      foot: "68% of 10 GB",
      icon: HardDrive,
      color: "blue",
    },
    {
      label: "Starred files",
      value: starredCount,
      foot: "Your important files",
      icon: Star,
      color: "green",
    },
    {
      label: "In Trash",
      value: trashCount,
      foot: "Deleted items",
      icon: Trash2,
      color: "orange",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="stat-card" key={stat.label}>
            <div className="stat-top">
              <span>{stat.label}</span>
              <div className={`stat-icon stat-${stat.color}`}>
                <Icon size={19} />
              </div>
            </div>

            <div className="stat-value">
              {stat.value}
              {stat.unit && <small> {stat.unit}</small>}
            </div>

            {stat.label === "Storage used" && (
              <div className="mini-progress">
                <div />
              </div>
            )}

            <div className="stat-foot">
              <span>{stat.foot}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
