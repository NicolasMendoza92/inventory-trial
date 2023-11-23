import mongoose, { Schema, model, models } from "mongoose";

// creamos los modelos, para la conexion con la base de datos Mongoose-. 
const reservationSchema = new Schema({
    team: {
        type: String,
    },
    reserveOwn: {
        type: String,
    },
    customer: {
        type: String,
        required: true,
    },
    projectRelated: { type: mongoose.Schema.Types.ObjectId, ref: "Project"},
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        require: true,
    },
    status:{
        type: String,
    },
    expiration:{
        type: Date,
    },
    comments:{
        type: String,
    } ,  
},
    {
        timestamps: true,
    }
);

const Reservation = models.Reservation || mongoose.model("Reservation", reservationSchema);
export default Reservation;