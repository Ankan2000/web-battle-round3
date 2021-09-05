import { Link, useHistory } from "react-router-dom";
import { isAuthenticated, signout } from "./helper";
import styles from "./styles/navbar.module.css";

const NavBar = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        BlogR
      </Link>
      <ul className={styles.navbar}>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <>
            <li>
              <Link to="/signin" className={styles.link}>
                Signin
              </Link>
            </li>
            <li>
              <Link to="/signup" className={styles.link}>
                Signup
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <>
            <li>
              <Link to="/create/blog" className={styles.link}>
                Create-Blog
              </Link>
            </li>
            <li
              className={styles.link}
              onClick={() =>
                signout(() =>
                  history.push("/", {
                    signout: "true",
                    ...history.location,
                  })
                )
              }
            >
              Signout
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
