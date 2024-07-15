import mongoose, { Schema, model, models } from "mongoose";

// creamos los modelos, para la conexion con la base de datos Mongoose-. 
const projectSchema = new Schema({
    creatorUser: {
        type: String,
    },
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
    pais: {
        type: String,
        require: true,
    },
    continente: {
        type: String,
    },
    corsia: {
        type: String,
    },
    ccb: {
        type: String,
    },
    ccp: {
        type: String,
    },
    projectType: {
        type: String,
    },
    colombianTax: {
        type: String,
    },
    regulatedMarket: {
        type: String,
    },
    misha: {
        type: String,
    },
    mailingList: {
        type: String,
    },
    brokerList: {
        type: String,
    },
    sdg: {
        type: String,
    },
    sdgSelected: [{ type: String }],
    sdgImages: [{ type: String }],
    sede: {
        type: String,
    },
    contrato: {
        type: String,
    },
    equipo: {
        type: String,
    },
    // TD fields
    tdService: {
        type: String,
    },
    typeOfContract: {
        type: String,
    },
    sectorTD: {
        type: String,
    },
    status: {
        type: String,
    },
    stage: {
        type: String,
    },
    rpStartDate: {
        type: String,
    },
    rpEndDate: {
        type: String,
    },
    actualDataVolume: {
        type: Number,
    },
    netVolume: {
        type: Number,
    },
    mktDate: {
        type: Date,
    },
    // Cambia a financial partner cuando se selecciona TD
    proveedor: {
        type: String,
    },
    precioVenta: {
        type: Number,
    },
    precioCorp: {
        type: Number,
    },
    floorPrice: {
        type: Number,
    },
    purchasePrice: {
        type: Number,
    },
    projectLink: {
        type: String,
    },
    firstCPDate: {
        type: String,
    },
    disponible: {
        type: String,
    },
    stock: {
        type: String,
    },
    notas: {
        type: String,
    },
    notasExtra: {
        type: String,
    },
    tdInfo: {
        type: String,
    },
    files: [{ type: String }],
},
    {
        timestamps: true,
    }
);

const Project = models.Project || mongoose.model("Project", projectSchema);
export default Project;