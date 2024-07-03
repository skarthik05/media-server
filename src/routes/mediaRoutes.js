import { Router } from "express";
import { streamMedia } from "../controllers/mediaController.js";

const router = Router();

router.get("/media/:filename", streamMedia);

export default router;
