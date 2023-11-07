import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        try {
            const allOperations = await Operation.find({})
                .populate('proyecto', {
                    projectID: 1,
                    name: 1,
                    standar: 1,
                    vintage: 1,
                })
            res.json({
                allOperations,
            })
        }
        catch (error) {
            console.log(error)
        }
    }

}