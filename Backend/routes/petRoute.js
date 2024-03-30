import express from 'express';
import { isAuthorized } from "../middlewares/auth.js"
import { getCat, getDogs, getOther, getpets, postPets, deletePet, updatePet, showPets } from "../controllers/petController.js"

const router = express.Router();

router.get("/get", getpets);
router.post("/post", isAuthorized, postPets);
router.get("/dogs", getDogs);
router.get("/cats", getCat);
router.get("/others", getOther);
router.delete("/delete/:id", isAuthorized, deletePet);
router.put("/update/:id", isAuthorized, updatePet);
router.get("/selected/:id", showPets);



export default router;