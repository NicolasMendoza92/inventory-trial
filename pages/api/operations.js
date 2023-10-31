import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
  
    if (method === 'GET') {
      res.json(await Operation.find());
    }
  
    if (method === 'POST') {
      const {transaction, cliente, proyecto, precio, quantity, status, payment, notas} = req.body;
      const operationDoc = await Operation.create({
        transaction, 
        cliente, 
        proyecto, 
        precio, 
        quantity, 
        status, 
        payment, 
        notas, 
      });
      res.json(operationDoc);
    }
  
    if (method === 'PUT') {
      const {transaction, cliente, proyecto, precio, quantity, status, payment, notas,_id} = req.body;
      // definimos dos parametros, definimos el objeto que lo identifica, como el id, y luego las propiedades del objeto que queremos actualizar
      const operationDoc = await Operation.updateOne({_id},{
        transaction, 
        cliente, 
        proyecto, 
        precio, 
        quantity, 
        status, 
        payment, 
        notas, 
      });
      res.json(operationDoc);
    }
  
    if (method === 'DELETE') {
      if (req.query?.id) {
          await Operation.deleteOne({ _id: req.query?.id });
          res.json({ok: true, message:'operacion eliminada'});
      }
  }
  }