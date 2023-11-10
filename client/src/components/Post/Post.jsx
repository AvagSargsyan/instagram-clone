import { formatDistanceToNow } from 'date-fns';
import styles from './Post.module.scss';

const Post = ({ user, post, className }) => {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true
  });

  return (
    <div className={`${styles.post} ${className}`}>
      <section className={styles.user}>
        <img
          className={styles.userProfilePicture}
          src={user.profilePictureSrc}
          alt={`User ${user.fullName}`}
        />
        <div className={styles.username}>{post.author.name}</div>
        <div className={styles.options}>...</div>
      </section>
      <section className={styles.postImageContainer}>
        <img
          className={styles.image}
          src={post.imageSrc}
          alt={`${user.name}'s post`}
        />
      </section>
      <section className={styles.postInfo}>
        <p className={styles.postContent}>
          <span className={styles.inlineUsername}>{user.name}</span>{' '}
          {post.content}
        </p>
        <p className={styles.time}>{timeAgo}</p>
      </section>
    </div>
  );
};

export default Post;
