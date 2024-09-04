import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";
import PostDetails from "./PostDetails";
import styles from './post.module.css'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

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
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts/${postId}/comment`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "author": commentData.author,
                    "content": commentData.content
                })
            })
            await response.json();            
        } catch (error) {
            console.error(error)
        } finally {
            location.reload() // Refresh page
        }
    }

    async function updatePost(post) {
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts/${post.id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(post)
            })
            const updated = await response.json();

            if (response.ok) {
                location.reload() // Refresh page
            } else {
                setErrors(updated.errors.messages)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function updateComment(comment) {
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/comments/${comment.id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(comment)
            })
            const updated = await response.json();

            if (response.ok) {
                location.reload() // Refresh page
            } else {
                setErrors(updated.errors.messages)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function deletePost(postId) {
        const accepted = confirm(`Are you sure you want to delete post of ID ${postId}?`)
        if (accepted) {
            try {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts/${postId}`, {
                    method: 'delete',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                })
                
                if (response.ok) {
                    navigate('/'); // Return to front page
                }

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
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/comments/${commentId}`, {
                    method: 'delete',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                })
                
                if (response.ok) {
                    location.reload();
                }
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
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts/${postId}`);
                const post = await response.json();

                if (!response.ok) {
                    throw new Error("Error fetching post. Status: ", response.status)
                }

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