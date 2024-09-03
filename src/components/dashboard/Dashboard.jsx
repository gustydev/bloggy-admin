import { useState, useEffect } from "react";
import styles from './dashboard.module.css'
import DashboardPost from "./DashboardPost";
import DashboardComment from "./DashboardComment";

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

    useEffect(() => {
        let ignore = false;

        async function fetchPosts() {
            setLoadingPosts(true)
            try {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts?page=${postPage}&limit=${postLimit}`);
                const posts = await response.json();

                if (!response.ok) {
                    throw new Error("Error fetching posts. Status: ", response.status)
                }

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
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/comments?limit=${commentLimit}&page=${commentPage}&sort=desc`);
                const comments = await response.json();

                if (!response.ok) {
                    throw new Error("Error fetching comments. Status: ", response.status)
                }

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
                {loadingPosts ? 'loading posts...' : (
                    posts.map((post) => {
                        return <DashboardPost key={post.id} {...post}></DashboardPost>
                    })
                )}
            </div>
            <div className={styles.pageNav}>
                {postPage > 1 ? <button className={styles.newer} onClick={() => {setPostPage(postPage - 1)}}>show newer posts</button> : ''}
                {posts.length < postLimit ? '' : <button className={styles.older} onClick={() => {setPostPage(postPage + 1)}}>show older posts</button>}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.recentComments}>
                <h2>comments</h2>
                {loadingComments ? 'loading comments...' : (
                    comments.map((comment) => {
                        return <DashboardComment key={comment.id} {...comment}></DashboardComment>
                    })
                )}
            </div>
            <div className={styles.commentNav}>
                {commentPage > 1 ? <button className={styles.newer} onClick={() => {setCommentPage(commentPage - 1)}}>show newer comments</button> : ''}
                {comments.length < commentLimit ? '' : <button className={styles.older} onClick={() => {setCommentPage(commentPage + 1)}}>show older comments</button>}
            </div>
          </div>
        </div>
    )
}