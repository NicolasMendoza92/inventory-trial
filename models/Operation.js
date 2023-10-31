import mongoose, { Schema, model, models } from "mongoose";

// creamos los modelos, para la conexion con la base de datos Mongoose-. 
const operationSchema = new Schema({
    transaction: {
        type: String,
        required: true,
    },
    cliente: {
        type: String,
        required: true,
    },
    proyecto: { type: mongoose.Schema.Types.ObjectId, ref: "Project"},
    precio: {
        type: String,
    },
    quantity: {
        type: Number,
        require: true,
    },
    status:{
        type: String,
    },
    payment:{
        type: String,
    },
    notas:{
        type: String,
    } ,  
},
    {
        timestamps: true,
    }
);

const Operation = models.Operation || mongoose.model("Operation", operationSchema);
export default Operation;