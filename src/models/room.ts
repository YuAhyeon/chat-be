import mongoose, { Document, Model } from "mongoose";

interface Participant {
  nickname: string;
  socketId?: string;
}

export interface RoomDocument extends Document {
  name: string;
  participants: Participant[];
  createdAt: Date;
}

const roomSchema = new mongoose.Schema<RoomDocument>({
  name: { type: String, unique: true, required: true },
  participants: [
    {
      nickname: { type: String, required: true },
      socketId: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Room: Model<RoomDocument> =
  mongoose.models.Room || mongoose.model<RoomDocument>("Room", roomSchema);

export default Room;
