import { mongooseConnect } from "@/lib/mongoose";
import Client from "@/models/Client";


export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                res.json(await Client.findOne({ _id: req.query.id }));
            }
            else {
                const clients = await Client.find({}, null, { sort: { 'nombreCliente': 1 } })
                res.json({
                    clients,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    if (method === 'POST') {
        const { nombreCliente, contacto, paisCliente, tipoCliente, comentarios, mainContact, division } = req.body;

        let clientfind = await Client.findOne({ nombreCliente });
        if (clientfind) {
            return res.status(400).send('Client name already exists');
        }
        else {
            const clienteDoc = await Client.create({
                nombreCliente,
                contacto,
                paisCliente,
                tipoCliente,
                comentarios,
                mainContact,
                division, 
            });
            res.json(clienteDoc);
        }

    }

    if (method === 'PUT') {
        const { nombreCliente, contacto, paisCliente, tipoCliente, comentarios, mainContact, _id, division} = req.body;
        // definimos dos parametros, definimos el objeto que lo identifica, como el id, y luego las propiedades del objeto que queremos actualizar
        const clienteDoc = await Client.updateOne({ _id }, {
            nombreCliente,
            contacto,
            paisCliente,
            tipoCliente,
            comentarios,
            mainContact,
            division,
        });
        res.json(clienteDoc);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Client.deleteOne({ _id: req.query?.id });
            res.json({ ok: true, message: 'Client deleted' });
        }
    }
}