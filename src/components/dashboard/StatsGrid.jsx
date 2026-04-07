import Card from "../ui/Card";
import "../../styles/pages/dashboard.css";

function StatsGrid() {
  const stats = [
    {
      title: "Total Orders",
      value: "0",
      subtitle: "Compared to yesterday",
      variant: "primary",
    },
    {
      title: "Completed Orders",
      value: "0",
      variant: "success",
    },
    {
      title: "Pending Orders",
      value: "0",
      variant: "warning",
    },
    {
      title: "New Customers",
      value: "0",
      variant: "primary",
    },
    {
      title: "Today's Revenue",
      value: "0",
      variant: "success",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}

export default StatsGrid;
