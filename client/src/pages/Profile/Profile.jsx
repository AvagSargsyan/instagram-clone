import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import { getOwnPosts, reset, deletePost } from '../../features/post/post.slice';
import styles from './Profile.module.scss';

function Profile() {
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

    dispatch(getOwnPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  return (
    <div className={styles.pageWrapper}>
      <UserHeader />
      <div className={styles.page}>
        <main className={styles.profile}>
          <div className={styles.profilePictureContainer}>
            <img
              className={styles.profilePicture}
              src={user.profilePictureSrc}
              alt={`User ${user.fullName}`}
            />
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.username}>{user.name}</h1>
            <div className={styles.stats}>
              <div>
                <span className={styles.statNumber}>
                  {posts && posts.length}
                </span>
                posts
              </div>
              {/* // todo: Change this hardcoded values */}
              <div>
                <span className={styles.statNumber}>0 </span> followers
              </div>
              <div>
                <span className={styles.statNumber}>0 </span> following
              </div>
            </div>
            <div className={styles.fullName}>{user.fullName}</div>
          </div>
        </main>
        {isLoading ? (
          // todo: Add a loading spinner
          'Loading...'
        ) : (
          <section className={styles.posts}>
            <h3 className={styles.postsHeading}>posts</h3>
            {posts.length > 0 ? (
              <div className={styles.postsGrid}>
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className={styles.post}>
                    <img
                      src={post.imageSrc}
                      alt={`Post ${post._id}`}
                      className={styles.postImage}
                    />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <h3>An error accured while getting posts.</h3>
            ) : (
              <h3>You haven't posted anything yet.</h3>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default Profile;
