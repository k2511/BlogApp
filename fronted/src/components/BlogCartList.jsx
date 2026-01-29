import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCartList = ({blog}) => {
    const navigate = useNavigate()
  return (
    <div className='bg-white dark:bg-gray-700 dark:border-gray-600 flex flex-col md:flex-row p-4 sm:p-6 md:gap-6 lg:gap-8 rounded-2xl mt-4 sm:mt-6 shadow-lg border transition-all hover:shadow-xl dark:hover:shadow-gray-900'>
      <div className='w-full md:w-auto md:flex-shrink-0'>
        <div className='relative overflow-hidden rounded-xl'>
          <img 
            src={blog.thumbnail} 
            alt={blog.title || "Blog image"} 
            className='w-full h-48 sm:h-56 md:h-40 lg:h-48 md:w-[280px] lg:w-[320px] object-cover rounded-xl hover:scale-105 transition-all duration-300' 
          />
        </div>
      </div>
      
      <div className='flex flex-col flex-1 mt-4 md:mt-0'>
        <div className='flex-grow'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mt-2 md:mt-0 line-clamp-2'>
            {blog.title}
          </h2>
          <h3 className='text-gray-500 dark:text-gray-300 mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl line-clamp-2 md:line-clamp-3'>
            {blog.subtitle}
          </h3>
        </div>
        
        <div className='mt-6 md:mt-auto'>
          <Button 
            onClick={()=>navigate(`/blogs/${blog._id}`)} 
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-medium transition-all hover:scale-105"
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogCartList