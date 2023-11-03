import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import { getOwnPosts, reset } from '../../features/post/post.slice';

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

  if (isLoading) {
    // todo: Add a loading spinner
    return 'Loading...';
  }

  return (
    <section>
      <UserHeader />
      <div>
        <section>
          <h1>{user.name}</h1>
          <div>{posts && posts.length} posts</div>
          <div>{user.fullName}</div>
        </section>
        <section>
          <h3>My posts</h3>
          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <div key={post._id}>
                  <section>{post.content}</section>
                </div>
              ))}
            </div>
          ) : (
            <h3>You haven't posted anything yet.</h3>
          )}
        </section>
      </div>
    </section>
  );
}

export default Profile;
