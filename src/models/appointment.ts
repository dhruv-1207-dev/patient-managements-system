import { ObjectId } from 'bson';

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: ObjectId,
      required: true,
    },
    doctorId: {
      type: ObjectId,
      required: true,
    },
    available: {
      type: Boolean,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

// Create the User model
const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
