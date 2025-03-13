import mongoose from "mongoose";

type ChatMessage = {
  username: string;
  message: string;
  timestemp: Date;
};

const MessageSchema = new mongoose.Schema<ChatMessage>({
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestemp: { type: Date, default: Date.now },
});

const Message = mongoose.model<ChatMessage>("Message", MessageSchema);

export default Message;
