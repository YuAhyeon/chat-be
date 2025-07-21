import { Request, Response } from "express";
import { message as Message } from "../models";

export const getMessagesByRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "🚨 서버 에러", error });
  }
};
