import React, { useState, useEffect } from 'react';
import './News.css';
import Dashboard from '../Dashboard/Dashboard';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const apiUrl = selectedCategory === 'all'
            ? 'https://newsapi.org/v2/top-headlines?country=ru&apiKey=a63ddc24567546db8b9c3141919af3ee'
            : `https://newsapi.org/v2/top-headlines?country=ru&category=${selectedCategory}&apiKey=a63ddc24567546db8b9c3141919af3ee`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setArticles(data.articles);
                setFilteredArticles(data.articles);
            })
            .catch(error => console.error(error));
    }, [selectedCategory]);

    const categories = [
        { name: 'Все новости', value: 'all' },
        { name: 'Бизнеса', value: 'business' },
        { name: 'Развлечения', value: 'entertainment' },
        { name: 'Здоровья', value: 'health' },
        { name: 'Науки', value: 'science' },
        { name: 'Спорта', value: 'sports' },
        { name: 'Технологии', value: 'technology' },
    ];

    const handleCategoryChange = (selectedCategory) => {
        setSelectedCategory(selectedCategory);

        if (selectedCategory === 'all') {
            setFilteredArticles(articles);
        } else {
            fetch(`https://newsapi.org/v2/top-headlines?country=ru&category=${selectedCategory}&apiKey=a63ddc24567546db8b9c3141919af3ee`)
                .then(response => response.json())
                .then(data => {
                    setFilteredArticles(data.articles);
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <>
            <h1 className='p-3'>Новости {categories.name}</h1>
<Dashboard categories={categories}/>
            {/* <div className="filter_container">
                {categories.map(category => (
                    <button
                        key={category.value}
                        className={selectedCategory === category.value ? 'filter-link active' : 'filter-link'}
                        onClick={() => handleCategoryChange(category.value)}
                    >
                        {category.name}
                    </button>
                ))}
            </div> */}

            <ul className='news-cards-list'>
                {filteredArticles.map(article => (
                    <li key={article.url} className='news-card'>
                        <div className='news-card-image'>
                            {article.urlToImage ? (
                                <img width={400} height={300} src={article.urlToImage} alt={article.title} />
                            ) : (
                                <p>Источник: {article.author}</p>
                            )}
                        </div>
                        <div className='news-card-content'>
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <a href={article.url} target='_blank' rel='noopener noreferrer'>Читать далее...</a>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default News;
