

import { useState } from "react";
import axios from "axios";
import "../../index.css";
import styles from "./createPets.module.css";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePets() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [images, setImages] = useState([]);
    const [cookies,__ ]= useCookies("token")


   
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        console.log("Selected Images:", files);
        setImages(files);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        // Append form fields
        formData.append('name', name);
        formData.append('category', category);
        formData.append('age', age);
        formData.append('description', description);
        formData.append('breed', breed);
        formData.append('gender', gender);
   
    
        // Append images
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });
    
     
        try {
            const response = await axios.post('http://localhost:3000/petFinder/post', formData, {
             
            headers: {
                // Set Authorization header with the token value
                authorization : cookies.token
              }
            
            });
    
           if(response.data.success === true){
            toast("New Pet created successfully", {
                type:"success"
            })
           }
  
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    return (
        <>
        <ToastContainer/>
            <div className={styles.form_container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className={styles.title}>Add Pets</p>
                    <p className={styles.message}>Add Pets</p>

                    {/* Input fields for pet details */}
                    <label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <span>Pet Name</span>
                    </label>

                    {/* Other input fields for pet details */}

                    <label>
                        <input
                            className={styles.input}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            multiple
                        />
                        <span>Upload Images</span>
                    </label>

                    <label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder=""
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        <span>Gender</span>
                    </label>

                    <label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder=""
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            required
                        />
                        <span>Breed</span>
                    </label>



                    <label>
                        <input
                            className={styles.input}
                            type="number"
                            placeholder=""
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        <span>Age</span>
                    </label>

                    <label>
                        <textarea
                            placeholder="Pet Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>

                    <label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder=""
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                        <span>Category</span>
                    </label>

                    <button className={styles.submit} type="submit">
                        Add Pet
                    </button>
                </form>
            </div>
        </>
    );
}