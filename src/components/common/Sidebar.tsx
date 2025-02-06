import React, { useState } from "react";
import { BsList, BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import brand from "../../styles/assets/image/brand.svg";

export function Sidebar({ routes }: any) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string, subPath: string) => {
    return location.pathname === path || location.pathname.includes(subPath);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 600) {
      setIsOpen(false);
    }
  };

  // Filter routes based on search term
  const filteredRoutes = routes.filter(
    (item: any) =>
      item.isShowInSidebar &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="logo-details">
        <div className="logo_name">
          <a href="#" className="image mb-5 mb-sm-10">
            <img src={brand} alt="Nav Image1" />
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
            {filteredRoutes.map((item: any, index: number) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={isActive(item.path, item.subPath) ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpen && (
        <ul className="nav-list">
          <li className="searchBar">
            <BsSearch />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="tooltip">Search</span>
          </li>
          {filteredRoutes.map((item: any, index: number) => (
            <li key={index}>
              <Link
                to={item.path}
                className={isActive(item.path, item.subPath) ? "active" : ""}
                onClick={handleLinkClick}
              >
                {item.icon}
                <span className="links_name">{item.title}</span>
              </Link>
              <span className="tooltip">{item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
