import express from "express";
import {
  getAllRooms,
  getRoomById,
  createRoom,
} from "../controllers/roomController";
import { getMessagesByRoom } from "../controllers/messageController";

const router = express.Router();

router.post("/", createRoom);

router.get("/", getAllRooms);
router.get("/:roomId", getRoomById);
router.get("/:roomId/messages", getMessagesByRoom);

export default router;
