import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
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
import MyMessages from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Mymessages/Mymessages";
import Settings from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Settings/Settings";
import Logout from "./Pages/Dashboard/CompanyDashboard/Sidebar/SidebarComponents/Logout/Logout";
import Talentprofile from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Talentprofile/Talentprofile";
import Applications from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Applications/Applications";
import Shortlistedcompanies from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Shortlisted/Shortlisted";
import Opportunities from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Opportunities/Opportunities";
import Messages from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Messages/Messages";
import Talentsettings from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/Talentsettings/Talentsettings";
import TLogout from "./Pages/Dashboard/TalentDashboard/Sidebar/SidebarComponents/TLogout/TLogout";

const CompanyDashboardWithSidebar = withCompanySidebar(CompanyDashboard);
const ProfileWithSidebar = withCompanySidebar(Profile);
const ApplicationsReceivedWithSidebar = withCompanySidebar(ApplicationsReceived);
const ShortlistedVolunteersWithSidebar = withCompanySidebar(ShortlistedVolunteers);
const PostJobsWithSidebar = withCompanySidebar(PostJobs);
const ResumesWithSidebar = withCompanySidebar(Resumes);
const MyMessagesWithSidebar = withCompanySidebar(MyMessages);
const SettingsWithSidebar = withCompanySidebar(Settings);

const TalentDashboardWithSidebar = withTalentSidebar(TalentDashboard);
const TalentProfileWithSidebar = withTalentSidebar(Talentprofile);
const ApplicationsWithSidebar = withTalentSidebar(Applications);
const ShortlistedCompaniesWithSidebar = withTalentSidebar(Shortlistedcompanies);
const OpportunitiesWithSidebar = withTalentSidebar(Opportunities);
const MessagesWithSidebar = withTalentSidebar(Messages);
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
          <Route path="/MyMessages" element={<MyMessagesWithSidebar />} />
          <Route path="/Settings" element={<SettingsWithSidebar />} />
          <Route path="/Logout" element={<Logout />} />
          <Route
            path="/TalentDashboard"
            element={<TalentDashboardWithSidebar />}
          />
          <Route path="/Talentprofile" element={<TalentProfileWithSidebar />} />
          <Route
            path="/TalentDashboard/Applications"
            element={<ApplicationsWithSidebar />}
          />
          <Route
            path="/TalentDashboard/Shortlisted"
            element={<ShortlistedCompaniesWithSidebar />}
          />
          <Route
            path="/TalentDashboard/Opportunities"
            element={<OpportunitiesWithSidebar />}
          />
          <Route
            path="/TalentDashboard/Messages"
            element={<MessagesWithSidebar />}
          />
          <Route
            path="/TalentDashboard/Settings"
            element={<TalentSettingsWithSidebar />}
          />
          <Route
            path="/TalentDashboard/Logout"
            element={<TLogoutWithSidebar />}
          />
          <Route path="/Privacypolicy" element={<Privacypolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

