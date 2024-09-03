import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './dashboard.module.css'

function DashboardPost({ id, title, subtitle, author, createdAt, updatedAt, _count, published }) {
    const count = _count.comments;
    const truncatedTitle = title.length > 50 ? title.substring(0, 50) + '(...)' : title;
    const truncatedSubtitle = subtitle.length > 30 ? subtitle.substring(0, 30) + '(...)' : subtitle; 

    return (
        <div className={styles.post}>
            <strong>
                <Link to={`/post/${id}`}>
                    {truncatedTitle} 
                </Link> 
            </strong>
            &nbsp;{subtitle.length > 0 ? `(${truncatedSubtitle})` : ''}
            <div className={styles.info}> 
                posted by {author.name} at {new Date(createdAt).toLocaleString()} 
                {updatedAt !== createdAt && ` [updated ${new Date(updatedAt).toLocaleString()}]`}
                <div>
                    <em>{published ? 'Published' : 'Unpublished'}</em>, {count} {count !== 1 ? 'comments' : 'comment'}
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
    _count: PropTypes.object,
    published: PropTypes.bool
}

export default DashboardPost;