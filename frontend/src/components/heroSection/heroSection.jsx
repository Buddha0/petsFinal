import styles from "./heroSection.module.css";
import Nav from "../nav/nav";
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <>
      <Nav />
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.description}>
            <h1>Find Your Furry Companion Today</h1>
            <p className={styles.grey}>
              Welcome to our pet adoption platform, where happiness meets a
              wagging tail. Find your new best friend among our selection of
              lovable pets. From playful pups to cuddly kittens, your forever
              companion is just a click away.
            </p>
            <div className={styles.buttons}>
              <button className={`${styles.button} ${styles.button1}`}>
                <p>Contact Us</p>
              </button>
              <Link to="/allPets">
                <button className={`${styles.button} ${styles.button2}`}>
                  <p>Find Pets</p>
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.img_container}>
            <img
              src="./cat2_small.jpg"
              className={`${styles.img} ${styles.img1}`}
            ></img>
            <div className={styles.img2_container}>
              <img
                src="./hamster_small.jpg"
                className={`${styles.img} ${styles.img2}`}
              ></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
