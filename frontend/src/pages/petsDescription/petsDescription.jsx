import styles from "./petsDescription.module.css"
import Nav from "../../components/nav/nav"
import Card from "../../components/card/card"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function PetsDescription() {
    const [pets, setPets] = useState([]);
    const [pet,setPet] = useState([])
    const {id} = useParams()

    // http://localhost:3000/petFinder/selected/65ffebd27b6d832e34a03073

  useEffect(()=>{
    axios
    .get(`http://localhost:3000/petFinder/selected/${id}`)
    .then(function (response) {
        setPet(response.data.getPetData);
    })
    .catch(function (error) {
        console.log(error);
    });
  },[id])

  

    useEffect(() => {
   

        axios
            .get("http://localhost:3000/petFinder/get")
            .then(function (response) {
                setPets(response.data.getallpets);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    console.log(pet)

    return (
        <>
            <Nav />
            <div className={styles.img_container}>
                <img src={pet?.image?.url}className={styles.img_blur}></img>
                <img src={pet?.image?.url} className={styles.img}></img>
            </div>

            <div className={styles.container}>



                <div className={styles.description_container}>
                    <h1 className={styles.heading}>{pet?.name}</h1>
                    <div className={styles.buttons}>
                        <button className={`${styles.button} ${styles.button1}`}>
                            <p>Adopt Pet</p>
                        </button>
                        <Link to="/allPets">
                            <button className={`${styles.button} ${styles.button2}`}>
                                <p>Add To Favourites</p>
                            </button>
                        </Link>
                    </div>
                    <p className={styles.paragraph}>{pet?.description}</p>
                </div>

                <div className={styles.morePets}>
                    <h1>More Pets You Might Like</h1>
                    <div className={styles.cards}>
                        {pets.slice(0, 3).map((pets) => {
                            return <Card pet={pets} key={pets.id} />;
                        })}
                    </div>
                </div>

            </div>

        </>
    )
}