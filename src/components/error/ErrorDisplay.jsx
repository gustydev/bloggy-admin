import PropTypes from 'prop-types';

export default function ErrorDisplay( { errors }) {
    return (
        <div className="errors">
            <p><strong>{errors.length > 1 ? 'errors:' : 'error:'}</strong></p>
                <ul>
                {errors.map((e, index) => (
                    <li key={index}>{e}</li>
                ))}
                </ul>
        </div>
    )
}

ErrorDisplay.propTypes = {
    errors: PropTypes.array
}