import AppRouter from './routes/app.router';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <AppRouter />
    </div>
  );
}

export default App;
