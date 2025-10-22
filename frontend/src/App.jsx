import { Login, SignUp, Interview, InterviewPrep, LandingPage, ComponentGenerator,CodeReviewer,ResumeAnalyzer,Pastes } from "./Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserProvider from "./Context/userContext";
// import Sidebar from "./components/Sidebar";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <>
       <UserProvider>
      <Router>
        <Routes>
          {/* Landing / Auth pages without sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

              {/* Dashboard / Tool pages with sidebar */}
          <Route
            path="/interview"
            element={
              <DashboardLayout>
                <Interview />
              </DashboardLayout>
            }
          />
          <Route
            path="/generator"
            element={
              <DashboardLayout>
                <ComponentGenerator />
              </DashboardLayout>
            }
          />
          <Route
            path="/reviewer"
            element={
              <DashboardLayout>
                <CodeReviewer />
              </DashboardLayout>
            }
          />
          <Route
            path="/resume"
            element={
              <DashboardLayout>
                <ResumeAnalyzer />
              </DashboardLayout>
            }
          />
          <Route
            path="/pastes"
            element={
              <DashboardLayout>
                <Pastes />
              </DashboardLayout>
            }
          />
          <Route
            path="/interview-prep/:sessionId"
            element={
              <DashboardLayout>
                <InterviewPrep />
              </DashboardLayout>
            }
          />
        </Routes>
        <Toaster
          toastOptions={{
            className: "",
            style: { fontSize: "13px" },
          }}
        />
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
