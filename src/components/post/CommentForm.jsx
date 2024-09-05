import PropTypes from 'prop-types';

export default function CommentForm( {commentData, handleInputChange, postComment }) {
    return (
        <form onSubmit={(e) => { postComment(e) }}>
            <label htmlFor="author"></label>
            <input type="text" id='author' name='author' placeholder='name (optional)' value={commentData.author} onChange={handleInputChange}/>
            <textarea name="content" id="content" placeholder="leave a comment..." value={commentData.content} onChange={handleInputChange} minLength='1'></textarea>
            <input type="submit" value="Submit" />
        </form>
    )   
}

CommentForm.propTypes = {
    commentData: PropTypes.object,
    handleInputChange: PropTypes.func,
    postComment: PropTypes.func
}