import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './editPets.module.css'; 
import DashboardNav from '../../dashboardComponents/dashboardNav/dashboardNav';

function EditPets() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    category: '',
    description: '',
    gender: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/petFinder/selected/${id}`)
      .then(function (response) {
        setPet(response?.data?.getPetData);
        setFormData({
          name: response?.data?.getPetData.name,
          age: response?.data?.getPetData.age,
          category: response?.data?.getPetData.category,
          description: response?.data?.getPetData.description,
          gender: response?.data?.getPetData.gender,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({ url: event.target.result });
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((images) => {
        setPet({ ...pet, image: images });
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
  
      formDataToSend.append('name', formData.name);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('gender', formData.gender);
  
      if (pet?.image) {
        pet.image.forEach((img, index) => {
          console.log(`Image URL ${index}:`, img.url);  
          formDataToSend.append(`images[${index}]`, img.url);
        });
      }
  
      
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ', ' + pair[1]); 
      }
  
      const response = await axios.put(
        `http://localhost:3000/petFinder/update/${id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: cookies.token,
          },
        }
      );
  
      toast(response?.data?.message, {
        type: 'success',
      });
  
      console.log(response);
    } catch (error) {
      toast(error?.response?.data?.message, {
        type: 'error',
      });
    }
  };
  
  
  
  

  return (
    <>
      <DashboardNav />
      <div className={styles.formSection}>
        <form id="myForm" className={styles.myForm} onSubmit={formSubmit}>
          <ToastContainer bodyClassName="toastBody" />
          <img src="/dribbblepets_v01.gif" className={styles.gif} />
          <p className={styles.message}>Edit Pets?</p>
          <div className={styles.formPadding}>
            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Pet Name"
                name="name"
                value={formData.name}
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={formData.age}
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={formData.category}
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputDiv}>
              <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                autoComplete="off"
                required
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Gender"
                name="gender"
                value={formData.gender}
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.pet_images_container}>
              <div className={styles.text_container}>
                <p className={styles.text}>Upload pet Images (Multiple Images)</p>
              </div>
              <div className={styles.cards}>
                <div className={styles.imageContainer}>
                  {
                    pet?.image?.map((img, index) => (
                      <img key={index} src={img.url} className={styles.img} alt={`Pet ${index + 1}`} />
                    ))
                  }
                  <div className={styles.imageActions}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className={styles.uploadInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnDiv}>
            <button
              className={`${styles.btn} ${styles.btnSend}`}
              type="submit"
              id="submit_btn"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPets;
