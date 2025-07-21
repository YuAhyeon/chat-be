import { Server, Socket } from "socket.io";
import { message as Message } from "../models";

export function setupSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`⚡ New connection: ${socket.id}`);

    socket.on("setUser", (nickname: string) => {
      console.log(`✅ User ${nickname}, Id: ${socket.id}`);
    });

    socket.on("joinRoom", ({ roomId, nickname }) => {
      socket.join(roomId);
      console.log(`🚪 ${nickname}, RoomId: ${roomId}`);

      io.to(roomId).emit("userJoined", { nickname });
    });

    socket.on("sendMessage", async ({ roomId, message, nickname }) => {
      try {
        const newMessage = await Message.create({
          roomId,
          message,
          nickname,
          userId: socket.id,
        });

        io.to(roomId).emit("newMessage", newMessage);
        console.log(message);
      } catch (e) {
        console.error("💥 메시지 저장 실패:", e);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
}
