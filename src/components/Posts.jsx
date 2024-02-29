/* eslint-disable react/prop-types */
export default function Posts({ posts, onDeletePost, onEditClick }) {
    return (
        <div>
            <h2>All Posts</h2>
            <div>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <span>{post.id}.</span>
                            <span> {post.title}</span>
                            <span>
                                <span
                                    style={{
                                        cursor: "pointer",
                                        marginRight: "10px",
                                    }}
                                    onClick={() => onDeletePost(post.id)}
                                >
                                    ❌
                                </span>

                                <span
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => onEditClick(post)}
                                >
                                    ✏️
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
