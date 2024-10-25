import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '../hooks/useGetAllCompany'

const Companies = () => {
    useGetAllCompany()
    const navigate = useNavigate()
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 '>
                <div className='flex  items-center justify-between my-5'>
                    <Input
                        type="text"
                        className='w-fit'
                        placeholder='Filter By name'
                    />
                    <Button onClick={() => navigate("/admin/companies/create")}>
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies
