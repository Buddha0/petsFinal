import { useEffect, useState } from "react";
import DashboardNav from "../../dashboardComponents/dashboardNav/dashboardNav";
import "./dashboardPets.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

export default function DashboardPets() {
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

      <div className="dashboard_pets">
        <div className="container">
          <div className="heading">
            <h1>Your Pets</h1>
            <Link to="/create">
              <IoMdAdd className="add_btn" />
            </Link>
          </div>

          <div className="grid">
            {pets.map((pet) => {
              return (
                <>
                  <div className="card">
                    <img src={pet?.image[0].url}></img>
                    <div className="description">
                      <div>
                        <h1>{pet?.name}</h1>
                      </div>

                      <div className="buttons">
                        <MdDeleteForever
                          //   size="xl"
                          className="delete_btn"
                          onClick={() => handlePetDelete(pet._id)}
                        />
                            <Link to={`/editPets/${pet._id}`}>
                            <CiEdit className="edit_btn" />
                            </Link>
                       
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
