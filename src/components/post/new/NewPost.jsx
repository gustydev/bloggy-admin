import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import styles from './newPost.module.css';
import { createResource } from "../../../utils/crudOperations";

export default function NewPost() {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: '',
        subtitle: '',
        content: '',
        published: true
    })
    const auth = useAuth();
    const [errors, setErrors] = useState(null);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name === 'published') {
            value = value === 'true' ? true : false
        }
        
        setPostData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    async function post(e) {
        try {
            e.preventDefault();
            const post = await createResource('posts', {
                title: postData.title,
                subtitle: postData.subtitle,
                content: postData.content,
                published: postData.published
            }, auth.token);
            
            navigate(`/post/${post.id}`);
        } catch (errors) {
            setErrors(errors)
        }
    }

    return (
        <div className="main">
            <h2>new post</h2>
            <form className={styles.newPostForm} method='post' onSubmit={(e) => { post(e) }}>
                <input onChange={(e) => {handleInputChange(e)}} type="text" name='title' id='title' placeholder='post title (required)' required maxLength='150' />
                <input onChange={(e) => {handleInputChange(e)}} type="text" name='subtitle' id='subtitle' placeholder='subtitle' maxLength='100'/>
                <textarea onChange={(e) => {handleInputChange(e)}} name="content" id="content" placeholder='post contents (required)' required maxLength='10000' />
                <fieldset>
                    <legend>published?</legend>
                    <input type="radio" name="published" id="true" value={true} onChange={handleInputChange} defaultChecked/>
                    <label htmlFor="true">published</label>
                    <input type="radio" name="published" id="false" value={false} onChange={handleInputChange} />
                    <label htmlFor="false">unpublished</label>
                </fieldset>
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