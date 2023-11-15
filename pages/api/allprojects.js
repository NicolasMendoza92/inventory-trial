import { mongooseConnect } from "@/lib/mongoose";
import Project from "@/models/Projects";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        try {
            const projects = await Project.find({}, null, { sort: { '_id': -1 } })
            res.json({
                projects,
            })
        }
        catch (error) {
            console.log(error)
        }
    }

}