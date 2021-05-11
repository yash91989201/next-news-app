import {useRouter} from 'next/router'
import Toolbar from '../../component/Toolbar';
import styles from '../../styles/Feed.module.css';
const Feed =({articles,pageNumber}) => {
  const router=useRouter();
    return ( 
        <>
       <div className='page-container'>
         <Toolbar/>
       <div className={styles.main}>
          {articles.map((article,index)=>{
            return(
              <div key={index} className={styles.post}>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} />}
            </div>
            )
          })}
        </div>
          <div className={styles.paginator}>
            <div className={pageNumber === 1 ? styles.disabled : styles.active}
            onClick={()=>{
              if(pageNumber > 1) 
              router.push(`/feed/${pageNumber - 1}`).then(()=>{window.scrollTo(0,0)})
            }}>
              Previous Page
            </div>
            <div className={pageNumber > 0 ? styles.active : styles.disabled}
            onClick={()=>{
              if(pageNumber > 0) 
              router.push(`/feed/${pageNumber + 1}`).then(()=>{window.scrollTo(0,0)})
            }}>
              Next Page
            </div>
          </div>
       </div>
        </>
     );
};
const getServerSideProps = async (pageContext) => {
   
   const pageNumber=pageContext.query.slug; 

   if( !pageNumber || pageNumber <1 || pageNumber >5){
       return{
           props:{
               articles:[],
               pageNumber:1
           }
       };
   }
   const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=2`,
    {
      headers: {
        'x-api-key':process.env.NEWS_PUBLIC_NEWS_KEY
      }
    })
    .then(res =>res.json());
  
  const { articles } = apiResponse;
  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};
export default Feed;
export {getServerSideProps};