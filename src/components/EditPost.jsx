import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function EditPost({ post, onEditPost }) {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    useEffect(() => {
        // Update title and body when post prop changes
        setTitle(post.title);
        setBody(post.body);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            id: post.id,
            title,
            body,
        };
        onEditPost(updatedPost);

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
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="Post body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </p>
                <p>
                    <button type="submit">Update Post</button>
                </p>
            </form>
        </div>
    );
}
