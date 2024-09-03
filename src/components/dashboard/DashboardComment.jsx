import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './dashboard.module.css'

function DashboardComment({ author, content, createdAt, post, postId }) {
    const truncatedContent = content.length > 50 ? content.substring(0, 50) + '(...)' : content;
    const truncatedTitle = post.title.length > 20 ? post.title.substring(0, 20) + '(...)' : post.title;    

    return (
        <div className={styles.comment}>
            <div className="info">
                {author} @ <Link to={`/post/${postId}`}>{truncatedTitle}</Link> ({new Date(createdAt).toLocaleString()}):
            </div>
            <div className="content">{truncatedContent}</div>
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