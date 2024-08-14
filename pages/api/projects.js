import { mongooseConnect } from "@/lib/mongoose";
import Project from "@/models/Projects";

export default async function handle(req, res) {

    // le pedimos que traiga toda la info que solicito , con req y lo  
    const { method } = req;
    // me conecto con mongoose, para que figure en mi base de datos como una coleccion, donde pueda editar los objetos. 
    await mongooseConnect();

    if (method === 'GET') {
        // si tenemos ese especifico id del producto
        try {
            if (req.query?.id) {
                res.json(await Project.findOne({ _id: req.query.id }));
            } else {
                const projects = await Project.find({}, null, { sort: { '_id': -1 } })
                const projectsOk = projects.filter(proj => proj.status != "On hold")
                res.json({
                    projectsOk,
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }

    if (method === 'POST') {
        try {
            const {
                projectID,
                creatorUser,
                standar,
                vintage,
                volumen,
                name,
                projectLink,
                tech,
                corsia,
                sdg,
                sdgSelected,
                sdgImages,
                sede,
                pais,
                continente,
                disponible,
                stock,
                firstCPDate,
                precioVenta,
                contrato,
                mktDate,
                proveedor,
                ccb,
                ccp,
                projectType,
                misha,
                colombianTax,
                regulatedMarket,
                notas,
                precioCorp,
                floorPrice,
                mailingList,
                equipo,
                tdService,
                typeOfContract,
                actualDataVolume,
                netVolume,
                brokerList,
                sectorTD,
                status,
                stage,
                rpStartDate,
                rpEndDate,
                files,
                icroa,
                tdInfo,
                notasExtra
            } = req.body;
            const projectDoc = await Project.create({
                projectID,
                creatorUser,
                standar,
                vintage,
                volumen,
                name,
                projectLink,
                tech,
                corsia,
                sdg,
                sdgSelected,
                sdgImages,
                sede,
                pais,
                continente,
                notas,
                files,
                disponible,
                stock,
                firstCPDate,
                precioVenta,
                contrato,
                mktDate,
                precioCorp,
                floorPrice,
                ccb,
                ccp,
                projectType,
                misha,
                mailingList,
                equipo,
                tdService,
                typeOfContract,
                actualDataVolume,
                netVolume,
                brokerList,
                sectorTD,
                status,
                stage,
                rpStartDate,
                rpEndDate,
                colombianTax,
                regulatedMarket,
                icroa,
                proveedor,
                notasExtra,
                tdInfo,
            })
            res.json(projectDoc);
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }

    if (method === 'PUT') {
        const {
            projectID,
            creatorUser,
            standar,
            vintage,
            volumen,
            name,
            projectLink,
            tech,
            corsia,
            sdg,
            sdgSelected,
            sdgImages,
            sede,
            pais,
            continente,
            disponible,
            stock,
            firstCPDate,
            precioVenta,
            contrato,
            mktDate,
            proveedor,
            ccb,
            ccp,
            projectType,
            misha,
            mailingList,
            equipo,
            tdService,
            typeOfContract,
            actualDataVolume,
            netVolume,
            brokerList,
            sectorTD,
            status,
            stage,
            rpStartDate,
            rpEndDate,
            colombianTax,
            regulatedMarket,
            precioCorp,
            floorPrice,
            purchasePrice,
            notas,
            files,
            icroa,
            notasExtra,
            tdInfo,
            _id
        } = req.body;
        // los nombres de las propiedades son las mismas que las vbles, ahi ponogo lo que quiere actualizar (definimos dos parametros, el ID (identifica) y las prop que queremos cambiar)
        await Project.updateOne({ _id }, {
            projectID,
            creatorUser,
            standar,
            vintage,
            volumen,
            name,
            projectLink,
            tech,
            corsia,
            sdg,
            sdgSelected,
            sdgImages,
            sede,
            pais,
            continente,
            disponible,
            stock,
            firstCPDate,
            precioVenta,
            precioCorp,
            floorPrice,
            purchasePrice,
            contrato,
            mktDate,
            proveedor,
            ccb,
            ccp,
            projectType,
            misha,
            mailingList,
            equipo,
            tdService,
            typeOfContract,
            actualDataVolume,
            netVolume,
            brokerList,
            sectorTD,
            status,
            stage,
            rpStartDate,
            rpEndDate,
            colombianTax,
            regulatedMarket,
            notas,
            icroa,
            notasExtra,
            tdInfo,
            files
        });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Project.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}
