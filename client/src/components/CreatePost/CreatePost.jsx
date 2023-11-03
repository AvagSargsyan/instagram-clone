import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/post/post.slice';

function CreatePost() {
  const dispatch = useDispatch();
  const { posts, isLoading, isSuccess, isError } = useSelector(
    (state) => state.post
  );
  const [postText, setPostText] = useState('');
  const [isPostCreated, setIsPostCreated] = useState(false);

  const onInputChange = (e) => {
    setPostText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postData = {
      content: postText
    };

    dispatch(createPost(postData));

    setPostText('');
    setIsPostCreated(true);
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
        <input
          type="text"
          placeholder="What's on your mind?"
          value={postText}
          onChange={onInputChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
