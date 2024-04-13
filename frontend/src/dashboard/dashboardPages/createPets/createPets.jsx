import { useState } from "react";
import axios from "axios";

import styles from "./createPets.module.css";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../../../components/nav/nav";

export default function CreatePets() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [images, setImages] = useState([]);
  const [cookies, __] = useCookies("token");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log("Selected Images:", files);
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("age", age);
    formData.append("description", description);
    formData.append("breed", breed);
    formData.append("gender", gender);

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/petFinder/post",
        formData,
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );

      if (response.data.success === true) {
        toast("New Pet created successfully", {
          type: "success",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer bodyClassName="toastBody" />
      <div className={styles.formSection}>
        <form id="myForm" className={styles.myForm} onSubmit={handleSubmit}>
          <img src="/new.GIF" className={styles.gif} />
          <p className={styles.message}>Add Pets</p>
          <div className={styles.formPadding}>
            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Pet Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Catgory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles.inputDiv}>
              <textarea
                type="text"
                placeholder="About pet"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="number"
                placeholder="Pet Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
              />
            </div>
          </div>

          <div className={styles.btnDiv}>
            <button
              className={`${styles.btn} ${styles.btnSend}`}
              type="submit"
              id="submit_btn"
            >
              {isLoading ? "Loading..." : "Add Pet"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
