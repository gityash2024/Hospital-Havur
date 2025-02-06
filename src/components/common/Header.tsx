import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBell, FaSignOutAlt, FaCalendarCheck, FaTimes } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postApi } from "../services/api";
import EditProfile from "../common/modal/EditProfile";

const colors = {
  white: '#FAF5EB',
  background: '#FAF5EB',
  text: '#212529',
  textGray: '#8C8A84',
  green: '#62B162',
  lightGreen: '#E6F4EA',
};

const NavWrapper = styled.nav`
  background-color: ${colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const PageLinks = styled.div<{ $isOpen: boolean }>`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${props => props.$isOpen ? '0' : '-100%'};
    width: 250px;
    height: 100%;
    background-color: ${colors.white};
    z-index: 1000;
    transition: left 0.3s ease;
    padding: 20px;
  }

  ul {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    li a {
      text-decoration: none;
      color: ${colors.textGray};
      font-weight: 500;
      transition: color 0.3s ease;

      &.active, &:hover {
        color: ${colors.green};
        border-bottom: 2px solid ${colors.green};
      }
    }
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #FF4D4D;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
`;

const NotificationIcon = styled(FaBell)`
  color: ${colors.textGray};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.green};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  color: ${colors.textGray};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownToggle = styled(Dropdown.Toggle)`
  background: transparent !important;
  border: none !important;
  color: ${colors.text} !important;
  display: flex;
  align-items: center;
  gap: 5px;

  &::after {
    display: none;
  }
`;

const DropdownMenu = styled(Dropdown.Menu)`
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 1px solid #f7d38a;
  min-width: 250px;
`;

const ProfileSection = styled.div`
  text-align: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    color: ${colors.text};
    margin-bottom: 5px;
  }

  h4 {
    color: ${colors.textGray};
    font-size: 0.9rem;
  }
`;

const DropdownLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 15px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${colors.background};
    }

    button {
      background: none;
      border: none;
      color: ${colors.text};
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      text-align: left;
    }
  }
`;

const ToggleIcon = styled(FaBarsProgress)`
  display: none;
  color: ${colors.textGray};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

interface HeaderProps {
  linkTexts?: { title: string; path: string }[];
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ linkTexts = [], children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>({});
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location: any = useLocation();

  useEffect(() => {
    const getProfileData = async () => {
      let response = await postApi("hospital/profile/view", {});

      if (response.status === 200) {
        setProfileData(response.data.data.hospital);
      }
    };

    getProfileData();
  }, []);

  const onClickLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <NavWrapper>
        <PageLinks $isOpen={isSidebarOpen}>
          <CloseButton onClick={toggleSidebar}>
            <FaTimes />
          </CloseButton>
          <ul>
            {linkTexts.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={
                    item?.path === location.pathname + location?.search
                      ? "active"
                      : ""
                  }
                >
                  {item?.title}
                </Link>
              </li>
            ))}
          </ul>
        </PageLinks>
        <NavbarRight>
          <Dropdown className="notification">
            <DropdownToggle variant="light" id="notification">
              <NotificationIcon />
              <NotificationBadge>18</NotificationBadge>
            </DropdownToggle>

            <DropdownMenu>
              <div className="text-start border-bottom py-2 px-3">
                <h5>Notifications</h5>
              </div>
              <div className="px-3 mt-3 inner-scroll">
                {[...Array(4)].map((_, i) => (
                  <div
                    className="d-flex position-relative mb-4 notification"
                    key={i}
                  >
                    <div className="me-3 text-primary fs-5 icon-label">
                      <FaCalendarCheck />
                    </div>
                    <div>
                      <a href="" className="text-decoration-none">
                        <h5 className="text-gray-900 fs-6 mb-2">
                          2345Ap 656Api appointment has been booked.
                        </h5>
                      </a>
                      <h6 className="text-gray-600 fs-small fw-light mb-0">
                        2 hours
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center border-top p-2 mark-read">
                <h6>
                  <a
                    href=""
                    className="text-primary mb-0 fs-5 read-all-notification text-decoration-none"
                    id="readAllNotification"
                  >
                    Mark All As Read
                  </a>
                </h6>
              </div>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownToggle
              variant="light"
              id="dropdown-user"
              className="user_dropdown"
            >
              {profileData.name}
            </DropdownToggle>

            <DropdownMenu>
              <ProfileSection>
                <h3>{profileData.name}</h3>
                <h4>{profileData?.emailAddress}</h4>
              </ProfileSection>
              <DropdownLinks>
                <li>
                  <EditProfile profileData={profileData} />
                </li>
                <li>
                  <button type="button" onClick={() => onClickLogout()}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </DropdownLinks>
            </DropdownMenu>
          </Dropdown>
          <ToggleIcon onClick={toggleSidebar} />
        </NavbarRight>
      </NavWrapper>
      {children}
    </>
  );
};

export default Header;