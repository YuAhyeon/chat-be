import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";
import connectDB from "./config/db";
import chatRoutes from "./routes/chatRoutes";

// env 가져오기
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();

// express 애플리케이션 생성 (서버를 만들기 위한 핵심 객체)
const app = express();

/*
    기본적으로 express 애플리케이션 자체도 HTTP 서버 역할을 하지만 기본적으로 Websocket을 직접 지원하지 않음.
    express 자체는 HTTP 요청/응답을 처리하는 REST API 프레임워크이기 때문에 웹소켓과 같은 실시간 양방향 통신 기능을 포함하지 않음.
    웹소켓과 같이 사용하기 위해서는 HTTP 서버를 직접 생성, 웹소캣은 HTTP와 다른 프로토콜을 사용하기 때문에 일반적인 HTTP가 아닌 웹소켓을 지원할 수 있도록
    HTTP 서버를 확장해야 한다. 서버를 생성한 후, socket.io 라이브러리를 활용하여 웹소켓 서버 설정을 함.
*/

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// cors 미들웨어를 앱에 추가 (다른 도메인에서 API 요청을 보낼 수 있도록 함)
app.use(cors());

// JSON 형식 요청을 처리할 수 있도록 미들웨어 추가
app.use(express.json());
app.use("/api/chat", chatRoutes);

server.listen(PORT, () => console.log("🚀 서버 실행 중"));
