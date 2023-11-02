import styles from './InstagramLogo.module.scss';

// @param size?: 'big' | 'small'
function InstagramLogo({ className, size = 'big' }) {
  const componentStyles = {
    fontSize: size === 'small' ? '20px' : '30px'
  };

  const imgStyles = {
    width: size === 'small' ? '102px' : '175px',
    height: size === 'small' ? '30px' : '51px'
  };

  return (
    <div
      className={`${styles.instagramLogo} ${className}`}
      style={componentStyles}>
      <img
        className={styles.instagramLogoImg}
        src="/logos/instagram_logo.png"
        alt="Instagram"
        style={imgStyles}
      />
      <span>clone</span>
    </div>
  );
}

export default InstagramLogo;
