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
  MdSelectAll,
  MdOutput,
  MdViewList,
  MdEdit,
  MdPublish,
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
import Total from './pages/ManagerPages/Total';
import MeetingScheduler from './pages/ManagerPages/CreateMeeting';
import Requests from './pages/ManagerPages/Requests';
import CreateMeeting from './pages/ManagerPages/CreateMeeting';
import ContestJudgeSelector from './pages/StaffPages/ContestJudge/ContestJudgeSelector';
import ContestJudgesList from './pages/StaffPages/ContestJudge/ContestJudgeList';
import EditContestJudges from './pages/StaffPages/ContestJudge/EditContestJudges';

import ContestResults from './pages/StaffPages/ContestFeature/ContestResults';
import StudentAwards from './pages/StaffPages/StudentAward/StudentAward';
import ArtworkIndex from './pages/StaffPages/ArtWork/ArtWorkIndex';
import RequestsExhibition from './pages/ManagerPages/RequestsExhibition';
import RequestsAward from './pages/ManagerPages/RequestsAward';
import RequestsExhibitionArtwork from './pages/ManagerPages/RequestsExhibitionArtwork';
import AdminStaffStatus from './pages/ManagerPages/UpdateStatusStaff';
import InactiveStaffLayout from './pages/ManagerPages/InactiveStaffLayout';

import EditExhibitionArtwork from './pages/StaffPages/ExhibitionArtWork/EditExhibitionArtWork';
import CreateExhibitionArtwork from './pages/StaffPages/ExhibitionArtWork/CreateExhibitionArtWork';
import ExhibitionArtworks from './pages/StaffPages/ExhibitionArtWork/ExhibitionArtWorks';


import Adminlayout from './pages/AdminPages/Adminlayout';
import AdminStudentList from './pages/AdminStudentPages/AdminStudentList';
import AdminStaffLayout from './pages/AdminStaffPages/AdminStaffLayout';
import AdminClassAdd from './pages/AdminPages/AdminClassAdd';
import AdminStaffAdd from './pages/AdminStaffPages/AdminStaffAdd';
import AdminStudentAdd from './pages/AdminStudentPages/AdminStudentAdd';
import AdminStudentImportForm from './pages/AdminStudentPages/AdminStudentImportForm';
import AdminClassDetail from './pages/AdminPages/AdminClassDetail';
import AdminStudentDetail from './pages/AdminStudentPages/AdminStudentDetail';
import AdminStudentUpdate from './pages/AdminStudentPages/AdminStudentUpdate';
import AdminStaffDetail from './pages/AdminStaffPages/AdminStaffDetail';
import AdminStaffUpdate from './pages/AdminStaffPages/AdminStaffUpdate';
import RequestsContest from './pages/ManagerPages/RequestsContest';
import Approved from './pages/ManagerPages/Approved';
import Rejected from './pages/ManagerPages/Rejected';
import NotificationMenu from './pages/ManagerPages/NotificationMenu';
import RequestsStudentAward from './pages/ManagerPages/RequestsStudentAward';
import EditProfile from './pages/PublicPages/EditProfile';
import RequestsContestJudge from './pages/ManagerPages/RequestsContestJudge';
import PublishedFunction from './pages/StaffPages/PublishFunction/PublishedFunction';



