const { Schema, model } = require("mongoose");

const cohortSchema = new Schema({
  cohortSlug: {
    type: String,
    unique: true,
    required: true,
  },
  cohortName: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },
  startedDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  programManager: {
    type: String,
    required: true,
  },
  leadTeacher: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
  },
});

const Cohort = model("Cohort", cohortSchema);
module.exports = Cohort;
