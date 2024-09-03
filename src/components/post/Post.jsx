import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";
import PostDetails from "./PostDetails";
import styles from './post.module.css'

export default function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { postId } = useParams();
    const [commentData, setCommentData] = useState({
        author: '',
        content: ''
    })

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
            <PostDetails post={post}></PostDetails>
            <div className="commentContainer">
                <CommentSection comments={post.comments}></CommentSection>
                <CommentForm commentData={commentData} handleInputChange={handleInputChange} postComment={postComment}></CommentForm>
            </div>
        </div>
    )
}