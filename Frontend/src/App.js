import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Jobs from "./Pages/Dashboard/CompanyDashboard/Jobs/Jobs";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import About from "./Pages/About-Us/About";
import Company from "./Pages/Company/Company";
import Talent from "./Pages/Talent/Talent";
import Contact from "./Pages/Contact/Contact";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import TalentDashboard from "./Pages/Dashboard/TalentDashboard/TalentDashboard";
import CompanyDashboard from "./Pages/Dashboard/CompanyDashboard/CompanyDashboard";
import Privacypolicy from "./Components/Privacypolicy/Privacypolicy";
import TermsOfService from "./Components/TermsOfService/TermsOfService";
import {
  withCompanySidebar,
  withTalentSidebar,
} from "./Pages/Dashboard/withSidebar";
import Profile from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Profile/Profile";
import ApplicationsReceived from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Applications/Applications";
import PostJobs from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Post-jobs/Post-jobs";
import ShortlistedVolunteers from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Shortlisted/Shortlisted";
import Resumes from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Resumes/Resumes";
import ChatPage from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Mymessages/ChatPage";
import Settings from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Settings/Settings";
import Logout from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Logout/Logout";
import ManageJobs from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/ManageJobs/ManageJobs";


import Talentprofile from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Talentprofile/Talentprofile";
import TApplications from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/TApplications/TApplications";
import TShortlisted from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/TShortlisted/TShortlisted";
import TOpportunities from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/TOpportunities/TOpportunities";
import TMessages from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/TMessages/TMessages";
import Talentsettings from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Talentsettings/Talentsettings";
import TLogout from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/TLogout/TLogout";
import ForgotPassword from "./Pages/forgot-password/forgot-password";


const CompanyDashboardWithSidebar = withCompanySidebar(CompanyDashboard);
const ProfileWithSidebar = withCompanySidebar(Profile);
const ApplicationsReceivedWithSidebar = withCompanySidebar(ApplicationsReceived);
const ShortlistedVolunteersWithSidebar = withCompanySidebar(ShortlistedVolunteers);
const PostJobsWithSidebar = withCompanySidebar(PostJobs);
const ResumesWithSidebar = withCompanySidebar(Resumes);
const ChatPageWithSidebar = withCompanySidebar(ChatPage);
const SettingsWithSidebar = withCompanySidebar(Settings);
const LogoutWithSidebar = withCompanySidebar(Logout);
const ManageJobsWithSidebar = withCompanySidebar(ManageJobs);

const TalentDashboardWithSidebar = withTalentSidebar(TalentDashboard);
const TalentProfileWithSidebar = withTalentSidebar(Talentprofile);
const ApplicationsWithSidebar = withTalentSidebar(TApplications);
const ShortlistedCompaniesWithSidebar = withTalentSidebar(TShortlisted);
const OpportunitiesWithSidebar = withTalentSidebar(TOpportunities);
const MessagesWithSidebar = withTalentSidebar(TMessages);
const TalentSettingsWithSidebar = withTalentSidebar(Talentsettings);
const TLogoutWithSidebar = withTalentSidebar(TLogout);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/Talent" element={<Talent />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Privacypolicy" element={<Privacypolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Jobs" element={<Jobs />} />

          <Route
            path="/CompanyDashboard"
            element={<CompanyDashboardWithSidebar />}
          />
          <Route path="/Profile" element={<ProfileWithSidebar />} />
          <Route
            path="/Applications"
            element={<ApplicationsReceivedWithSidebar />}
          />
          <Route
            path="/Shortlisted"
            element={<ShortlistedVolunteersWithSidebar />}
          />
          <Route path="/Post-jobs" element={<PostJobsWithSidebar />} />
          <Route path="/Resumes" element={<ResumesWithSidebar />} />
          <Route path="/ChatPage" element={<ChatPageWithSidebar />} />
          <Route path="/Settings" element={<SettingsWithSidebar />} />
          <Route path="/Logout" element={<LogoutWithSidebar />} />
          <Route path="/ManageJobs" element={<ManageJobsWithSidebar />} />

          <Route
            path="/TalentDashboard"
            element={<TalentDashboardWithSidebar />}
          />
          <Route path="/Talentprofile" element={<TalentProfileWithSidebar />} />
          <Route path="/TApplications" element={<ApplicationsWithSidebar />} />
          <Route
            path="/TShortlisted"
            element={<ShortlistedCompaniesWithSidebar />}
          />
          <Route
            path="/TOpportunities"
            element={<OpportunitiesWithSidebar />}
          />
          <Route path="/TMessages" element={<MessagesWithSidebar />} />
          <Route
            path="/Talentsettings"
            element={<TalentSettingsWithSidebar />}
          />
          <Route path="/TLogout" element={<TLogoutWithSidebar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
