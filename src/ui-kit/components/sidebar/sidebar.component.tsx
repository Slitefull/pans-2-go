import React, { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { injector } from "@/common/injector/Injector";
import { SIDEBAR_SERVICE } from "@/common/injector/constants";
import { SidebarService } from "@/common/sidebar/domain/sidebar.service";

import "./sidebar.styles.scss";


interface SidebarProps {
  options: Array<Option>;
}

interface Option {
  name: string;
  label: string;
  link: string;
  icon: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ options }): JSX.Element => {
  const sidebarService: SidebarService = injector.get(SIDEBAR_SERVICE);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`sidebar ${isHovered ? "open" : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sidebar-header">
        {isHovered ? "Wheels2Go" : "W2G"}
      </div>
      <div className="sidebar-body">
        {options.map((el) => (
          <Link
            key={el.name}
            to={el.link}
            className="sidebar-item"
            onClick={() => (sidebarService.selectedItem = el.name)}
          >
            <div className={`icon-wrapper ${sidebarService.selectedItem === el.name ? "active" : ""}`}>
              {el.icon}
            </div>
            {isHovered && (
              <p className={`sidebar-item__text ${sidebarService.selectedItem === el.name ? "active" : ""}`}>
                {el.label}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
