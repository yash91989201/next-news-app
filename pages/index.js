
import styles from '../styles/Home.module.css'
import Toolbar from '../../component/toolbar';

export default function Home() {
  return (
    <>
    <div className="page-container">
      <Toolbar/>
      <div className={styles.main}>
        <h1>Next Js news app</h1>
        <h3>Your one stop shop for latest news!!!!</h3>
      </div>
    </div>
    </>

  );
}
