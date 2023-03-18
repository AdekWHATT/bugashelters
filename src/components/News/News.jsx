import React, { useState, useEffect } from 'react';
import NewsAPI from 'newsapi';

const newsapi = new NewsAPI('a63ddc24567546db8b9c3141919af3ee');

const News = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    newsapi.v2.topHeadlines({
      country: 'ru'
    }).then(response => {
      setArticles(response.articles);
      setFilteredArticles(response.articles);
    }).catch(error => console.error(error));
  }, []);

  const categories = ['all', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === 'all') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article => article.category === category);
      setFilteredArticles(filtered);
    }
  };

  return (
    <>
      <h1 className='p-3'>News</h1>

      <div className="filter">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className='news-cards-list'>
        {filteredArticles.map(article => (
          <li key={article.url} className='news-card'>
            <div className='news-card-image'>
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            </div>
            <div className='news-card-content'>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target='_blank' rel='noopener noreferrer'>Read more</a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default News;
