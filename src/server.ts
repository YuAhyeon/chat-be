import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { roomRoutes } from "./routes";

import { Server } from "socket.io";
import { setupSocket } from "./socket";

/*
    기본적으로 express 애플리케이션 자체도 HTTP 서버 역할을 하지만 기본적으로 Websocket을 직접 지원하지 않음.
    express 자체는 HTTP 요청/응답을 처리하는 REST API 프레임워크이기 때문에 웹소켓과 같은 실시간 양방향 통신 기능을 포함하지 않음.
    웹소켓과 같이 사용하기 위해서는 HTTP 서버를 직접 생성, 웹소캣은 HTTP와 다른 프로토콜을 사용하기 때문에 일반적인 HTTP가 아닌 웹소켓을 지원할 수 있도록
    HTTP 서버를 확장해야 함. 서버를 생성한 후, socket.io 라이브러리를 활용하여 웹소켓 서버 설정
*/

dotenv.config(); // env 가져오기
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors()); // cors 미들웨어 추가
app.use(express.json()); // JSON 형식 요청 처리
app.use("/api/rooms", roomRoutes);

setupSocket(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log("🚀 서버 실행 중"));
