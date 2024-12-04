import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Pages/Home"
import Jobs from "./components/Jobs"
import Profile from "./components/shared/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CreateCompany from "./components/admin/CreateCompany"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJob from "./components/admin/AdminJob"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import './App.css'
import SaveForLater from "./components/SaveForLater"
import AuthPage from "./components/auth/AuthPage"
import Browse from "./components/Pages/Browse"
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path:'/auth',
    element:<AuthPage/>
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
