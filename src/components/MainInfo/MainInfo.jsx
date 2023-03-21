import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import mainLeftBanner from '../../img/1583429434.jpg';
// import { fetchNews } from '../../store/newsSlice';
import './MainInfo.css';

const MainInfo = () => {
  // const dispatch = useDispatch();
  // const rtkNews = useSelector((state) => state.news);
  // const [shouldRender, setShouldRender] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchNews());
  // }, [dispatch]);

  // const { status, news } = rtkNews;

  // useEffect(() => {
  //   if (status === 'succeeded') {
  //     setShouldRender(true);
  //   }
  // }, [status]);

  // if (!shouldRender) {
  //   return null;
  // }
  // console.log(news.results[0].title);
  return (
    <div className="row p-4">
      <div className="col-6">
        <div className="left_main__banner">
          <img className="rounded-2" src={mainLeftBanner} alt="Баннер" width={750} height={270} />
        </div>
      </div>
      <div className="col-6">
        {/* <span>Последняя новость:</span>
        {<><p > {news.results[0].title}</p>
          <a href={news.results[0].link} target="_blank" rel="noopener noreferrer">
            Читать в источнике
          </a></>
        } */}
      </div>
    </div>
  );
};

export default MainInfo;
