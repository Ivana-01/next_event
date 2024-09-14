import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='flex flex-col w-full items-center bg-gradient-to-b from-zinc-950 via-indigo-900 to-rose-800'>
      <h1 className='text-3xl font-bold bg-gradient-to-t from-zinc-800 to-textLogo bg-clip-text text-transparent'>
        <span className=''>{type} Event</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className='mt-5 w-1/3 flex flex-col gap-7 glassmorphism'
      >
        <label className="flex gap-3 justify-end">
          <span className='createLabel'>
            Event name:
          </span>
          <input
            value={post.event}
            onChange={(e) => setPost({ ...post, event: e.target.value })}
            required
            className='createInput'
          />
        </label>
        <label className="flex gap-3 justify-end">
          <span className='createLabel'>
            Description:
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            type='text'
            required
            className='createInput'
          />
        </label>
        <label className="flex gap-3 justify-end">
          <span className='createLabel'>
            Date:
          </span>
          <input
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            type='date'
            required
            className='createInput'
          />
        </label>
        <label className="flex gap-3 justify-end">
          <span className='createLabel'>
            Time:
          </span>
          <input
            value={post.time}
            onChange={(e) => setPost({ ...post, time: e.target.value })}
            type='time'
            required
            className='createInput'
          />
        </label>
        <label className="flex gap-3 justify-end">
          <span className='createLabel'>
            Location:
          </span>
          <input
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            type='text'
            required
            className='createInput'
          />
        </label>
        <label className="flex gap-3 justify-end">
          <span className='createLabel'>
            Image:
          </span>
          <input
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            type='text'
            placeholder="Paste URL here..."
            required
            className='createInput'
          />
        </label>
        <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm border border-2 rounded text-white hover:bg-rose-800 active:bg-rose-900 active:text-zinc-300'
        >
            {submitting ? 'Processing...' : type}
        </button>
      </form>
    </section>
  );
};

export default Form;