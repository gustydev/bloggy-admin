import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './dashboard.module.css'

function DashboardPost({ id, title, subtitle, author, createdAt, updatedAt, _count }) {
    const count = _count.comments;

    return (
        <div className={styles.post}>
            <strong>
                <Link to={`/post/${id}`}>
                    {title} 
                </Link> 
            </strong>
            &nbsp;{subtitle !== null ? `(${subtitle})` : ''}
            <div className={styles.info}> 
                posted by {author.name} at {new Date(createdAt).toLocaleString()} 
                {updatedAt !== createdAt && ` [updated ${new Date(updatedAt).toLocaleString()}]`}
                <div>
                    <em>{count} {count !== 1 ? 'comments' : 'comment'}</em>
                </div>
            </div>
        </div>
    )
}

DashboardPost.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.object,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    content: PropTypes.string,
    subtitle: PropTypes.string,
    _count: PropTypes.object
}

export default DashboardPost;