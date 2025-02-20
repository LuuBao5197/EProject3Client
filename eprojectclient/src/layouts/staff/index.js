// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from '@/components/footer/FooterAdmin.js';
// Layout components
import Navbar from '@/components/navbar/NavbarStaff.js';
import Sidebar from '@/components/sidebar/Sidebar.js';
import { SidebarContext } from '@/contexts/SidebarContext';
import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// import routes from '@/routes.js';
import { staffRoutes } from '../../routes';

import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { token } from 'stylis';
// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/staff/full-screen-maps';
  };
  const location = useLocation();
  const getActiveRoute = (routes) => {
    // console.log(routes);
    let activeRoute = '';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          // console.log(routes[i].name)
          return routes[i].name;
        }
      }
    }
    // console.log(activeRoute);
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          // window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
          location.pathname === routes[i].layout + routes[i].path
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          // window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
          location.pathname === routes[i].layout + routes[i].path
        ) {
          console.log(routes[i].index)
          return routes[i].name;
        }
      }
    }
    console.log(activeNavbar)
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/staff') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  document.documentElement.dir = 'ltr';
  const navigate = useNavigate();
  //Check is login 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      toast.warning("Please login with a valid role to view this page");
      navigate('/');
      return
    }
    console.log("token", token);
    const userInfo = jwtDecode(token);
    if(userInfo.role !== "Staff"){
      toast.warning("Please login with a valid role to view this page");
      navigate('/');
      return
    }
  }, [useLocation])

  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={staffRoutes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal >
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={'Horizon UI Dashboard PRO'}
                  brandText={getActiveRoute(staffRoutes)}
                  secondary={getActiveNavbar(staffRoutes)}
                  message={getActiveNavbarText(staffRoutes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            {getRoute() ? (
              <Box
                marginTop="120"
                mx="auto"
                p={{ base: '20px', md: '30px' }}
                pe="20px"
                minH="100vh"
                pt="50px"
              >
                <Routes>
                  {getRoutes(staffRoutes)}
                  <Route
                    path="/"
                    element={<Navigate to="/staff/default" replace />}
                  />
                </Routes>
              </Box>
            ) : null}
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
}
