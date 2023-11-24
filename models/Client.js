import mongoose, { Schema, models } from "mongoose";

const clientSchema = new Schema(
    {
      nombreCliente: {
        type: String,
        required: true,
        unique: true,
      },
      mainContact:{
        type: String,
      },
      contacto: {
        type: String,
      },
      paisCliente: {
        type: String,
      },
      tipoCliente: {
        type: String,
      },
      comentarios: {
        type: String,
      },

    },
    { timestamps: true }
  );

const Client = models.Client || mongoose.model("Client", clientSchema);
export default Client;