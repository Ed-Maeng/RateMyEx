import mongoose from "mongoose";

const DormSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
  },
  { timestamps: true }
);

// Unique Index (School Name, Dorm Name)
DormSchema.index({ "schoolName": 1, "name": 1}, { "unique": true });

const Dorm = mongoose.model("Dorm", DormSchema);
export default Dorm;
