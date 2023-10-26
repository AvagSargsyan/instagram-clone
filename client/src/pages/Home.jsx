import { useSelector } from 'react-redux';
import GuestHeader from '../components/GuestHeader';
import UserHeader from '../components/UserHeader'

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user ? (
        // todo: Replace with current user's actual home page
        <>
          <UserHeader />
          <section>{user.name}'s Home page</section>
        </>
      ) : (
        <>
          <GuestHeader />
          <section>
            <h2>Sorry, this page isn't available.</h2>
            <p>Please log in to view the contents of this page.</p>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
