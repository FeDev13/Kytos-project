const { Schema, model } = require("mongoose");

const PatientSchema = new Schema(
  {
    dni: { type: Number, required: true },
    name: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    /* image: {
    url: String,
    public_id: String,
  }, */
    diagnostic: { type: String, trim: true, required: true },
    symptoms: [{ type: String }],
    treatment: [{ type: String }],
    appointment: { type: String },
    medicalEntity: { type: String },
    attendingProfessional: { type: String },
    professional: {
      type: Schema.Types.ObjectId,
      ref: "Professional",
      required: true,
    },
  },
  { timestamps: true }
);

const PatientModel = model("Patient", PatientSchema);
module.exports = PatientModel;
