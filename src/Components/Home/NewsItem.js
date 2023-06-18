import React from 'react'
import './NewsItem.css'

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
<<<<<<< HEAD
    <div className="news-app">
=======
>>>>>>> dev
        <div className="news-item">
            <h3 style={{color: 'blue', fontWeight: 'bold'}}><a href={url}>{title}</a></h3>
            <img className="news-img" src = {urlToImage} alt={urlToImage}/>
            <p>{description}</p>
<<<<<<< HEAD
        </div>
=======
>>>>>>> dev
    </div>
  )
}

export default NewsItem