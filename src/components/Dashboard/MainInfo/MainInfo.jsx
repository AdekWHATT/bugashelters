import React from 'react';
import mainLeftBanner from '../../../img/1583429434.jpg'
const MainInfo = () => {
  return (
    <div className='row p-4'>
       <div className='col-6'>
    <div className='left_main__banner'>
      <img className='rounded-2' src={mainLeftBanner} alt="Баннер" width={750} height={270} />
    </div>
       </div>
       <div className='col-6'>
    
       </div>
    </div>
  )
}

export default MainInfo;