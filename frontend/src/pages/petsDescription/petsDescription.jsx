import styles from "./petsDescription.module.css";
import Nav from "../../components/nav/nav";
import Card from "../../components/card/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function PetsDescription() {
  const [pets, setPets] = useState(null);
  const [pet, setPet] = useState(null)
  const { id } = useParams()
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const [userId, setUserId] = useState("");
  const [jwtToken, setJwtToken] = useState("");



  useEffect(() => {
    // Fetch user object from local storage
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    // Extract _id from user object
    if (user && user._id) {
      setUserId(user._id);
    }

    // Fetch jwtToken from local storage
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJwtToken(token);
    }
  }, []);

  const navigate = useNavigate();


  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToFavorites= async () => {
    try {
    
      const response = await axios.post(`http://localhost:3000/petFinder/addFav/${id}`, 
      { id: userId ,
        token:jwtToken,
      
      }
      
      );
  
      console.log(response.data); 
  
  
    } catch (error) {
      console.error('Error:', error);
  
    }
  };



  useEffect(() => {
    axios
      .get(`http://localhost:3000/petFinder/selected/${id}`)
      .then(function (response) {
        setPet(response.data.getPetData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id])



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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === pet?.image?.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? pet?.image?.length - 1 : prevIndex - 1));
  };



  return (
    <>
      <Nav />


      <div className={styles.img_container}>
        <IoIosArrowRoundBack className={styles.backArrow} onClick={() => navigate("/allPets")} />
        {
          pet === null ?
            <>
              <img className={styles.skeletonLoading_big} />
              <img className={styles.skeletonLoading_small} />
            </>
            :
            <>
              {pet.image && pet.image[currentImageIndex] && (
                <>

                  <img src={pet.image[currentImageIndex].url} className={styles.img_blur} alt={`Blurry Image`} />
                  <img src={pet.image[currentImageIndex].url} className={styles.img} alt={`Image `} />
                </>
              )}
            </>
        }







      </div>

      <button onClick={prevImage}>Previous</button>
      <button onClick={nextImage}>Next</button>

      <div className={styles.container}>
        <div className={styles.description_container}>
          <h1 className={styles.heading}>{pet?.name}</h1>

          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.button1}`}>
              <p>Adopt Pet</p>
            </button>

            {isAddedToFavorites ? (
              <button className={`${styles.button} ${styles.button2}`} onClick={handleAddToFavorites}>
                <p>Added to Favorites</p>
              </button>
            ) : (
              <button className={`${styles.button} ${styles.button2}`} onClick={handleAddToFavorites}>
                <p>Add To Favourites</p>
              </button>
            )}

          </div>
          <p className={styles.paragraph}>{pet?.description}</p>
        </div>

        <div className={styles.morePets}>
          <h1>More Pets You Might Like</h1>
          <div className={styles.cards}>
            {pets?.slice(0, 4).filter((data) => data._id !== id).map((pets) => {
              return <Card pet={pets} key={pets.id} />;
            })}
          </div>
        </div>

      </div>

    </>
  )
}
