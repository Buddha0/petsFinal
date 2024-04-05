import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Card from "../../components/card/card";
import styles from "./favourites.module.css";
import Nav from "../../components/nav/nav";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [cookies, __] = useCookies(["token"]);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const response = await axios.get(
          `http://localhost:3000/petFinder/getfav`,

          {
            headers: {
              authorization: cookies.token,
            },
          }
        );

        setFavourites(response?.data?.favorites);

        return response.data;
      } catch (error) {
        toast(error?.response?.data?.message, {
          type: "error",
        });
      }
    }

    fetchFavourites();
  }, []);
  const pets = favourites.map((item) => item.pet);

  return (
    <>
      <Nav />

      <div className={styles.mainContainer}>
        <div className={styles.img_container}>
          <h1 className={styles.heading}>Your Favourites</h1>
        </div>

        <div className={styles.container}>
          <div className={styles.cards}>
            {favourites.map((item) => {
              return <Card pet={item.pet} key={pets._id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
