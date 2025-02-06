import React, { useState } from "react";
import { BsList, BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import image from "../styles/assets/image/brand.svg";

const Sidebar = ({ routes }: any) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string, subPath: string) => {
    return location.pathname === path || location.pathname.includes(subPath);
  };

  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="logo-details">
        <div className="logo_name">
          <a href="/" className="image mb-5 mb-sm-10">
            <img src={image} alt="Nav Image1" />
          </a>
        </div>
        <BsList className="bx bx-menu" id="btn" onClick={toggleSidebar} />
      </div>
      {!isOpen && (
        <div className="iconSet">
          <ul>
            <li>
              <a href="#">
                <BsSearch />
              </a>
            </li>
            {routes?.map(
              (item: any, index: number) =>
                item.isShowInSidebar && (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={
                        isActive(item.path, item.subPath) ? "active" : ""
                      }
                    >
                      {item.icon}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {isOpen && (
        <ul className="nav-list">
          <li className="searchBar">
            <BsSearch />
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          {routes?.map(
            (item: any, index: number) =>
              item.isShowInSidebar && (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={
                      isActive(item.path, item.subPath) ? "active" : ""
                    }
                  >
                    {item.icon}
                    <span className="links_name">{item.title}</span>
                  </Link>
                  <span className="tooltip">{item.title}</span>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
