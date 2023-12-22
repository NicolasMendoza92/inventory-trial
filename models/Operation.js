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
    projectData:{
        idProject: {
            type: String,
        },
        standardOp: {
            type: String,
        },
        nameProject: {
            type: String,
        },
        vintageOp: {
            type: String,
        },
        countryProject: {
            type: String,
        },
    },
    precio: {
        type: Number,
    },
    versusPrice: {
        type: Number,
    },
    quantity: {
        type: Number,
        require: true,
    },
    delivery:{
        type: String,
    },
    deliveryDate:{
        type:Date,
    },
    payment:{
        type: String,
    },
    paymentDate:{
        type:Date,
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