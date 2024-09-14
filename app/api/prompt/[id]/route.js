import Event from "@/models/event";
import { connectToDB } from "@/utils/db";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const event = await Event.findById(params.id).populate("creator")
        if (!event) return new Response("Event Not Found", { status: 404 });
        return new Response(JSON.stringify(event), { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { event, date, time, location, description, image } = await request.json();
    try {
        await connectToDB();
        const existingEvent = await Event.findById(params.id);
        if (!existingEvent) {
            return new Response("Event not found", { status: 404 });
        }
        existingEvent.event = event;
        existingEvent.date = date;
        existingEvent.time = time;
        existingEvent.location = location;
        existingEvent.description = description;
        existingEvent.image = image;
        
        await existingEvent.save();
        return new Response("Successfully updated the Event", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Event", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        // Find the prompt by ID and remove it
        await Event.findByIdAndRemove(params.id);
        return new Response("Event deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Error deleting event", { status: 500 });
    }
};