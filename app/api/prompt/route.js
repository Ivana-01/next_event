import Event from "@/models/event";
import { connectToDB } from '@/utils/db';

export const GET = async (request) => {
    try {
        await connectToDB()
        const events = await Event.find({}).populate('creator')
        return new Response(JSON.stringify(events), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all events", { status: 500 })
    }
}
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        // Find the prompt by ID and remove it
        await Event.findByIdAndRemove(params.id);
        console.log(params.id)
        return new Response("Event deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Error deleting event", { status: 500 });
    }
};