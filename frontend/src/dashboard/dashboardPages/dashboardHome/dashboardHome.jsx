import { useEffect, useState } from "react";
import DashboardNav from "../../dashboardComponents/dashboardNav/dashboardNav";
import styles from "./dashboardHome.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function DashboardHome() {
  const [pets, setPets] = useState([]);
  const [cookies, __] = useCookies(["token"]);

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

  function handlePetDelete(petId) {
    axios
      .delete(`http://localhost:3000/petFinder/delete/${petId}`, {
        headers: {
          authorization: cookies.token,
        },
      })
      .then(function (response) {
        alert("Pet deleted successfully");

        const updatedPets = pets.filter((pet) => pet._id !== petId);

        setPets(updatedPets);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <DashboardNav />
      <div className={styles.pageNmae}>Manage Pets</div>
      <div className={styles.buttonsContainer}>
        <Link to="/create">
          <button className={`${styles.btn} ${styles.addBtn}`}>Add</button>
        </Link>
        <Link to="/create">
          <button className={`${styles.btn} ${styles.reqBtn}`}>
            Post request
          </button>
        </Link>
      </div>

      <hr />
      <div className={styles.cards}>
        {pets.map((pet, index) => {
          return (
            <div className={styles.card} key={index}>
              <div className={styles.flex}>
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                  className={styles.img}
                  alt="pet"
                />
                <div className={styles.description}>
                  <h1 className={styles.title}>{pet?.name}</h1>
                  <p>German</p>
                  <p>12</p>
                </div>
                <div className={styles.buttons}>
                  <Link to={`/editPets/${pet._id}`}>
                    <button className={`${styles.btn} ${styles.editBtn}`}>
                      Edit
                    </button>
                  </Link>
                  <button
                    className={`${styles.btn} ${styles.deleteBtn}`}
                    onClick={() => handlePetDelete(pet._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
