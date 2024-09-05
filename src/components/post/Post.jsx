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
        try {
            e.preventDefault();
            await apiRequest(`${API_URL}/posts/${postId}/comment`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "author": commentData.author,
                    "content": commentData.content
                })
            })
            
            location.reload() // page refresh
        } catch (errors) {
            setErrors(errors)
        }
    }

    async function updatePost(post) {
        try {
            await apiRequest(`${API_URL}/posts/${post.id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(post)
            })

            location.reload() // Refresh page
        } catch (errors) {
            setErrors(errors)
        }
    }

    async function updateComment(comment) {
        try {
            await apiRequest(`${API_URL}/comments/${comment.id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(comment)
            })
            location.reload() // Refresh page
        } catch (errors) {
            setErrors(errors)
        }
    }

    async function deletePost(postId) {
        const accepted = confirm(`Are you sure you want to delete post of ID ${postId}?`)
        if (accepted) {
            try {
                await apiRequest(`${API_URL}/posts/${postId}`, {
                    method: 'delete',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                })
                
                navigate('/'); // Return to front page
            } catch (error) {
                console.error(error)
            }
        }
        return;
    }

    async function deleteComment(commentId) {
        const accepted = confirm(`Are you sure you want to delete comment of ID ${commentId}?`)
        if (accepted) {
            try {
                await apiRequest(`${API_URL}/comments/${commentId}`, {
                    method: 'delete',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                })

                location.reload();
            } catch (error) {
                console.error(error)
            }
        }
        return;
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