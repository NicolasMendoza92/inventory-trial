import { mongooseConnect } from "@/lib/mongoose";
import Event from "@/models/Event";


export default async function handle (req,res){
    await mongooseConnect();

    if(req.method === 'POST'){
        const {title, start, end} = req.body;
        res.json(await Event.create({title, start, end}));
    }

    if(req.method === 'GET'){
        try {
            if (req.query?.id) {
                res.json(await Event.findOne({ _id: req.query.id }));
            }
            else {
                const calendar = await Event.find({}, null, { sort: { 'start': 1 } })
                res.json({
                    calendar,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (req.method === 'DELETE') {
        if (req.query?.id) {
            await Event.deleteOne({ _id: req.query?.id });
            res.json({ ok: true, message: 'Event deleted' });
        }
    }
}