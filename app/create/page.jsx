"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Create from "@/components/Create";

const createNewEvent = () => {

  const router = useRouter();
  const { data: session } = useSession();
  const [sub, setSub] = useState(false);
  const [post, setPost] = useState('');

  const createEvent = async (e) => {
    e.preventDefault();
    setSub(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          event: post.event,
          userId: session?.user.id,
          date: post.date,
          time: post.time,
          location: post.location,
          description: post.description,
          image: post.image
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSub(false);
    }
  };


  return (
    <Create
      type='Create'
      post={post}
      setPost={setPost}
      submitting={sub}
      handleSubmit={createEvent}
    />
  )
}

export default createNewEvent