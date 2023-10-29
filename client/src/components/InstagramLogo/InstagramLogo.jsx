import styles from './InstagramLogo.module.scss';

function InstagramLogo({ className }) {
  return (
    <div className={`${styles.instagramLogo} ${className}`}>
      <img
        className={styles.instagramLogoImg}
        src="/logos/instagram_logo.png"
        alt="Instagram"
      />
      <span>clone</span>
    </div>
  );
}

export default InstagramLogo;
