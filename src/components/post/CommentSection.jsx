import PropTypes from 'prop-types';
import styles from './post.module.css'

export default function CommentSection( { comments }) {
    return (
        <div className={styles.comments}>
            <h2>comments</h2>
            {comments.map((comment) => {
                return (
                    <div className={styles.comment} key={comment.id}>
                        <div className={styles.info}>
                            {comment.author} ({new Date(comment.createdAt).toLocaleString()}):
                        </div>
                        <div className={styles.content}>{comment.content}</div>
                        <div className={styles.commentActions}>
                            <button>edit</button>
                            <button>delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array
}