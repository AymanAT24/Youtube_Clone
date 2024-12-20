import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

const Home = ({ sidebarIsOpen }) => {
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar
        sidebarIsOpen={sidebarIsOpen}
        category={category}
        setCategory={setCategory}
      />
      <div className={`container ${sidebarIsOpen ? "" : "large-container"}`}>
        <Feed category={category} />
      </div>
    </>
  );
};

export default Home;
