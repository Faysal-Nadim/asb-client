// Dashboard.jsx
import React, { useEffect } from "react";
import { bdtIcon, ordersIcon } from "../../assets/SvgIcons";
import { RecentOrdersTable } from "../../components/usermanager/recentorders";
import { SellerOverviewSection } from "../../components/usermanager/selleroverview";
import { StatsSection } from "../../components/usermanager/stats";

const demoOrders = [
  {
    id: "1",
    purchaseId: "TBE73HHFSD",
    customerName: "Judda Alex",
    avatarUrl: "https://i.pravatar.cc/40?img=12",
    productName: "MacBook Pro",
    amount: "$6,645",
    orderDate: "4 Mar, 2024",
    vendor: "Brazil",
    status: "Paid",
  },
  {
    id: "2",
    purchaseId: "TRW3743787",
    customerName: "Manik Mia",
    avatarUrl: "https://i.pravatar.cc/40?img=22",
    productName: "Smart Watch for Men's",
    amount: "$566",
    orderDate: "24 Mar, 2024",
    vendor: "Spain",
    status: "Unpaid",
  },
  {
    id: "3",
    purchaseId: "YRB337737R",
    customerName: "Chanchal Hossain",
    avatarUrl: "https://i.pravatar.cc/40?img=35",
    productName: "Apple Headphone",
    amount: "$2,458",
    orderDate: "12 Mar, 2024",
    vendor: "Argentina",
    status: "Pending",
  },
  {
    id: "4",
    purchaseId: "FUSF763465",
    customerName: "Sabbir Hasan",
    avatarUrl: "https://i.pravatar.cc/40?img=18",
    productName: "Bike Helmet",
    amount: "$1,425",
    orderDate: "14 Mar, 2024",
    vendor: "Germany",
    status: "Unpaid",
  },
  {
    id: "5",
    purchaseId: "RGTER433554",
    customerName: "Hasiba Khatun",
    avatarUrl: "https://i.pravatar.cc/40?img=48",
    productName: "Benweed Chire",
    amount: "$899",
    orderDate: "26 Mar, 2024",
    vendor: "Uruguay",
    status: "Paid",
  },
];

export const Dashboard = () => {
  useEffect(() => {
    document.title =
      "User Dashboard - Ali Store BD | International Shopping Solution";
  }, []);

  const stats = [
    {
      label: "Total Revenue",
      value: "$15,278",
      subLabel: "Revenue increases this month",
      badge: "+3.15%",
      badgeColor: "bg-emerald-100 text-emerald-600",
      iconBg: "bg-orange-100",
      iconText: bdtIcon,
    },
    {
      label: "Total Orders",
      value: "20,309",
      subLabel: "9.75% increase in order last week",
      badge: "+9.75%",
      badgeColor: "bg-emerald-100 text-emerald-600",
      iconBg: "bg-sky-100",
      iconText: ordersIcon,
    },
  ];

  return (
    <div className="max-w-[1380px] mx-auto lg:py-4 sm:pb-4 space-y-4">
      {/* Top stats cards */}

      <StatsSection stats={stats} />

      <RecentOrdersTable
        orders={demoOrders}
        sortLabel="Today"
        onSortClick={() => {
          // open sort menu or cycle sort mode
        }}
      />

      <SellerOverviewSection />
    </div>
  );
};
