import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './dashboard.module.css'

function DashboardComment({ author, content, createdAt, post, postId }) {
    if (content.length > 50) {
        content = content.substring(0, 50) + '(...)'
    }

    if (post.title.length > 20) {
        post.title = post.title.substring(0, 20) + '(...)'
    }

    return (
        <div className={styles.comment}>
            <div className="info">
                {author} @ <Link to={`/post/${postId}`}>{post.title}</Link> ({new Date(createdAt).toLocaleString()}):
            </div>
            <div className="content">{content}</div>
        </div>
    )
}

DashboardComment.propTypes = {
    id: PropTypes.number,
    author: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    post: PropTypes.object,
    postId: PropTypes.number
}

export default DashboardComment;