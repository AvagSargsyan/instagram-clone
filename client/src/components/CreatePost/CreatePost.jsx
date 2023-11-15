import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/post/post.slice';

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

  if (isPostCreated && isLoading) {
    // todo: Add a loading spinner
    return 'Loading...';
  }

  if (isPostCreated && isSuccess) {
    return 'Your post has been shared.';
  }

  if (isPostCreated && isError) {
    return 'An error occurred while sharing your post.';
  }

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Create new post</h2>
          <button>
            <label htmlFor="upload-image">Select Image</label>
            <input
              id="upload-image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <header>
            <button onClick={goToPrevStep}>
              <img
                src="/icons/left_arrow.png"
                alt="Back"
              />
            </button>
            <h2>Preview</h2>
            <button onClick={goToNextStep}>Next</button>
          </header>
          <div>
            <img
              src={previewImageSrc}
              alt="Preview"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <header>
            <button onClick={goToPrevStep}>
              <img
                src="/icons/left_arrow.png"
                alt="Back"
              />
            </button>
            <h2>Create new post</h2>
            <button onClick={sharePost}>Share</button>
          </header>
          <div>
            <div>
              <img
                src={user.profilePictureSrc}
                alt={`User ${user.fullName}`}
              />
              <div>{user.name}</div>
            </div>
            <input
              type="text"
              placeholder="Write a caption..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <img
              src={previewImageSrc}
              alt="Chosen"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CreatePost;
