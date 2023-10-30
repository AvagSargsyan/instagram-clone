import GuestHeader from "../GuestHeader";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <GuestHeader />
      <section>
        <h2>Sorry, this page isn't available.</h2>
        <p>
          The link you followed may be broken, or the page may have been
          removed. <Link to="/login">Go back to Instagram.</Link>
        </p>
      </section>
    </div>
  );
}

export default NotFound;
