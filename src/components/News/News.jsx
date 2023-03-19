import React, { useState, useEffect } from 'react';
import './News.css';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const apiUrl = selectedCategory === 'all'
            ? '/api?apikey=pub_19147085f629826ebf4ddf484d56f57411e6c&language=ru&country=ru'
            : `/api?apikey=pub_19147085f629826ebf4ddf484d56f57411e6c&language=ru&country=ru&category=${selectedCategory}`;

        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors' // add this line to enable CORS
        };

        fetch(apiUrl, options)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setArticles(data.results);
                setFilteredArticles(data.results);
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
            const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_19147085f629826ebf4ddf484d56f57411e6c&language=ru&country=ru&category=${selectedCategory}`;

            const options = {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors' // add this line to enable CORS
            };

            fetch(apiUrl, options)
                .then(response => response.json())
                .then(data => {
                    setFilteredArticles(data.articles);
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <>
            <h1 className='p-3'>Новости {articles.keywords}</h1>
            <div className="filter_container">
                {categories.map(category => (
                    <button
                        key={category.name}
                        className={selectedCategory === category.value ? 'filter-link active' : 'filter-link'}
                        onClick={() => handleCategoryChange(category.value)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <ul className='news-cards-list'>
                {filteredArticles.map(article => {
                    const date = new Date(article.pubDate); // создаем объект Date из строки с датой
                    const day = date.getDate().toString().padStart(2, '0'); // преобразуем день в строку и добавляем ведущий ноль, если день меньше 10
                    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // преобразуем месяц в строку и добавляем ведущий ноль, если месяц меньше 10
                    const hours = date.getHours().toString().padStart(2, '0'); // преобразуем часы в строку и добавляем ведущий ноль, если часы меньше 10
                    const minutes = date.getMinutes().toString().padStart(2, '0'); // преобразуем минуты в строку и добавляем ведущий ноль, если минуты меньше 10
                    const formattedDate = `${day}.${month} в ${hours}:${minutes}`; // форматируем дату в нужный вид

                    return (
                        <li key={article.nextPage} className='news-card'>
                            <div className='news-card-image'>
                                {article.image_url ? (
                                    <img loading='lazy' width={350} height={280} src={article.image_url} alt={article.title} />

                                ) : (
                                    <p>Источник: {article.mk}</p>
                                )}
                            </div>
                            <div className='news-card-content'>
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <a href={article.link} target='_blank' rel='noopener noreferrer'>Читать далее...</a>
                                <span className='news-card-content__date_publick'>Дата публикации {formattedDate}</span>
                            </div>
                        </li>
                    );
                })}

            </ul>
        </>
    );
}

export default News;

