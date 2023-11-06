import { mongooseConnect } from "@/lib/mongoose";
import Reservation from "@/models/Reservation";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                res.json(await Reservation.findOne({ _id: req.query.id }));
            }
            else {
                const PAGE_SIZE = 20;
                const page = parseInt(req.query.page || "0");
                const total = await Reservation.countDocuments({});
                // con populate accedemos a las propiedades del objeto de referencia , con mongoose, es mas facil para relacionarlos
                const reservationDoc = await Reservation.find({})
                    .populate('projectRelated', {
                        projectID: 1,
                        name: 1,
                        standar: 1,
                        vintage: 1,
                    })
                    .limit(PAGE_SIZE)
                    .skip(PAGE_SIZE * page)
                res.json({
                    reservationDoc,
                    totalPages: Math.ceil(total / PAGE_SIZE)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (method === 'POST') {
        const { customer, projectRelated, price, quantity, expiration, status, comments } = req.body;
        const reservationDoc = await Reservation.create({
            customer,
            projectRelated,
            price,
            expiration,
            quantity,
            status,
            comments,
        });
        res.json(reservationDoc);
    }

    if (method === 'PUT') {
        const { customer, projectRelated, price, quantity, expiration, status, comments, _id } = req.body;
        // definimos dos parametros, definimos el objeto que lo identifica, como el id, y luego las propiedades del objeto que queremos actualizar
        const reservationDoc = await Reservation.updateOne({ _id }, {
            customer,
            projectRelated,
            price,
            expiration,
            quantity,
            status,
            comments,
        });
        res.json(reservationDoc);
    }

    if (method === 'DELETE') {
        try {
            if (req.query?.id) {
                await Reservation.deleteOne({ _id: req.query?.id });
                res.json({ ok: true, message: 'reservation deleted' });
            }
        } catch (error) {
            res.status(400).send('Hubo un error en la conexion a la base de datos');
        }

    }
}