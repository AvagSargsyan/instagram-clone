import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import { getAllPosts, reset } from '../../features/post/post.slice';
import Post from '../../components/Post/Post';
import styles from './Home.module.scss';
import Spinner from '../../components/Spinner/Spinner';

function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }

    dispatch(getAllPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  return (
    <section className={styles.pageWrapper}>
      <UserHeader className={styles.header} />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className={styles.main}>
          {posts.length > 0 ? (
            <div className={styles.feed}>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  user={user}
                  post={post}
                  className={styles.userPost}
                />
              ))}
            </div>
          ) : isError ? (
            <h3 className={styles.message}>
              An error accured while getting posts.
            </h3>
          ) : (
            <h3 className={styles.message}>There aren't any posts to show.</h3>
          )}
        </section>
      )}
    </section>
  );
}

export default Home;
