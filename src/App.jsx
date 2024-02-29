import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/api";
import AddPost from "./components/AddPost.jsx";
import EditPost from "./components/EditPost.jsx";
import Posts from "./components/Posts.jsx";

function App() {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const response = await api.get("/posts");
                if (response && response.data) {
                    setPosts(response.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleAddPost = async (newPost) => {
        try {
            setLoading(true);
            const id = posts.length
                ? Number(posts[posts.length - 1].id) + 1
                : 1;

            const finalPost = {
                id: id.toString(),
                ...newPost,
            };

            const response = await api.post("/posts", finalPost);

            if (response && response.data) {
                console.log("Post added successfully");
            } else {
                console.log("Failed to add post");
            }

            setPosts([...posts, response.data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        if (confirm("Are you sure you want to delete this post?")) {
            try {
                setLoading(true);
                const response = await api.delete(`/posts/${postId}`);
                if (response && response.data) {
                    const newPosts = posts.filter((post) => post.id !== postId);
                    setPosts(newPosts);
                    console.log("Post deleted successfully");
                } else {
                    console.log("Failed to delete post");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            console.log("Your chose not to delete the post!");
        }
    };

    const handleEditPost = async (updatedPost) => {
        try {
            const response = await api.patch(
                `/posts/${updatedPost.id}`,
                updatedPost
            );
            if (response && response.data) {
                console.log("Post updated successfully");
            } else {
                console.log("Failed to update post");
            }

            const updatedPosts = posts.map((post) =>
                post.id === response.data.id ? response.data : post
            );
            setPosts(updatedPosts);
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            <div>
                <h1>API Request with Axios</h1>
                <hr />

                <div>
                    {loading && <div>Loading...</div>}
                    <Posts
                        posts={posts}
                        onDeletePost={handleDeletePost}
                        onEditClick={setPost}
                    />
                    <hr />
                    {!post ? (
                        <AddPost onAddPost={handleAddPost} />
                    ) : (
                        <EditPost post={post} onEditPost={handleEditPost} />
                    )}

                    {error && (
                        <div>
                            <hr />
                            <div className="error">{error}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
