import mongoose, { Schema, model, models } from "mongoose";

// creamos los modelos, para la conexion con la base de datos Mongoose-. 
const operationSchema = new Schema({
    transaction: {
        type: String,
        required: true,
    },
    equipo: {
        type: String,
    },
    cliente: {
        type: String,
        required: true,
    },
    proyecto: { type: mongoose.Schema.Types.ObjectId, ref: "Project"},
    precio: {
        type: Number,
    },
    quantity: {
        type: Number,
        require: true,
    },
    delivery:{
        type: String,
    },
    payment:{
        type: String,
    },
    detalles:{
        type: String,
    } ,  
    archivos: [{ type: String }], 
},
    {
        timestamps: true,
    }
);

const Operation = models.Operation || mongoose.model("Operation", operationSchema);
export default Operation;