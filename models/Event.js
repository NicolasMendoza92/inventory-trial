const { model, models, Schema } = require("mongoose");

const EventSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
}
);

const Event = models?.Event || model('Event', EventSchema);
export default Event;