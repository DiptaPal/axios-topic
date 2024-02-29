/* eslint-disable react/prop-types */
import { useState } from "react";

export default function AddPost({ onAddPost }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            body,
        };

        onAddPost(newPost);

        // reset form
        setTitle("");
        setBody("");
    };

    return (
        <div>
            <h2>Add new Post</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <input
                        type="text"
                        placeholder="Post title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="Post body"
                        value={body}
                        required
                        onChange={(e) => setBody(e.target.value)}
                    />
                </p>
                <p>
                    <button type="submit">Add Post</button>
                </p>
            </form>
        </div>
    );
}
