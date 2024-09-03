import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './dashboard.module.css'

function DashboardPost({ id, title, author, createdAt, updatedAt }) {
    return (
        <div className={styles.post}>
            <strong>
                <Link to={`/post/${id}`}>
                    {title} 
                </Link> 
            </strong>
            <div className={styles.info}> 
                posted by {author.name} @ {new Date(createdAt).toLocaleString()} 
                {updatedAt !== createdAt && ` [updated ${new Date(updatedAt).toLocaleString()}]`}
                
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
    content: PropTypes.string
}

export default DashboardPost;