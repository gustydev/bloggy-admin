import PropTypes from 'prop-types';
import styles from './post.module.css'
import Comment from './Comment';

export default function CommentSection( { comments, handleCommentUpdate, handleCommentDelete }) {
    return (
        <div className={styles.comments}>
            <h2>comments</h2>
            {comments.map((comment) => <Comment key={comment.id} comment={comment} handleDelete={handleCommentDelete} handleUpdate={handleCommentUpdate}/>)}
        </div>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array,
    handleCommentUpdate: PropTypes.func,
    handleCommentDelete: PropTypes.func
}