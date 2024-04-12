import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
export default function EditPets() {
  const { id } = useParams();
  const [cookies, __] = useCookies(["token"]);

  console.log(cookies);
  useEffect(() => {
    if (cookies.token) {
      axios
        .put(`http://localhost:3000/petFinder/update/${id}`, {
          headers: {
            Authorization: cookies.token,
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id, cookies.token]);

  return <></>;
}
