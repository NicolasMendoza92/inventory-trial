import mongoose, { Schema, model, models } from "mongoose";

// creamos los modelos, para la conexion con la base de datos Mongoose-. 
const projectSchema = new Schema({
    projectID: {
        type: String,
        required: true,
    },
    standar: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    vintage: {
        type: String,
        required: true,
    },
    volumen: {
        type: Number,
        require: true,
    },
    tech: {
        type: String,
        require: true,
    },
    pais:{
        type: String,
        require: true,
    },
    corsia:{
        type: String,
    },
    sdg:{
        type: String,
    },
    sede:{
        type: String,
    },
    sdgSelected: [{ type: String }], 
    sdgImages: [{ type: String }], 
    projectLink:{
        type: String,
    },
    disponible:{
        type: String,
    },
    notas:{
        type: String,
    } ,  
    files: [{ type: String }], 
},
    {
        timestamps: true,
    }
);

const Project = models.Project || mongoose.model("Project", projectSchema);
export default Project;