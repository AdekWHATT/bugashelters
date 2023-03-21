/* global VK */
import React, { useEffect } from 'react';


const VkPlayList = () => {
  useEffect(() => {
    VK.Widgets.Playlist('my_playlist', -147845620, 5, 'df7f4633e7c976c386');
  }, []);



  return (
    <div className='row p-3'>
      <div className='col-6'>
        <div id="my_playlist">&nbsp;&nbsp;</div>
      </div>
      <div className='col-6'>
      </div>
    </div>
  );
};

export default React.memo(VkPlayList);
