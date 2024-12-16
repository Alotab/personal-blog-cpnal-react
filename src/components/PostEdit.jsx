import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import { useApiContext } from '../context/ApiProvider';
import { axiosPrivate } from '../app/axios';
import getCSRFToken from '../utils/crsfToken';


const PostEdit = () => {
    const { userID, accessToken } = useApiContext();
    const { slug, id } = useParams();
    // const csrfToken = getCSRFToken();

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null)
    const [snippet, setSnippet] = useState('');
    const [post, setPost] = useState(null);
    const [slugz, setSlugz] = useState('');
    


    // checks if tags is an array, else splits a string into array: "tag1, tag2, tag3" => ["tag1", " tag2", " tag3"]
    // trim into => ["tag1", "tag2", "tag3"]
    const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

    // Send Updated data back to the backend API
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('content', content);
        formData.append('title', title); // Append title field
        formData.append('slug', slug);
        formData.append('tags', tagsArray.join(','));
        formData.append('status', status); // Append status field
        formData.append('snippet', snippet);
        formData.append('author', userID);
        if (image) {
          formData.append('image', image);
        }

        // Log FormData content to inspect
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        
   
        try {
            const data = Object.fromEntries(formData);
            console.log('Print formData before Url', data);

            const response = await axiosPrivate.put(`/posts/${slug}/${id}`, formData, {
                headers: {
                // 'Content-Type': 'multipart/form-data', // Adjust for JSON data if needed
                'Content-Type': 'multipart/form-data', // Adjust for JSON data if needed
                'Authorization': `JWT ${accessToken}`, 
                // 'X-CSRFToken': csrfToken,
                },
                
            });
            console.log('Post Updated successfully:', response.data);

            // const response = await fetch(`http://127.0.0.1:8000/auth/posts/${slug}/${id}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Authorization': `Bearer ${accessToken}`, 
            //         'X-CSRFToken': csrfToken,  // Include the CSRF token here
            //     }, 
            //     body: formData,
            //     credentials: 'include',  // Ensure cookies (including CSRF token) are sent
            // });
            console.log('Post Updated successfully:', response);

            // const responseData = await response.json();
          
  
          // Reset the form fields successfull submission
        //   setContent('');
        //   setTitle('');
        //   setTags([]);
        //   setImage(null);
        //   setSnippet('');
  
        } catch (error) {
          console.log(error)
        }
  
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
    };

    // sets content data from the third party Editor textarea
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    // Fetch API post data and set data to each required field for update
    useEffect(() => {
        const fetchPostDetail = async (slug, id) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/auth/posts/${slug}/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
                setStatus(response.data.status);
                setSnippet(response.data.snippet);
                setImage(response.data.image);
                setTags(response.data.tags);
                setPost(response.data);
                setSlugz(response.data.slug);
                // console.log(response.data);

            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        }
        if (slug && id) {
            fetchPostDetail(slug, id);
        }
    },[slug, id]);


    const cloud = useCKEditorCloud( {
        version: '44.0.0',
        premium: false
    } );

    if ( cloud.status === 'error' ) {
        return <div>Error!</div>;
    }

    if ( cloud.status === 'loading' ) {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        CodeBlock,
        MediaEmbed,
        Underline,
        BlockQuote,
        Heading,
        Image,
        ImageUpload,
        PictureEditing,
        Indent,
        IndentBlock,
        Link,
        List,
        Mention,
        Table,
        TableColumnResize,
    } = cloud.CKEditor;

 
  return (
    
    <div>
        { post 
        ?  
            <form action='submit' onSubmit={handleSubmit} style={{ marginTop: '120px'}}>
                <div className="title">
                    <input 
                    name='title'
                    type="text" 
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="title">
                    <input 
                    name='slug'
                    type="text" 
                    placeholder='Slug'
                    value={slugz}
                    onChange={(e) => setSlugz(e.target.value)}
                    />
                </div>
                <div className="snippets">
                    <textarea 
                        name="snippet" 
                        placeholder='Snippet'
                        value={snippet}
                        onChange={(e) => setSnippet(e.target.value)}
                    >
                    </textarea>
                </div>

                <CKEditor
                    editor={ ClassicEditor }
                    data={content}
                    onChange={handleEditorChange}
                    config={ {
                        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjQ5NzkxOTksImp0aSI6IjIyMDFlZDkyLTRlMjUtNDMwNy1iZDkwLTdiODA1N2FkMDE1NCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiZWQzMDYzYzcifQ.0YzCE1AO0o8Z4m4z4hsLfuPMjwe4SyT4J7B6A_cjcTswC_tIKiN_d6GHsAu16Vuswp-6Y9WarL8b2J1KkohqfA',
                        plugins: [ 
                            Essentials, 
                            Paragraph, 
                            Bold, 
                            Italic, 
                            CodeBlock,
                            MediaEmbed,
                            Underline,
                            BlockQuote,
                            Heading,
                            PictureEditing,
                            Indent,
                            IndentBlock,
                            Link,
                            List,
                            Mention,
                            Table,
                            TableColumnResize,
                        ],
                        toolbar: [ 
                            'undo', 'redo', '|', 
                            'bold', 'italic', 'underline', 'heading', 'paragraph', '|',
                            'indent', 'list', 'bulletedList','numberedList','|',
                            'link','insertTable','blockQuote','mediaEmbed', '|',
                            'codeBlock',  '|',
                            'link', 'table', 'TableColumnResize',
                        ],
                        heading: {
                            options: [
                            {
                                model: 'paragraph',
                                title: 'Paragraph',
                                class: 'ck-heading_paragraph'
                            },
                            {
                                model: 'heading1',
                                view: 'h1',
                                title: 'Heading 1',
                                class: 'ck-heading_heading1'
                            },
                            {
                                model: 'heading2',
                                view: 'h2',
                                title: 'Heading 2',
                                class: 'ck-heading_heading2'
                            },
                            {
                                model: 'heading3',
                                view: 'h3',
                                title: 'Heading 3',
                                class: 'ck-heading_heading3'
                            },
                            {
                                model: 'heading4',
                                view: 'h4',
                                title: 'Heading 4',
                                class: 'ck-heading_heading4'
                            }
                            ]
                        },
                        table:{
                            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
                        }
                    }}
                />

                <div className="status">
                    <p>Status:</p>
                    <select name="status" id="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {['Draft', 'Published'].map((status, idx) => {
                        return (
                            <option key={idx} value={status}>{status}</option>
                        )
                        })}
                    </select>
                </div>


                <div className="file">
                    <p>Upload a File:</p>
                    <input 
                        name='image'
                        type="file" 
                        accept='image/*' 
                        placeholder='Image'
                        onChange={handleImageChange}
                    />
                </div>

                <div className="tags">
                    <p>Add Tags:</p>
                    <input 
                        name='tags'
                        type='text' 
                        placeholder='Tags'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <button>Update Post</button>
            </form>
        : <h1>Loading</h1>
        }
    </div>
  )
}

export default PostEdit;