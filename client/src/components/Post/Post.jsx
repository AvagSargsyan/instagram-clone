import { formatDistanceToNow } from 'date-fns';
import styles from './Post.module.scss';

const Post = ({ post, className }) => {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true
  });

  return (
    <div className={`${styles.post} ${className}`}>
      <section className={styles.author}>
        <img
          className={styles.authorProfilePicture}
          src={post.author.profilePictureSrc}
          alt={`User ${post.author.fullName}`}
        />
        <div className={styles.authorName}>{post.author.name}</div>
        <div className={styles.options}>...</div>
      </section>
      <section className={styles.postImageContainer}>
        <img
          className={styles.image}
          src={post.imageSrc}
          alt={`${post.author.name}'s post`}
        />
      </section>
      <section className={styles.postInfo}>
        {post.content && (
          <p className={styles.postContent}>
            <span className={styles.inlineAuthorName}>{post.author.name}</span>{' '}
            {post.content}
          </p>
        )}
        <p className={styles.time}>{timeAgo}</p>
      </section>
    </div>
  );
};

export default Post;
