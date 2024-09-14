import Event from "@/models/event";
import { connectToDB } from "@/utils/db";

export const POST = async (request) => {
    const { userId, event, date, time, location, description, image } = await request.json();
    try {
        await connectToDB();
        const newEvent = new Event({ creator: userId, event, date, time, location, description, image });
        await newEvent.save();
        return new Response(JSON.stringify(newEvent), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new event", { status: 500 });
    }
}