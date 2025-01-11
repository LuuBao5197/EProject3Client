import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from '@/views/admin/default';
import NFTMarketplace from '@/views/admin/marketplace';
import Profile from '@/views/admin/profile';
import DataTables from '@/views/admin/dataTables';
import RTL from '@/views/admin/rtl';

// Auth Imports
import SignInCentered from '@/views/auth/signIn';
import ContestList from './pages/StaffPages/ContestList';
import { all } from 'axios';
import ForgotPassword from './pages/PublicPages/ForgotPassword';
import NewHome from './pages/PublicPages/NewHome';
import AddContest from './pages/StaffPages/AddContest';
import EditContest from './pages/StaffPages/EditContest';
import ContestDetail from './pages/StaffPages/ContestDetail';
import AwardList from './pages/StaffPages/AwardFeature.jsx/AwardList';
import AddAwardForm from './pages/StaffPages/AwardFeature.jsx/AddAwardForm';
import EditAwardForm from './pages/StaffPages/AwardFeature.jsx/EditAwardForm';
import AwardDetails from './pages/StaffPages/AwardFeature.jsx/AwardDetails';
import ExhibitionIndex from './pages/StaffPages/ExhibitionFeature/ExhibitionIndex';
import AddExhibition from './pages/StaffPages/ExhibitionFeature/AddExhibition';
import EditExhibition from './pages/StaffPages/ExhibitionFeature/EditExhibition';


export const adminRoutes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
    index: true
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
    index: true
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
    index: true
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
    index: true
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
    index: true
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
    index: true
  },
];

export const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Forgot Password',
    layout: '/auth',
    path: '/forgot-password',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <ForgotPassword/>,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },

];
export const staffRoutes = [
  {
    name: 'Main Dashboard',
    layout: '/staff',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
    index: true
  },
  {
    name: 'Contest List',
    layout: '/staff',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/contests',
    component: <ContestList/>,
    index: true
  },
  {
    name: 'Create Contest',
    layout: '/staff',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/contests/add',
    component: <AddContest/>,
  },
  {
    name: 'Edit Contest',
    layout: '/staff',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/contests/edit/:id',
    component: <EditContest/>,
  },
  {
    name: 'Contest Detail',
    layout: '/staff',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/contests/:id',
    component: <ContestDetail/>,
  },
  {
    name: 'Profile',
    layout: '/staff',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'RTL Admin',
    layout: '/staff',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },
  {
    name: 'List Awards',
    layout: '/staff',
    path: '/award',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <AwardList />,
    index: true
  },
  {
    name: 'Create Award',
    layout: '/staff',
    path: '/award/add',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <AddAwardForm />,
  },
  {
    name: 'Update Award',
    layout: '/staff',
    path: '/award/edit/:id',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <EditAwardForm />,
  },
  {
    name: 'Detail Award',
    layout: '/staff',
    path: '/award/:id',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <AwardDetails />,
  },
  {
    name: 'List Exhibition',
    layout: '/staff',
    path: '/exhibition',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <ExhibitionIndex />,
    index: true
  },
  {
    name: 'Create Exhibition',
    layout: '/staff',
    path: '/exhibition/add',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <AddExhibition />,
  },
  {
    name: 'Update Exhibition',
    layout: '/staff',
    path: '/exhibition/edit/:id',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <EditExhibition/>,
  },
  
  
  
];

export const publicRoutes = [
    {
      name: 'Sign In',
      layout: '/auth',
      path: '/sign-in',
      icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
      component: <SignInCentered />,
    },
    {
      name: 'Main Home',
      layout: '/public',
      path: '/default',
      icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
      component: <NewHome />,
    },
  ];






