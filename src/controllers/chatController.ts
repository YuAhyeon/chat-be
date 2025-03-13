import { Request, Response } from "express";
import Message from "../models/Message";

export const getMessages = async (res: Response) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "🚨 서버 에러" });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { username, message } = req.body;
    const newMessage = new Message({ username, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "🚨 서버 에러" });
  }
};
