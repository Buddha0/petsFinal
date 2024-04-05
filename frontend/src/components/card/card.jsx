import { useEffect, useState } from "react";
import styles from "./card.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

export default function Card({ pet }) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = pet?.image[0]?.url;
    image.onload = () => {
      setImg(image);
    };
  }, [pet]);

  return (
    <div className={styles.card} key={pet?.id}>
      {img === null ? (
        <div className={styles.skeletonLoading}></div>
      ) : (
        <>
          <Link
            to={`/petDescription/${pet?._id}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            {<img src={img.src} className={styles.card_img} alt={pet?.name} />}
          </Link>
        </>
      )}

      <div className={styles.description_container}>
        <div className={styles.description_one}>
          <h2 className={styles.name}>{pet?.name}</h2>
          <p className={styles.gender}>{pet?.gender}</p>
        </div>
        <div className={styles.description_two}>
          <h2>{pet?.breed}</h2>
          <p>
            <span>{pet?.age}</span> Months
          </p>
        </div>
      </div>
    </div>
  );
}
