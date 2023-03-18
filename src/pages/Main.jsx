import React from 'react'
import Shelter from '../components/Shelter/Shelter';
import News from '../components/News/News';
import Dashboard from '../components/Dashboard/Dashboard'
const Main = () => {
    return (
        <>
            <div className='col-2'>
                <Dashboard />
            </div>
            <div className='col-10'>
                <News />
                <Shelter />
            </div>
        </>
    )
}

export default Main;