import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import styles from './newPost.module.css';

export default function NewPost() {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: '',
        subtitle: '',
        content: ''
    })
    const auth = useAuth();
    const [errors, setErrors] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    async function post(e) {
        try {
            e.preventDefault();
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts/`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    "title": postData.title,
                    "subtitle": postData.subtitle,
                    "content": postData.content
                })
            })
            const post = await response.json();
            console.log(post)

            if (response.ok) {
                navigate(`/post/${post.id}`)
            } else {
                setErrors(post.errors.messages)
                throw new Error(`Error creating post (status ${response.status})`)
            }
       
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="main">
            <h2>new post</h2>
            <form className={styles.newPostForm} method='post' onSubmit={(e) => { post(e) }}>
                <input onChange={(e) => {handleInputChange(e)}} type="text" name='title' id='title' placeholder='post title (required)' required maxLength='150' />
                <input onChange={(e) => {handleInputChange(e)}} type="text" name='subtitle' id='subtitle' placeholder='subtitle' maxLength='100'/>
                <textarea onChange={(e) => {handleInputChange(e)}} name="content" id="content" placeholder='post contents (required)' required maxLength='10000' />
                <input type="submit" value="Post" />
            </form>
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