import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";
import PostDetails from "./PostDetails";
import styles from './post.module.css'
import useAuth from '../../hooks/useAuth';

export default function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { postId } = useParams();
    const [commentData, setCommentData] = useState({
        author: '',
        content: ''
    })
    const auth = useAuth();

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

            if (response.ok) {
                location.reload() // Refresh page
            }

        } catch (error) {
            console.error(error)
        }
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
                setError(error)
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

    if (error) {
        return 'a network error has occured'
    }

    return (
        <div className={styles.main}>
            <PostDetails post={post} handleUpdate={updatePost}></PostDetails>
            <div className="commentContainer">
                <CommentSection comments={post.comments} handleCommentDelete={deleteComment}></CommentSection>
                <CommentForm commentData={commentData} handleInputChange={handleInputChange} postComment={postComment}></CommentForm>
            </div>
        </div>
    )
}