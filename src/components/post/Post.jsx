import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";
import PostDetails from "./PostDetails";
import styles from './post.module.css'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { apiRequest } from "../../utils/api";
import { createResource, updateResource, deleteResource } from "../../utils/crudOperations";

export default function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [postFetchError, setPostFetchError] = useState(null)
    const [errors, setErrors] = useState(null);
    const { postId } = useParams();
    const [commentData, setCommentData] = useState({
        author: '',
        content: ''
    })
    const auth = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentData((prevCommentData) => ({
          ...prevCommentData,
          [name]: value,
        }));
    };

    async function postComment(e) {
        e.preventDefault();
        try {
            await createResource(`posts/${postId}/comment`, commentData);
            location.reload(); // page refresh
        } catch (errors) {
            setErrors(errors);
        }
    }

    async function updatePost(post) {
        try {
            await updateResource('posts', post.id, post, auth.token);
            location.reload(); // Refresh page
        } catch (errors) {
            setErrors(errors);
        }
    }

    async function updateComment(comment) {
        try {
            await updateResource('comments', comment.id, comment, auth.token);
            location.reload(); // Refresh page
        } catch (errors) {
            setErrors(errors);
        }
    }

    async function deletePost(postId) {
        const accepted = confirm(`Are you sure you want to delete post of ID ${postId}?`)
        if (accepted) {
            try {
                await deleteResource('posts', postId, auth.token);
                navigate('/'); // Return to front page
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function deleteComment(commentId) {
        const accepted = confirm(`Are you sure you want to delete comment of ID ${commentId}?`);
        if (accepted) {
            try {
                await deleteResource('comments', commentId, auth.token);
                location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        let ignore = false;

        async function fetchPost() {
            setLoading(true);
            try {
                const post = await apiRequest(`${API_URL}/posts/${postId}`);
                setPost(post);
            } catch (error) {
                console.error(error)
                setPostFetchError(error)
            } finally {
                setLoading(false)
            }
        }

        if (!ignore) {
            fetchPost();
        }

        return () => {
            ignore = true;
        }
    }, [postId])

    if (loading) {
        return 'loading...'
    }

    if (postFetchError) {
        return 'a network error has occured'
    }

    return (
        <div className={styles.main}>
            <PostDetails post={post} handleUpdate={updatePost} handleDelete={deletePost}></PostDetails>
            <div className="commentContainer">
                <CommentSection comments={post.comments} handleCommentUpdate={updateComment} handleCommentDelete={deleteComment}></CommentSection>
                <CommentForm commentData={commentData} handleInputChange={handleInputChange} postComment={postComment}></CommentForm>
            </div>
            {errors && (
                <div className="errors">
                    <p><strong>{errors.length > 1 ? 'errors:' : 'error:'}</strong></p>
                    <ul>
                    {errors.map((e, index) => (
                        <li key={index}>{e}</li>
                    ))}
                    </ul>
                </div>
            )}
        </div>
    )
}