import { useEffect, useState } from "react";
import styles from "./card.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";

export default function Card({ pet }) {
    const [img, setImg] = useState(null); // Initialize img state as null

 
    // Fetch the image when the component mounts or when pet changes
    useEffect(() => {
        // Check if the pet has an image URL
        if (pet?.image?.url) {
            const image = new Image();
            image.src = pet.image.url;
            image.onload = () => {
                setImg(image);
            };
        }
    }, [pet]);

    return (
        <div className={styles.card} key={pet.id}>
            {/* Show skeleton loading when img is null or loading */}
            {(img === null) && <div className={styles.skeletonLoading}></div>}

            {/* Show LazyLoadImage when img is loaded */}
            <Link to = {`/petDescription/${pet._id}`} onClick={()=>window.scrollTo(0,0)}>
            {img && (
                <LazyLoadImage
                    src={img.src}
                    className={styles.card_img}
                    alt={pet.name}
                />
            )}
            </Link>
           

            <div className={styles.description_container}>
                <div className={styles.description_one}>
                    <h2 className={styles.name}>{pet.name}</h2>
                    <p className={styles.gender}>{pet.gender}</p>
                </div>
                <div className={styles.description_two}>
                    <h2>{pet.breed}</h2>
                    <p>
                        <span>{pet.age}</span> Months
                    </p>
                </div>
            </div>
        </div>
    );
}
