
import Hero from '@/components/Hero'
import PopularAuthors from '@/components/PopularAuthors'
import RecentBlog from '@/components/RecentBlog'
import React from 'react'

export const Home = () => {
  return (
    <div className='pt-20' >
      <Hero/>
      <RecentBlog/>
      <PopularAuthors/>
    
    </div>
  )
}
