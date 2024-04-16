import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './editPets.module.css';
import DashboardNav from '../../dashboardComponents/dashboardNav/dashboardNav';

function EditPets() {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    category: '',
    description: '',
    breed: '',
    gender: '',
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/petFinder/selected/${id}`)
      .then((response) => {
        setFormData(response?.data?.getPetData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    const formDataToUpdate = new FormData();

    formDataToUpdate.append("name", formData.name);
    formDataToUpdate.append("category", formData.category);
    formDataToUpdate.append("age", formData.age);
    formDataToUpdate.append("description", formData.description);
    formDataToUpdate.append("breed", formData.breed);
    formDataToUpdate.append("gender", formData.gender);

    images.forEach((image, index) => {
      formDataToUpdate.append(`images`, image);
    });

    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:3000/petFinder/update/${id}`,
        formDataToUpdate,
        {
          headers: {
            authorization: cookies.token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success === true) {
        toast.success('Pet details updated successfully');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update pet details. Please try again.');
      setIsLoading(false);
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
                placeholder="Breed"
                name="breed"
                value={formData.breed}
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
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

            <div className={styles.inputDiv}>
              <input
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
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPets;
