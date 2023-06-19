import React from 'react'
import './NewsItem.css'

const NewsItem = ({ title, description, url, urlToImage }) => {
  // return (
  //       <div className="news-item articles">
  //         <article>
  //           <h3 style={{color: 'blue', fontWeight: 'bold'}}><a href={url}>{title}</a></h3>
            // <img className="news-img" src = {urlToImage} alt={urlToImage}/>
  //           <p>{description}</p>
  //         </article>
  //   </div>
  // )

  return (
    <section class="articles">
  <article>
    <div class="article-wrapper">
      <figure>
        {/* <img src={urlToImage} alt={urlToImage} /> */}
        {urlToImage ? <img src = {urlToImage}/> : <img src="https://assets.vogue.com/photos/5891464f97a3db337a2494ed/master/w_3000,h_1997,c_limit/00-holding-best-barack-obama-memes.jpg"/>}
        {/* {urlToImage === "" && <img  src ="https://assets.vogue.com/photos/5891464f97a3db337a2494ed/master/w_3000,h_1997,c_limit/00-holding-best-barack-obama-memes.jpg" alt={urlToImage}/>} */}

      </figure>
      <div class="article-body">
        <h2>{title}</h2>
        <p>
          {}
        </p>
        <a href={url} class="read-more">
          Read more <span class="sr-only"></span>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</section>
  )
}

export default NewsItem