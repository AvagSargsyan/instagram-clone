import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader/UserHeader';
import { getAllPosts, reset } from '../features/post/post.slice';

function Home() {
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

    dispatch(getAllPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  return (
    <section>
      <UserHeader />
      {isLoading ? (
        // todo: Add a loading spinner
        'Loading...'
      ) : (
        <section>
          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <div key={post._id}>
                  <h6>{post.author.name}</h6>
                  <section>{post.content}</section>
                </div>
              ))}
            </div>
          ) : isError ? (
            <h3>An error accured while getting posts.</h3>
          ) : (
            <h3>There aren't any posts to show.</h3>
          )}
        </section>
      )}
    </section>
  );
}

export default Home;
