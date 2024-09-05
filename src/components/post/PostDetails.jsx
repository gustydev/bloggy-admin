import PropTypes from 'prop-types';
import styles from './post.module.css';
import { useState } from 'react';

export default function PostDetails( { post, handleUpdate, handleDelete }) {
    const [editing, setEditing] = useState(false);
    const [edited, setEdited] = useState(false);
    const [postData, setPostData] = useState(post);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
          ...prev,
          [name]: value,
        }));
        setEdited(true)
    };

    const handleSave = () => {
        handleUpdate(postData);
        setEditing(false);
        setEdited(false)
    };

    return (
        <div className={styles.post}>
            {editing ? (
                <>
                <h2>editing post</h2>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={postData.title}
                    onChange={handleInputChange}
                    placeholder='title (required)'
                    maxLength='150'
                />
                </>
            ) : (
                <h2 className={styles.title}>{postData.title}</h2>
            )}

            <div className={styles.postActions}>
                {(edited && !editing) && (
                    <>
                    <div>
                        <strong>pending changes!</strong>
                    </div>
                    <button onClick={handleSave}>save changes</button>
                    </>
                )}
                <button onClick={() => setEditing(!editing)}>
                    {editing ? "finish editing" : "edit post"}
                </button>
                {(!edited && !editing) && (
                    <>
                    <button onClick={() => handleDelete(post.id)}>
                        delete post
                    </button>
                    <button
                        onClick={() =>
                            handleUpdate({ ...post, published: !post.published })
                    }>
                        {post.published ? "unpublish" : "publish"}
                    </button>
                    </>
                )}
                
            </div>

            {editing ? (
                <input
                    type="text"
                    name="subtitle"
                    id="subtitle"
                    value={postData.subtitle}
                    onChange={handleInputChange}
                    placeholder="subtitle"
                    maxLength='100'
                />
            ) : postData.subtitle ? (
                <h3 className={styles.subtitle}>{postData.subtitle}</h3>
            ) : (
                null
            )}

            {editing ? (
                <textarea
                    name="content"
                    id="content"
                    value={postData.content}
                    onChange={handleInputChange}
                    placeholder="post content (required)"
                    className={styles.contentInput}
                    maxLength='10000'
                ></textarea>
            ) : (
                <div className={styles.content}>{postData.content}</div>
            )}

            <div className={styles.info}>
                <div className={styles.authorAndCreationDate}>
                    posted by <strong>{post.author.name}</strong> on {new Date(post.createdAt).toLocaleString()}
                </div>
                {post.updatedAt !== post.createdAt && (
                <div className={styles.updatedAt}>
                    updated {new Date(post.updatedAt).toLocaleString()}
                </div>
                )}
                <div>
                    status: <strong>{post.published ? 'published' : "unpublished"}</strong>
                </div>
            </div>
        </div>
    )   
}

PostDetails.propTypes = {
    post: PropTypes.object,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func
}