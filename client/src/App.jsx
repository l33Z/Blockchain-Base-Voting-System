import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Level 1/Login";
import Registration from "./Pages/Level 1/Register";
import ErrorPage from "./Components/ErrorPage";
import HomePage from "./Pages/Level 1/Home";
import Welcome from "./Pages/Level 2/Welcome";
import Information from "./Pages/Level 2/Information";
import VoteRegistration from "./Pages/Level 2/VoteRegistration";
import VotingArea from "./Pages/Level 2/VotingArea";
import Result from "./Pages/Level 2/Result";
import AddCandidates from "./Pages/AdminOnly/AddCandidates";
import Logout from "./Pages/Level 2/Logout";
import AdminLogin from "./Pages/AdminOnly/AdminLogin";
import AdminWelcome from "./Pages/AdminOnly/AdminWelcome";
import AllCandidates from "./Pages/AdminOnly/AllCandidates";
import AdminResult from "./Pages/AdminOnly/AdminResult";
import AddAdmin from "./Pages/AdminOnly/AddAdmin";
import AdminLogout from "./Pages/AdminOnly/AdminLogout";
import AdminChnagePhase from "./Pages/AdminOnly/AdminChnagePhase";
import AdminAllVoters from "./Pages/AdminOnly/AdminAllVoters";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/information" element={<Information />} />
        <Route path="/voteregistration" element={<VoteRegistration />} />
        <Route path="/votingarea" element={<VotingArea />} />
        <Route path="/result" element={<Result />} />
        <Route path="/addcandidates" element={<AddCandidates />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminwelcome" element={<AdminWelcome />} />
        <Route path="/adminallcandidates" element={<AllCandidates />} />
        <Route path="/adminresult" element={<AdminResult />} />
        <Route path="/addnewadmin" element={<AddAdmin />} />
        <Route path="/alogout" element={<AdminLogout />} />
        <Route path="/phase" element={<AdminChnagePhase />} />
        <Route path="/allVoters" element={<AdminAllVoters />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
