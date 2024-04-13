import styles from "./footer.module.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className={styles.module}>
        <h1 className={styles.logo}>
          pet finder <br />
          <p>Your pet, Our Passion</p>
        </h1>
        <div className={styles.footer_container}>
          <div className={styles.footer_col_1}>
            <p>
              A pet adoption website connects people looking to adopt pets with
              animals in need of homes. It features profiles of adoptable pets,
              allowing users to browse, search, and contact shelters or rescues.
              These platforms promote responsible pet ownership, reduce pet
              overpopulation, and facilitate successful adoptions.
            </p>

            <div className={styles.additional_info}>
              <p>Jhamsikhel,Lalitpur</p>
              <p>01-4314612</p>
              <p>info@petsnepal.com</p>
            </div>
          </div>

          <div className={styles.footer_wrapper}>
            <div className={styles.footer_col_2}>
              <h2>Services</h2>
              <a href="#">Home</a>
              <a href="#">Homeeeeee</a>
              <a href="#">Home</a>
              <a href="#">Home</a>
              <a href="#">Home</a>
              <a href="#">Home</a>
            </div>

            <div className={styles.footer_col_3}>
              <h2>About</h2>
              <a href="#">Home</a>
              <a href="#">Home</a>
              <a href="#">Home</a>
              <a href="#">Home</a>
              <a href="#">Home</a>
              <a href="#">Home</a>
            </div>

            <div className={styles.footer_col_4}>
              <p>
                Save favorite pets <br />&<br /> track their adoption status
              </p>
              <Link to="/register">
                <button class={styles.btn}>Sign Up Now👋</button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
