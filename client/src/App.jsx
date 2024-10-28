import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CreateCompany from "./components/admin/CreateCompany"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJob from "./components/admin/AdminJob"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import './App.css'
import SaveForLater from "./components/SaveForLater"
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/saveForLater',
    element: <SaveForLater />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  // admin 
  {
    path: 'admin/companies',
    element: <Companies />
  },
  {
    path: 'admin/companies/create',
    element: <CreateCompany />
  },
  {
    path: 'admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path: 'admin/jobs',
    element: <AdminJob />
  },
  {
    path: 'admin/job/create',
    element: <PostJob />
  },
  {
    path: 'admin/jobs/:id/applicants',
    element: <Applicants />
  },
])
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
