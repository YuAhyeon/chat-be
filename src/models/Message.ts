import mongoose, { Document, Model, Schema } from "mongoose";

export interface MessageDocument extends Document {
  roomId: string;
  userId: string;
  nickname: string;
  message: string;
  timestamp: Date;
}

const messageSchema = new Schema<MessageDocument>({
  roomId: { type: String, required: true },
  userId: { type: String, required: true },
  nickname: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message: Model<MessageDocument> =
  mongoose.models.Message ||
  mongoose.model<MessageDocument>("Message", messageSchema);

export default Message;
