import Navbar from '../shared/Navbar'
import HeroSection from '../HeroSection'
import CategorySection from '../CategorySection'
import LatestJobs from '../LatestJobs'
import Footer from '../shared/Footer'
import userGetAllJobs from '../hooks/userGetAllJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Testimonial from '../Testimonial'

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
      <Testimonial/>
      <Footer />
    </div>
  )
}

export default Home
