import {
  FaTasks,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

function DashboardCards({ tasks }) {
  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      icon: <FaTasks />,
      color: "#2563eb",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color: "#f59e0b",
    },
    {
      title: "In Progress",
      value: progress,
      icon: <FaSpinner />,
      color: "#3b82f6",
    },
    {
      title: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
      color: "#16a34a",
    },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <div className="stat-card" key={card.title}>
          <div
            className="stat-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>
            <h2>{card.value}</h2>
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default DashboardCards;