import { formatDistanceToNow } from 'date-fns';
import styles from './OwnPost.module.scss';
import { useState } from 'react';
import Overlay from '../Overlay/Overlay';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../features/post/post.slice';

const OwnPost = ({ post, className }) => {
  const { posts, isLoading, isSuccess, isError } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true
  });

  const openOptionsMenu = () => {
    setIsOptionsMenuOpen(true);
  };

  const closeOptionsMenu = () => {
    setIsOptionsMenuOpen(false);
  };

  const deleteCurrentPost = (postId) => {
    setIsPostDeleted(true);
    dispatch(deletePost(postId));
    closeOptionsMenu();
  };

  if (isPostDeleted && isLoading) {
    // todo: Add a loading spinner
    return <div className={styles.stateMessage}>Loading...</div>;
  }

  if (isPostDeleted && isSuccess) {
    return <div className={styles.message}>Your post has been deleted.</div>;
  }

  if (isPostDeleted && isError) {
    return <div className={styles.stateMessage}>An error accured while deleting your post.</div>;
  }

  return (
    <div className={`${styles.post} ${className}`}>
      <div className={styles.postImageContainer}>
        <img
          className={styles.image}
          src={post.imageSrc}
          alt={`${post.author.name}'s post`}
        />
      </div>
      <div className={styles.postDetails}>
        <section className={styles.author}>
          <div className={styles.authorAndOptions}>
            <img
              className={styles.authorProfilePicture}
              src={post.author.profilePictureSrc}
              alt={`User ${post.author.fullName}`}
            />
            <div className={styles.authorName}>{post.author.name}</div>
            <button
              className={styles.options}
              onClick={openOptionsMenu}>
              ...
            </button>
          </div>
        </section>

        <section className={styles.postInfo}>
          <p className={styles.postContent}>
            <span className={styles.inlineAuthorName}>{post.author.name}</span>{' '}
            {post.content}
          </p>
          <p className={styles.time}>{timeAgo}</p>
        </section>
      </div>
      <Overlay
        isOpen={isOptionsMenuOpen}
        onClose={closeOptionsMenu}>
        <ul className={styles.optionsMenu}>
          <li className={styles.optionsMenuItem}>
            <div onClick={() => deleteCurrentPost(post._id)}>Delete</div>
          </li>
          <li className={styles.optionsMenuItem}>
            <div onClick={closeOptionsMenu}>Cancel</div>
          </li>
        </ul>
      </Overlay>
    </div>
  );
};

export default OwnPost;
