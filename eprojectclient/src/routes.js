import React from 'react';

import { Icon, layout } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdList,
  MdGifBox,
  MdCardGiftcard,
  MdFestival,
  MdOutlineFestival,
  MdInfoOutline,
  MdCreate,
  MdUpdate,
  MdLogin,
  MdViewCarousel,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from '@/views/admin/default';
import NFTMarketplace from '@/views/admin/marketplace';
import Profile from '@/views/admin/profile';
import DataTables from '@/views/admin/dataTables';
import RTL from '@/views/admin/rtl';

// Auth Imports
import SignInCentered from '@/views/auth/signIn';
import ContestList from './pages/StaffPages/ContestFeature/ContestList';
import { all } from 'axios';
import ForgotPassword from './pages/PublicPages/ForgotPassword';
import AddContest from './pages/StaffPages/ContestFeature/AddContest';
import EditContest from './pages/StaffPages/ContestFeature/EditContest';
import ContestDetail from './pages/StaffPages/ContestFeature/ContestDetail';
import AwardList from './pages/StaffPages/AwardFeature.jsx/AwardList';
import AddAwardForm from './pages/StaffPages/AwardFeature.jsx/AddAwardForm';
import EditAwardForm from './pages/StaffPages/AwardFeature.jsx/EditAwardForm';
import AwardDetails from './pages/StaffPages/AwardFeature.jsx/AwardDetails';
import ExhibitionIndex from './pages/StaffPages/ExhibitionFeature/ExhibitionIndex';
import AddExhibition from './pages/StaffPages/ExhibitionFeature/AddExhibition';
import EditExhibition from './pages/StaffPages/ExhibitionFeature/EditExhibition';

import ManagerLayout from './pages/ManagerPages/ManagerLayout';
import ClassesManagement from './pages/ManagerPages/CLassesManagement';
import StudentManagement from './pages/ManagerPages/StudentManagement';
import ExhibitionManagement from './pages/ManagerPages/ExhibitionManagement';
import CompetitionManagement from './pages/ManagerPages/CompetitionManagement';
import AwardManagement from './pages/ManagerPages/AwardManagement';
import ARMangement from './pages/ManagerPages/ARMangement';
import ExhibitionDetail from './pages/ManagerPages/ExhibitionDetail';
import StudentDetail from './pages/ManagerPages/StudentDetail';
import ListSubmission from './pages/StaffPages/SummisionFeature/ListSubmission';
import TeacherDetail from './pages/ManagerPages/TeacherDetail';
import SubmissionReviewDetail from './pages/ManagerPages/SubmissionsReviewDetail';



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
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/contests',
    component: <ContestList/>,
    index: true
  },
  {
    name: 'Create Contest',
    layout: '/staff',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
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
    icon: <Icon as={MdCardGiftcard} width="20px" height="20px" color="inherit" />,
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
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    component: <EditAwardForm />,
  },
  {
    name: 'Detail Award',
    layout: '/staff',
    path: '/award/:id',
    icon: <Icon as={MdInfoOutline} width="20px" height="20px" color="inherit" />,
    component: <AwardDetails />,
  },
  {
    name: 'List Exhibition',
    layout: '/staff',
    path: '/exhibition',
    icon: <Icon as={MdOutlineFestival} width="20px" height="20px" color="inherit" />,
    component: <ExhibitionIndex />,
    index: true
  },
  {
    name: 'Create Exhibition',
    layout: '/staff',
    path: '/exhibition/add',
    icon: <Icon as={MdCreate} width="20px" height="20px" color="inherit" />,
    component: <AddExhibition />,
  },
  {
    name: 'Update Exhibition',
    layout: '/staff',
    path: '/exhibition/edit/:id',
    icon: <Icon as={MdUpdate} width="20px" height="20px" color="inherit" />,
    component: <EditExhibition/>,
  },
  {
    name: 'View and review Submissions',
    layout: '/staff',
    path: '/submissions',
    icon: <Icon as={MdViewCarousel} width="20px" height="20px" color="inherit" />,
    component: <ListSubmission/>,
    index: true
    
  },
  
  
  
];
export const managerRoutes = [
  {
    name: 'Main Dashboard',
    layout: '/manager',
    path: '/default',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard/>,
    index: true
  },
  {
    name: 'Classes',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/classes',
    component: <ClassesManagement/>,
    index: true
  },
  {
    name: 'Student List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/students/:classId',
    component: <StudentManagement/>,
    index: false
  },
  {
    name: 'Exhibition List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/exhibitions',
    component: <ExhibitionManagement/>,
    index: true
  },
  {
    name: 'Competition List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/competitions',
    component: <CompetitionManagement/>,
    index: true
  },
  {
    name: 'Award List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/awards',
    component: <AwardManagement/>,
    index: true
  },
  {
    name: 'Exhibition Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/exhibitiondetail/:id',
    component: <ExhibitionDetail/>,
    index: false
  },
  {
    name: 'Student Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/studentdetail/:id',
    component: <StudentDetail/>,
    index: false
  },
  {
    name: 'Teacher Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/teacherdetail/:id',
    component: <TeacherDetail/>,
    index: false
  },
  {
    name: 'Submissions Review Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/submissionsreviewdetail/:id',
    component: <SubmissionReviewDetail/>,
    index: false
  }
  
  
];

export const publicRoutes = [
    {
      name: 'Sign In',
      layout: '/auth',
      path: '/sign-in',
      icon: <Icon as={MdLogin} width="20px" height="20px" color="inherit" />,
      component: <SignInCentered />,
    },
  ];






