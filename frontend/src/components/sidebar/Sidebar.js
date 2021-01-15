import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Components
import RecentlyViewed from "../recentlyViewed/RecentlyViewed";
import TopWords from "../topWords/TopWords";

function Sidebar() {
  return (
    <SidebarContainer className="sidebar">
      <TopWords />
      <RecentlyViewed />
    </SidebarContainer>
  );
}

const SidebarContainer = styled(motion.div)`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgb(36, 36, 35);
`;
export default Sidebar;
