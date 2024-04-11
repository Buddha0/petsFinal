import React from "react";
import styles from "./testomonial.module.css"; // Adjust the path as necessary

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TestimonialSection = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <section className={styles.testominial_section}>
      <div className={styles.testominial_container}>
        <h1>What Our Adopters Says?</h1>

        <Carousel responsive={responsive}>
          <div className={styles.cards}>
            <p>
              Adopting from this website was one of the best decisions I've ever
              made. I stumbled upon their platform while searching for a furry
              companion to join my family. The process was seamless, and the
              staff were incredibly helpful and supportive throughout. I found
              my perfect match, a playful kitten named Luna, and she has brought
              so much joy into my life. Thank you for helping me find my forever
              friend!
            </p>
            <div className={styles.user_profile_info}>
              <img
                src="https://preview.redd.it/hot-take-toji-is-more-deadbeat-dad-then-ging-v0-2rjtw9wihjjb1.jpg?width=640&crop=smart&auto=webp&s=d94e1dadbc00325b9b6f4037af1545c37835d709"
                className={styles.profileImg}
                alt="Profile"
              />
              <div className={styles.profileInfos}>
                <p className={styles.fontSmall}>Baroon Shrestha</p>
                <p className={styles.fontSmallest}>Pet Adopter</p>
              </div>
            </div>
          </div>
          <div className={styles.cards}>
            <p>
              {" "}
              As a first-time pet owner, I was nervous about adopting from an
              online platform, but this website exceeded all my expectations.
              From the moment I reached out, the team provided guidance and
              support every step of the way. They matched me with the perfect
              fit, a gentle rescue dog named Bailey, who has quickly become a
              cherished member of my family. I highly recommend this website to
              anyone looking to give a pet a second chance at a loving home
            </p>
            <div className={styles.user_profile_info}>
              <img
                src="https://i.ebayimg.com/images/g/B4YAAOSwsA5kk9tp/s-l1200.webp"
                className={styles.profileImg}
                alt="Profile"
              />
              <div className={styles.profileInfos}>
                <p className={styles.fontSmall}>Sandhya Gole</p>
                <p className={styles.fontSmallest}>Pet Adopter</p>
              </div>
            </div>
          </div>

          <div className={styles.cards}>
            <p>
              {" "}
              "I can't express how grateful I am for this pet adoption website.
              After losing my old dog, I felt an emptiness in my home that I
              couldn't shake. I decided to browse through the website, and
              that's when I found Max, a senior dog in need of a loving home.
              Despite his age, Max has filled my life with so much love and
              companionship. Adopting him was the best decision I've ever made,
              and I'm forever thankful to this platform for bringing us
              together.
            </p>
            <div className={styles.user_profile_info}>
              <img
                src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/832f335a-2182-486a-ac99-0e3731efe72a/width=450/00254-522984667.jpeg"
                className={styles.profileImg}
                alt="Profile"
              />
              <div className={styles.profileInfos}>
                <p className={styles.fontSmall}>Sneha Shakya</p>
                <p className={styles.fontSmallest}>Pet Adopter</p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
