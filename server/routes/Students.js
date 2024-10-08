import express from "express";
import {addStudent , GetData ,addAttendance} from '../controller/Students.js'

const router = express.Router();

router.post("/add-student",addStudent);
router.get("/GetData",GetData);
router.post("/add-attentance", addAttendance)

export default router;
