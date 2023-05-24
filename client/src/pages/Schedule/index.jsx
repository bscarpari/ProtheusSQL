import React from 'react'

import SimpleCalendar from '../../components/Schedule/Calendar'
import SimpleNavbar from '../../components/Utils/Navbar'
import Kanban from '../../components/Schedule/Kanban'

const Schedule = () => {
  return (
    <div className='my-24 h-full overflow-y-auto overflow-x-hidden 2xl:overflow-hidden'>
      <div className='h-[20vh] md:h-full'>
        <SimpleNavbar />
        <h1 className='mt-8 pl-[25px] text-3xl'>Agenda</h1>
      </div>

      <div className='flex flex-col justify-center md:h-full lg:mt-0 2xl:h-[80vh]'>
        <div className='flex h-full flex-col px-[25px] text-left 2xl:flex-row'>
          <div className='w-full 2xl:w-[70vw]'>
            <h1 className='text-2xl'>Kanban</h1>
            <Kanban />
          </div>

          <div className='mt-6 sm:mt-0 2xl:w-[30vw]'>
            <div className='flex max-w-md flex-col items-center justify-center'>
              <h1 className='mb-12 w-full text-2xl'>Calendário</h1>
              <SimpleCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
