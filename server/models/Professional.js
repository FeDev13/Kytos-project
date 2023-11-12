const { Schema, model } = require("mongoose");

const ProfessionalSchema = new Schema({
  name: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  license: { type: Number, required: true, trim: true, unique: true },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient", required: true }],
  mostUrgentPatients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
});

const ProfessionalModel = model("Professional", ProfessionalSchema);
module.exports = ProfessionalModel;
