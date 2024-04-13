import styles from "./allPets.module.css";
import Nav from "../../components/nav/nav";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import { AiOutlineSearch } from "react-icons/ai";

import Card from "../../components/card/card";

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/petFinder/get")
      .then(function (response) {
        setPets(response.data.getallpets);
        setFilteredPets(response.data.getallpets);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = pets.filter((pet) => {
      return pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredPets(filtered);
  }, [searchQuery, pets]);

  const uniqueCategories = ["All", ...new Set(pets.map((pet) => pet.category))];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update the selected category
    if (category === "All") {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter((pet) => pet.category === category);
      setFilteredPets(filtered);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.img_container}>
          <h1 className={styles.heading}>Available Pets</h1>
        </div>

        <div className={styles.container}>
          <div className={styles.categories}>
            <div className={styles.cat}>
              <h2 className={styles.smallTitle}>Pet Categories</h2>
              <div className={styles.box_container}>
                {uniqueCategories.map((category) => (
                  <div
                    className={`${styles.box} ${
                      selectedCategory === category ? styles.selected : ""
                    }`}
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h2>{category}</h2>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Search by breed"
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <AiOutlineSearch size={20} className={styles.searchIcon} />
            </div>
          </div>

          <div className={styles.cards}>
            {filteredPets.map((pets) => {
              return <Card pet={pets} key={pets._id} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
