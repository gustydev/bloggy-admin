import { useState, useEffect } from "react";
import styles from './dashboard.module.css'
import DashboardPost from "./DashboardPost";
import DashboardComment from "./DashboardComment";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { apiRequest } from "../../utils/api";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [loadingComments, setLoadingComments] = useState(true);
    const [postPage, setPostPage] = useState(1);
    const postLimit = 10
    const [commentPage, setCommentPage] = useState(1);
    const commentLimit = 8

    const handlePostPageChange = (increment) => {
        setPostPage((prev) => prev + increment);
    };
    
    const handleCommentPageChange = (increment) => {
        setCommentPage((prev) => prev + increment);
    };

    useEffect(() => {
        let ignore = false;

        async function fetchPosts() {
            setLoadingPosts(true)
            try {
                const posts = await apiRequest(`${API_URL}/posts?page=${postPage}&limit=${postLimit}`);
                setPosts(posts);
            } catch (error) {
                setError(error)
                console.error(error)
            } finally {
                setLoadingPosts(false)
            }
        }

        if (!ignore) {
            fetchPosts();
        }

        return () => {
            ignore = true;
        }
    }, [postPage, postLimit])

    useEffect(() => {
        let ignore = false;

        async function fetchComments() {
            setLoadingComments(true)
            try {
                const comments = await apiRequest(`${API_URL}/comments?limit=${commentLimit}&page=${commentPage}&sort=desc`);
                setComments(comments);
            } catch (error) {
                setError(error)
                console.error(error)
            } finally {
                setLoadingComments(false);
            }
        }

        if (!ignore) {
            fetchComments();
        }

        return () => {
            ignore = true;
        }
    }, [commentPage])
    
    if (error) {
        return 'A network error has occured.'
    }

    return (
        <div className={styles.home}>
          <div className={styles.left}>
            <div className={styles.posts}>
                <h2>posts</h2>
                {loadingPosts ? 'loading posts...' : posts.map((post) => <DashboardPost key={post.id} {...post} />)}
                <Link to='/post/new' className={styles.newPost}><button>new post</button></Link>
            </div>
            <div className={styles.pageNav}>
                {postPage > 1 && <button className={styles.newer} onClick={() => handlePostPageChange(-1)}>show newer posts</button>}
                {posts.length === postLimit && <button className={styles.older} onClick={() => handlePostPageChange(1)}>show older posts</button>}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.recentComments}>
                <h2>comments</h2>
                {loadingComments ? 'loading comments...' : comments.map((comment) => <DashboardComment key={comment.id} {...comment} />)}
            </div>
            <div className={styles.commentNav}>
                {commentPage > 1 ? <button className={styles.newer} onClick={() => {handleCommentPageChange(-1)}}>show newer comments</button> : ''}
                {comments.length === commentLimit && <button className={styles.older} onClick={() => handleCommentPageChange(1)}>show older comments</button>}
            </div>
          </div>
        </div>
    )
}