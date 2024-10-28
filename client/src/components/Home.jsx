import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategorySection from './CategorySection'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import userGetAllJobs from './hooks/userGetAllJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  userGetAllJobs()
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate('/admin/companies')
    }
  }, [])
  return (
    <div>
      <Navbar />
      <HeroSection   />
      <CategorySection />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
