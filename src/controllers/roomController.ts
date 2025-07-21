import { Request, Response, RequestHandler } from "express";
import { room as Room } from "../models";

export const createRoom: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { roomName, nickname } = req.body;

  if (!roomName || !nickname) {
    res
      .status(400)
      .json({ message: "채팅방 이름과 닉네임 설정은 필수입니다." });
    return;
  }

  try {
    const existingRoom = await Room.findOne({ name: roomName });
    if (existingRoom) {
      res.status(409).json({ message: "이미 존재하는 방입니다." });
      return;
    }

    const newRoom = await Room.create({
      name: roomName,
      participants: [{ nickname }],
    });

    res
      .status(201)
      .json({ room: newRoom, message: "방이 성공적으로 생성되었습니다." });
  } catch (err) {
    console.error("💥 방 생성 실패:", err);
    res.status(500).json({ message: "방 생성 중 서버 오류가 발생했습니다." });
  }
};

export const getAllRooms = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cursor, limit } = req.query;
  const pageSize = parseInt(limit as string) || 10;

  try {
    const query = cursor ? { _id: { $lt: cursor } } : {};
    const rooms = await Room.find(query).sort({ _id: -1 }).limit(pageSize);
    const nextCursor = rooms.length > 0 ? rooms[rooms.length - 1]._id : null;

    res.status(200).json({ rooms, nextCursor });
  } catch (err) {
    console.error("룸 목록 조회 실패:", err);
    res.status(500).json({ message: "룸 목록 조회 실패" });
  }
};

export const getRoomById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404).json({ message: "채팅방을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json(room);
  } catch (err) {
    console.error("채팅방 조회 실패:", err);
    res.status(500).json({ message: "서버 에러" });
  }
};
