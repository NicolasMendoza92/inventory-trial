import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Operation.findOne({ _id: req.query.id }));
    }
    else {
      // con populate accedemos a las propiedades del objeto de referencia , con mongoose, es mas facil para relacionarlos
      const operationDoc = await Operation.find({}).populate('proyecto',{
        projectID: 1,
        name: 1,
        standar: 1,
        vintage: 1, 
      })
      res.json(operationDoc);
    }

  }

  if (method === 'POST') {
    const { transaction, cliente, proyecto, precio, quantity, delivery, payment, detalles } = req.body;
    const operationDoc = await Operation.create({
      transaction,
      cliente,
      proyecto,
      precio,
      quantity,
      delivery,
      payment,
      detalles,
    });
    res.json(operationDoc);
  }

  if (method === 'PUT') {
    const { transaction, cliente, proyecto, precio, quantity, delivery, payment, detalles, _id } = req.body;
    // definimos dos parametros, definimos el objeto que lo identifica, como el id, y luego las propiedades del objeto que queremos actualizar
    const operationDoc = await Operation.updateOne({ _id }, {
      transaction,
      cliente,
      proyecto,
      precio,
      quantity,
      delivery,
      payment,
      detalles,
    });
    res.json(operationDoc);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Operation.deleteOne({ _id: req.query?.id });
      res.json({ ok: true, message: 'operacion eliminada' });
    }
  }
}