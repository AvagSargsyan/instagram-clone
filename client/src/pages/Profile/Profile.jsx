import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import { getOwnPosts, reset, deletePost } from '../../features/post/post.slice';
import OwnPost from '../../components/OwnPost/OwnPost';
import styles from './Profile.module.scss';
import Overlay from '../../components/Overlay/Overlay';
import NavigationBtn from '../../components/NavigationBtn/NavigationBtn';
import Spinner from '../../components/Spinner/Spinner';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );
  // The post details window will be open containing the post from posts array that has this index value, it will be closed when this value is null
  const [openPostIndex, setOpenPostIndex] = useState(null);

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }

    dispatch(getOwnPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  const openPost = (index) => {
    setOpenPostIndex(index);
  };
  const closePost = () => setOpenPostIndex(null);

  return (
    <>
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
            <Spinner />
          ) : (
            <section className={styles.posts}>
              <h3 className={styles.postsHeading}>posts</h3>
              {posts.length > 0 ? (
                <div className={styles.postsGrid}>
                  {posts.map((post, i) => (
                    <div
                      onClick={() => openPost(i)}
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
      <Overlay
        isOpen={openPostIndex !== null}
        onClose={closePost}>
        {posts[openPostIndex] && (
          <div
            className={styles.postDetailsModal}
            key={posts[openPostIndex]._id}>
            {(openPostIndex !== 0 && !isLoading) && (
              <NavigationBtn
                className={styles.prevPostBtn}
                type="LEFT"
                action={() => setOpenPostIndex((prevState) => prevState - 1)}
              />
            )}
            <OwnPost
              className={styles.postDetails}
              post={posts[openPostIndex]}
            />
            {(openPostIndex !== posts.length - 1 && !isLoading) && (
              <NavigationBtn
                className={styles.nextPostBtn}
                type="RIGHT"
                action={() => setOpenPostIndex((prevState) => prevState + 1)}
              />
            )}
          </div>
        )}
      </Overlay>
    </>
  );
}

export default Profile;
