import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    try {
      if (req.query?.id) {
        res.json(await Operation.findOne({ _id: req.query.id }));
      }
      else {
        const PAGE_SIZE = 20;
        const page = parseInt(req.query.page || "0");
        const total = await Operation.countDocuments({});
        // con populate accedemos a las propiedades del objeto de referencia , con mongoose, es mas facil para relacionarlos
        const operationDoc = await Operation.find({}, null, { sort: { '_id': -1 } })
          .populate('proyecto', {
            projectID: 1,
            name: 1,
            standar: 1,
            vintage: 1,
            pais: 1,
          })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page)
        res.json({
          operationDoc,
          totalPages: Math.ceil(total / PAGE_SIZE)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }


  if (method === 'POST') {
    const { transaction, equipo, cliente, proyecto, precio, quantity, delivery, deliveryDate, payment, paymentDate, detalles, archivos, projectData:{idProject, standardOp, vintageOp, nameProject, countryProject}} = req.body;
    const operationDoc = await Operation.create({
      transaction,
      equipo,
      cliente,
      proyecto,
      precio,
      quantity,
      delivery,
      deliveryDate,
      payment,
      paymentDate,
      detalles,
      projectData:{idProject, standardOp, vintageOp, nameProject, countryProject},
      archivos
    });
    res.json(operationDoc);
  }

  if (method === 'PUT') {
    const { transaction, equipo, cliente, proyecto, precio, quantity, delivery, deliveryDate, payment, paymentDate, detalles, archivos, _id } = req.body;
    // definimos dos parametros, definimos el objeto que lo identifica, como el id, y luego las propiedades del objeto que queremos actualizar
    const operationDoc = await Operation.updateOne({ _id }, {
      transaction,
      equipo,
      cliente,
      proyecto,
      precio,
      quantity,
      delivery,
      deliveryDate,
      payment,
      paymentDate,
      detalles,
      archivos
    });
    res.json(operationDoc);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Operation.deleteOne({ _id: req.query?.id });
      res.json({ ok: true, message: 'operation deleted' });
    }
  }
}