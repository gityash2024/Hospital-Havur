import React, { useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { RouteType, navConfig } from "./navConfig";
import Layout from "../components/Layout";

// interface Props {
//     navConfig: NavConfigType;
// }

const unAuthRoute = ["/login", "/signup"];

const CustomRoutes: React.FC = () => {
  const isLogin: string | null = localStorage.getItem("isLogin");
  const token: string | null = localStorage.getItem("token");

  const switchLoginRoutes = useCallback(() => {
    if (token && isLogin && unAuthRoute.includes(window.location.pathname)) {
      return <Navigate to="/hospital-dashboard" />;
    }
  }, [isLogin, token]);

  const switchPrivateRoutes = useCallback(
    (routes: RouteType[]) => {
      if (isLogin && token) {
        return (
          <Layout>
            <Routes>
              {routes?.map((route, key) => (
                <Route key={key} path={route.path} element={route.component} />
              ))}
            </Routes>
          </Layout>
        );
      } else if (!isLogin && !token) {
        return <Navigate to="/login" />;
      }
    },
    [navConfig, isLogin]
  );
  const switchRoutes = useCallback(
    (routes: RouteType[]) => {
      return routes?.map((route, key) => (
        <Route key={key} path={route.path} element={route.component} />
      ));
    },
    [navConfig, isLogin]
  );

  return (
    <Router>
      <Routes>{switchRoutes(navConfig["common"])}</Routes>
      {switchPrivateRoutes(navConfig["hospital_admin"])}
      {switchLoginRoutes()}
    </Router>
  );
};

export default CustomRoutes;
