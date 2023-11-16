import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/post/post.slice';
import styles from './CreatePost.module.scss';
import WindowHeader from '../WindowHeader/WindowHeader';

function CreatePost() {
  const dispatch = useDispatch();
  const { posts, isLoading, isSuccess, isError } = useSelector(
    (state) => state.post
  );
  const { user } = useSelector((state) => state.auth);

  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [step, setStep] = useState(1);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState(null);

  const onImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      setPreviewImageSrc(URL.createObjectURL(selectedImage));
    }

    setStep(2);
  };

  const goToPrevStep = () => {
    setStep((prevState) => prevState - 1);
  };

  const goToNextStep = () => {
    setStep((prevState) => prevState + 1);
  };

  const sharePost = () => {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);

    dispatch(createPost(formData));
    setImage(null);
    setContent('');
    setStep(1);
    setIsPostCreated(true);
  };

  const charCount = content.length;
  const maxCharCount = 2200;

  const onContentChange = (e) => {
    const userInput = e.target.value;
    if (userInput.length <= maxCharCount) {
      setContent(userInput);
    }
  };

  if (isPostCreated && isLoading) {
    // todo: Add a loading spinner
    return <div className={styles.stateMessage}>Loading...</div>;
  }

  if (isPostCreated && isSuccess) {
    return (
      <div className={styles.stateMessage}>Your post has been shared.</div>
    );
  }

  if (isPostCreated && isError) {
    return (
      <div className={styles.stateMessage}>
        An error accured while sharing your post.
      </div>
    );
  }

  return (
    <>
      {step === 1 && (
        <div className={styles.stepOne}>
          <h2 className={styles.createNewPostHeading}>Create new post</h2>
          <div className={styles.stepOneContent}>
            <button className={`${styles.selectImageBtn} btn-default`}>
              <label
                htmlFor="upload-image"
                className={styles.selectImageLabel}>
                Select Image
              </label>
              <input
                id="upload-image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={onImageChange}
                style={{ display: 'none' }}
              />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.stepTwo}>
          <WindowHeader
            prevBtnAction={goToPrevStep}
            nextBtnAction={goToNextStep}>
            <>Preview</>
            <>Next</>
          </WindowHeader>
          <div className={styles.stepTwoImageContainer}>
            <img
              src={previewImageSrc}
              alt="Preview"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.stepThree}>
          <WindowHeader
            prevBtnAction={goToPrevStep}
            nextBtnAction={sharePost}>
            <>Create new post</>
            <>Share</>
          </WindowHeader>
          <div className={styles.stepThreeContent}>
            <div className={styles.postImageContainer}>
              <img
                className={styles.postImage}
                src={previewImageSrc}
                alt="Chosen"
                style={{ maxWidth: '100%' }}
              />
            </div>
            <div className={styles.postDetails}>
              <div className={styles.user}>
                <img
                  src={user.profilePictureSrc}
                  alt={`User ${user.fullName}`}
                />
                <div className={styles.username}>{user.name}</div>
              </div>
              <div className={styles.postCaptionContainer}>
                <textarea
                  className={styles.postCaption}
                  placeholder="Write a caption..."
                  value={content}
                  onChange={onContentChange}
                  rows={7}
                />
                <div className={styles.charCount}>
                  {charCount} / {maxCharCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;
