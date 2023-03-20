import React, { useState, useEffect, } from 'react';
import mainLeftBanner from '../../img/1583429434.jpg';
import { fetchNews } from '../../store/newsSlice';
import { useSelector, useDispatch } from 'react-redux';
import './MainInfo.css';

const MainInfo = () => {
  const [news, SetNews] = useState([])
  const dispatch = useDispatch();
  const rtkNews = useSelector(state => state.news);
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
console.log(rtkNews);
  return (
    <div className='row p-4'>
      <div className='col-6'>
        <div className='left_main__banner'>
          <img className='rounded-2' src={mainLeftBanner} alt="Баннер" width={750} height={270} />
        </div>
      </div>
      <div className='col-6'>
        <span>Последние новости:</span>
        {rtkNews.length > 0 ? (
          <>
            <p className="text-muted">{rtkNews[0].title}<br />
              <a href={rtkNews[0].link} target='_blank'>Читать в источнике</a>
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default MainInfo;