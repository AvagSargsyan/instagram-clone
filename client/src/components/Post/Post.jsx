import styles from './Post.module.scss';

const Post = ({ user, post, className }) => (
  <div className={`${styles.post} ${className}`}>
    <div className={styles.user}>
      <img
        className={styles.userProfilePicture}
        src={user.profilePictureSrc}
        alt={`User ${user.fullName}`}
      />
      <div className={styles.username}>{post.author.name}</div>
      <div className={styles.options}>...</div>
    </div>
    <div className={styles.postImageContainer}>
      <img
        className={styles.image}
        src={post.imageSrc}
        alt={`${user.name}'s post`}
      />
    </div>
    <p className={styles.postContent}>
      <span className={styles.inlineUsername}>{user.name}</span> {post.content}
    </p>
  </div>
);

export default Post;