export const adminRoutes = [
  {
    name: 'Admin',
    layout: '/admin',
    path: '/class',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Adminlayout />,
    index: true
  },
  {
    name: 'Student List',
    layout: '/admin',
    path: '/StudentList',
    icon: (
      <Icon
        as={MdList}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AdminStudentList />,
    index: true
  },
  {
    name: 'Staff List ',
    layout: '/admin',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/StaffList',
    component: <AdminStaffLayout />,
    index: true
  },
  {
    name: 'Create Class',
    layout: '/admin',
    path: '/Create-Class',
    icon: <Icon as={MdCreate} width="20px" height="20px" color="inherit" />,
    component: <AdminClassAdd />,
    index: true
  },
  {
    name: 'Create Staff',
    layout: '/admin',
    path: '/Create-Staff',
    icon: <Icon as={MdCreate} width="20px" height="20px" color="inherit" />,
    component: <AdminStaffAdd />,
    index: true
  },
  {
    name: 'Create Student',
    layout: '/admin',
    path: '/Create-Student',
    icon: <Icon as={MdCreate} width="20px" height="20px" color="inherit" />,
    component: <AdminStudentAdd />,
    index: true
  },
  {
    name: 'Import Student',
    layout: '/admin',
    path: '/Import-Student',
    icon: <Icon as={MdCreate} width="20px" height="20px" color="inherit" />,
    component: <AdminStudentImportForm />,
    index: true
  },
  {
    name: 'Class Detail',
    layout: '/admin',
    path: '/Class-Detail/:id',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <AdminClassDetail />,


  },
  {
    name: 'Student Detail',
    layout: '/admin',
    path: '/Student-Detail/:id',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <AdminStudentDetail />,

  }, {
    name: 'Update Student ',
    layout: '/admin',
    path: '/Update-Student/:id',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <AdminStudentUpdate />,

  },
  {
    name: 'Staff Detail',
    layout: '/admin',
    path: '/Staff-Detail/:id',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <AdminStaffDetail />,


  },
  {
    name: 'Update Staff',
    layout: '/admin',
    path: '/Update-Staff/:id',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <AdminStaffUpdate />,

  },
  


  {
    name: 'Edit Profile',
    layout: '/admin',
    path: '/EditProfile',
    icon: <Icon as={MdEdit} width="20px" height="20px" color="inherit" />,
    component: <EditProfile />,
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
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },

];
export const staffRoutes = [
  // {
  //   name: 'Main Dashboard',
  //   layout: '/staff',
  //   path: '/default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <MainDashboard />,
  //   index: true
  // },
  {
    name: 'Contest List',
    layout: '/staff',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/contests',
    component: <ContestList />,
    index: true
  },
  {
    name: 'Create Contest',
    layout: '/staff',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/contests/add',
    component: <AddContest />,
  },
  {
    name: 'Edit Contest',
    layout: '/staff',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/contests/edit/:id',
    component: <EditContest />,
  },
  {
    name: 'Contest Detail',
    layout: '/staff',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/contests/:id',
    component: <ContestDetail />,
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
    component: <EditExhibition />,
  },
  {
    name: 'View and review Submissions',
    layout: '/staff',
    path: '/submissions',
    icon: <Icon as={MdViewCarousel} width="20px" height="20px" color="inherit" />,
    component: <ListSubmission />,
    index: true
  },
  {
    name: 'Select Judge for Contest',
    layout: '/staff',
    path: '/contestjudge/:contestID',
    icon: <Icon as={MdSelectAll} width="20px" height="20px" color="inherit" />,
    component: <ContestJudgeSelector />,
    index: false
  },
  {
    name: 'List Judge Contest',
    layout: '/staff',
    path: '/contestjudge',
    icon: <Icon as={MdSelectAll} width="20px" height="20px" color="inherit" />,
    component: <ContestJudgesList />,
    index: true
  },
  {
    name: 'Edit JudgeJudge',
    layout: '/staff',
    path: '/contestjudge/edit/:contestID',
    icon: <Icon as={MdSelectAll} width="20px" height="20px" color="inherit" />,
    component: <EditContestJudges />,
  },
  {
    name: 'Contest Results',
    layout: '/staff',
    path: '/ContestResult',
    icon: <Icon as={MdOutput} width="20px" height="20px" color="inherit" />,
    component: <ContestResults />,
    index: true
  },
  {
    name: 'List Student Receive Award',
    layout: '/staff',
    path: '/StudentAward',
    icon: <Icon as={MdViewList} width="20px" height="20px" color="inherit" />,
    component: <StudentAwards />,
    index: true
  },
  {
    name: 'List Exhibition ArtWork',
    layout: '/staff',
    path: '/Artwork/',
    icon: <Icon as={MdViewList} width="20px" height="20px" color="inherit" />,

    component: <ArtworkIndex />,
    index: true
  },
  {
    name: 'Create Exhibition ArtWork',
    layout: '/staff',
    path: '/ExhibitionArtWork/Create',
    icon: <Icon as={MdViewList} width="20px" height="20px" color="inherit" />,
    component: <CreateExhibitionArtwork />,
  },
  {
    name: 'Edit Exhibition ArtWork',
    layout: '/staff',
    path: '/ExhibitionArtWork/Edit/:ExhibitionArtWorkID',
    icon: <Icon as={MdViewList} width="20px" height="20px" color="inherit" />,
    component: <EditExhibitionArtwork />,
  },
  {
    name: 'Exhibition ArtWorks',
    layout: '/staff',
    path: '/ExhibitionArtWork',
    icon: <Icon as={MdViewList} width="20px" height="20px" color="inherit" />,
    component: <ExhibitionArtworks />,
    index: true
  },
  {
    name: 'Edit Profile',
    layout: '/staff',
    path: '/EditProfile',
    icon: <Icon as={MdEdit} width="20px" height="20px" color="inherit" />,
    component: <EditProfile />,
  },
  {
    name: 'Published Function ',
    layout: '/staff',
    path: '/published',
    icon: <Icon as={MdPublish} width="20px" height="20px" color="inherit" />,
    component: <PublishedFunction />,
    index: true
  },
];
export const managerRoutes = [
  {
    name: 'Main Dashboard',
    layout: '/manager',
    path: '/default',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
    index: true
  },
  {
    name: 'Classes',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/classes',
    component: <ClassesManagement />,
    index: true
  },
  {
    name: 'Student List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/students/:classId',
    component: <StudentManagement />,
    index: false
  },
  {
    name: 'Exhibition List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/exhibitions',
    component: <ExhibitionManagement />,
    index: true
  },
  {
    name: 'Competition List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/competitions',
    component: <CompetitionManagement />,
    index: true
  },
  {
    name: 'Award List',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/awards',
    component: <AwardManagement />,
    index: true
  },
  {
    name: 'Exhibition Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/exhibitiondetail/:id',
    component: <ExhibitionDetail />,
    index: false
  },
  {
    name: 'Student Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/studentdetail/:id',
    component: <StudentDetail />,
    index: false
  },
  {
    name: 'Teacher Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/teacherdetail/:id',
    component: <TeacherDetail />,
    index: false
  },
  {
    name: 'Submissions Review Detail',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/submissionsreviewdetail/:id',
    component: <SubmissionReviewDetail />,
    index: false
  },
  {
    name: 'Total',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/total',
    component: <Total />,
    index: false
  },
  {
    name: 'Create Meeting',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/meeting',
    component: <CreateMeeting />,
    index: false
  },
  {
    name: 'Requests',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/requests',
    component: <Requests />,
    index: true
  },
  {
    name: 'Requests Exhibition',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/requestsexhibition/:id',
    component: <RequestsExhibition />,
    index: false
  },
  {
    name: 'Requests Award',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/requestsaward/:id',
    component: <RequestsAward />,
    index: false
  },
  {
    name: 'Requests Student Award',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/requestsstudentaward/:studentId/:awardId',
    component: <RequestsStudentAward />,
    index: false
  },
  {
    name: 'Requests Contest',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/requestscontest/:id',
    component: <RequestsContest />,
    index: false
  },
  {
    name: 'Approved Request Management',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/approved',
    component: <Approved />,
    index: false
  },
  {
    name: 'Rejected Request Management',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/rejected',
    component: <Rejected />,
    index: false
  },
  {
    name: 'Request Exhibition Artwork',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/requestsexhibitionartwork/:exhibitionId/:artworkId',
    component: <RequestsExhibitionArtwork />,
    index: false
  },
  {
    name: 'Request Contest Judge',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/requestscontestjudge/:staffId/:contestId',
    component: <RequestsContestJudge />,
    index: false
  },

  {
    name: 'Edit Profile',
    layout: '/manager',
    path: '/EditProfile',
    icon: <Icon as={MdEdit} width="20px" height="20px" color="inherit" />,
    component: <EditProfile />,
  },

  // {
  //   name: 'Notification',
  //   layout: '/manager',
  //   icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
  //   path: '/notification',
  //   component: <NotificationMenu />,
  //   index: false
  // }
  // {
  //   name: 'Update Staff Status',
  //   layout: '/manager',
  //   path: '/Update-Staff-Status/:id',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <AdminStaffStatus />,
  //   index: false
  // },

  // {
  //   name: 'Inactive Staff Status',
  //   layout: '/manager',
  //   path: '/Inactive-Staff-Status',
  //   icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
  //   component: <InactiveStaffLayout />,
  //   index: true
  // }
  // ,
  {
    name: 'Update Staff Status',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/Update-Staff-Status/:id',
    component: <AdminStaffStatus />,
    index: false
  },
  {
    name: 'Inactive Staff Status',
    layout: '/manager',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: '/Inactive-Staff-Status',
    component: <InactiveStaffLayout />,
    index: true
  },

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

