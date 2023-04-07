import dynamic from "next/dynamic";
import React from "react";
const DashboardMain = dynamic(() => import("../../components/dashboardMain"), {
  ssr: false,
});

export default DashboardMain;
