import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import { getOwnPosts, reset, deletePost } from '../../features/post/post.slice';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }

    dispatch(getOwnPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  return (
    <section>
      <UserHeader />
      <div>
        <img
          src={user.profilePictureSrc}
          alt={`User ${user.fullName}`}
        />
        <h1>{user.name}</h1>
        <div>{posts && posts.length} posts</div>
        <div>{user.fullName}</div>
      </div>
      {isLoading ? (
        // todo: Add a loading spinner
        'Loading...'
      ) : (
        <div>
          <section>
            <h3>My posts</h3>
            {posts.length > 0 ? (
              <div>
                {posts.map((post) => (
                  <div key={post._id}>
                    <p>{post.content}</p>
                    <img
                      src={post.imageSrc}
                      alt={`Post ${post._id}`}
                    />
                    <button onClick={() => dispatch(deletePost(post._id))}>
                      x
                    </button>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <h3>An error accured while getting posts.</h3>
            ) : (
              <h3>You haven't posted anything yet.</h3>
            )}
          </section>
        </div>
      )}
    </section>
  );
}

export default Profile;
