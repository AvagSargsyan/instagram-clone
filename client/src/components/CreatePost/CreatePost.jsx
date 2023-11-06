import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/post/post.slice';

function CreatePost() {
  const dispatch = useDispatch();
  const { posts, isLoading, isSuccess, isError } = useSelector(
    (state) => state.post
  );
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isPostCreated, setIsPostCreated] = useState(false);

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);

    dispatch(createPost(formData));
    setContent('');
    setImage(null);
    setIsPostCreated(true);
  };

  const onImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  if (isPostCreated && isSuccess) {
    return 'Your post has been shared.';
  }

  if (isPostCreated && isLoading) {
    // todo: Add a loading spinner
    return 'Loading...';
  }

  if (isPostCreated && isError) {
    return 'An error accured while sharing your post.';
  }

  return (
    <div>
      <h2>Create new post</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={content}
            onChange={onContentChange}
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={onImageChange}
          />
        </div>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
