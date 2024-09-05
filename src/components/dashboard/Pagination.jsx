import PropTypes from 'prop-types';
import styles from './dashboard.module.css'

const Pagination = ({ currentPage, totalItems, limit, onPageChange }) => {
    const hasPrevious = currentPage > 1;
    const hasNext = totalItems === limit;

    return (
        <>
            {hasPrevious && <button className={styles.newer} onClick={() => onPageChange(-1)}>show newer</button>}
            {hasNext && <button className={styles.older} onClick={() => onPageChange(1)}>show older</button>}
        </>
    );
};

export default Pagination;

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalItems: PropTypes.number,
    limit: PropTypes.number,
    onPageChange: PropTypes.func
}