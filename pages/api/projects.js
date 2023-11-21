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
                const PAGE_SIZE = 20;
                const page = parseInt(req.query.page || "0");
                const total = await Project.countDocuments({});
                const projects = await Project.find({})
                    .limit(PAGE_SIZE)
                    .skip(PAGE_SIZE * page)
                res.json({
                    projects,
                    totalPages: Math.ceil(total / PAGE_SIZE)
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }

    if (method === 'POST') {
        try {
            const { projectID, standar, vintage, volumen, name, projectLink, tech, corsia,sdg, sdgSelected,sdgImages,sede, pais, disponible, notas, files } = req.body;
            const projectDoc = await Project.create({
                projectID, standar, vintage, volumen, name, projectLink, tech, corsia, sdg, sdgSelected,sdgImages, sede, pais, notas, files, disponible
            })
            res.json(projectDoc);
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }

    if (method === 'PUT') {
        const { projectID, standar, vintage, volumen, name, projectLink, tech, corsia, sdg, sdgSelected,sdgImages, sede, pais, disponible, notas,files, _id} = req.body;
        // los nombres de las propiedades son las mismas que las vbles, ahi ponogo lo que quiere actualizar (definimos dos parametros, el ID (identifica) y las prop que queremos cambiar)
        await Project.updateOne({ _id }, { projectID, standar, vintage, volumen, name, projectLink, tech, corsia, sdg, sdgSelected, sdgImages, sede, pais, disponible, notas, files });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Project.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}
