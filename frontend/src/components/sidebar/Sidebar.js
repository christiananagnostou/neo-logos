import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Components
import RecentlyViewed from "./recentlyViewed/RecentlyViewed";
import TopWords from "./topWords/TopWords";

function Sidebar() {
  return (
    <SidebarContainer className="sidebar">
      <TopWords />
      <RecentlyViewed />
    </SidebarContainer>
  );
}

const SidebarContainer = styled(motion.div)`
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
`;
export default Sidebar;
