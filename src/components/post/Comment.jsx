import PropTypes from 'prop-types';
import styles from './post.module.css'
import { useState } from 'react';

export default function Comment( { comment, handleDelete, handleUpdate }) {
    const [editing, setEditing] = useState(false);
    const [edited, setEdited] = useState(false)
    const [commentData, setCommentData] = useState(comment);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentData((prevCommentData) => ({
          ...prevCommentData,
          [name]: value,
        }));
        setEdited(true);
    };

    return (
        <div className={styles.comment} key={comment.id}>
            <div className={styles.info}>
                {comment.author} ({new Date(comment.createdAt).toLocaleString()}):
            </div>
            {editing ? <input type='text' name='content' id='content' minLength='1' onChange={handleInputChange} value={commentData.content}></input> : <div className={styles.content}>{comment.content}</div>}
            <div className={styles.commentActions}>
                {edited && editing && <button onClick={() => {setEditing(!editing)}}>cancel</button>}
                <button onClick={() => {edited && editing ? handleUpdate(commentData) : setEditing(!editing)}}>
                    {edited && editing ? 'save' : editing? 'cancel' : 'edit'}
                </button>
                {!editing && <button onClick={() => {handleDelete(comment.id)}}>delete</button>}
            </div>
            <div className={styles.tinyInfo}>
                {comment.updatedAt !== comment.createdAt && <div className={styles.commentUpdated}>{'updated ' + new Date(comment.updatedAt).toLocaleString()}</div>}
                <div className={styles.commentId}>#{comment.id}</div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
    handleDelete: PropTypes.func,
    handleUpdate: PropTypes.func
}