import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='flex justify-center items-center mb-4'>
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 
                            ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'}`}>
                <ChevronLeft className='mr-1' /> {/* Left arrow icon */}
                Previous
            </button>
            <span className='mx-4'>{`Page ${currentPage} of ${totalPages}`}</span>
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 
                            ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'}`}>
                Next
                <ChevronRight className='ml-1' /> {/* Right arrow icon */}
            </button>
        </div>
    );
};

export default Pagination;
