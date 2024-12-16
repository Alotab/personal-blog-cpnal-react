import React, { useRef, useState } from 'react'

import { Editor as TineMCE } from '@tinymce/tinymce-react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import { FaArrowLeftLong } from "react-icons/fa6";
import 'ckeditor5/ckeditor5.css';
import api from '../tokenRefresh';
import ApiContext, { useApiContext } from '../context/ApiProvider';
import axios from 'axios';
import { axiosPrivate } from '../app/axios';
// import axios from '../app/axios';

axiosPrivate

const EditorBox = () => {
    const { auth, accessToken } = useApiContext();
    const editorRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null);
    const [snippet, setSnippet] = useState('');
    
    

    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    
    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setContent(data);
    }

    const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.append('content', content);
      formData.append('title', title); // Append title field
      formData.append('tags', tagsArray.join(','));
      formData.append('status', status); // Append status field
      formData.append('snippet', snippet);
      formData.append('author', auth.id);
      if (image) {
        formData.append('image', image);
      }
    
      try {

        const response = await axiosPrivate.post('/posts/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Adjust for JSON data if needed
            'Authorization': `JWT ${accessToken}`, 
          },
        });
        console.log('Post created successfully:', response.data);
     

        // Reset the form fields successfull submission
        setContent('');
        setTitle('');
        setTags([]);
        setImage(null);
        setSnippet('');

      } catch (error) {
        console.log(error)
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    }

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
                onChange={handleImageChange}
              />
            </div>
    
            <div className="tags">
              <p>Add Tags:</p>
              <input 
                name='tags'
                type='text' 
                placeholder='tags'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <button>Log editor content</button>


        </form>
      </div>
    );
};

export default EditorBox;




// const EditorBox = () => {
//     const editorRef = useRef(null);
//     const log = () => {
//       if (editorRef.current) {
//         console.log(editorRef.current.getContent());
//       }
//     };


   
//   return (
//       <div>
//           <TineMCE
//               apiKey='m15sz9aoniud0pyaggow3apf62dv4m05nr3wdibexp1qv2ic'
//               onInit={(_evt, editor) => editorRef.current = editor}
//               initialValue="<p>This is the initial content of the editor.</p>"
//               init={{
//               height: 500,
//               menubar: false,
//               plugins: [
//                   'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                   'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                   'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
//                   'codesample', 'emoticons',
//               ],
//               toolbar: 'undo redo | blocks | ' +
//                   'bold italic forecolor | blocks fontfamily fontsize | alignleft aligncenter ' +
//                   'alignright alignjustify | bullist numlist outdent indent | ' +
//                   'removeformat | code link image media table mergetags | addcomment showcomments | emoticons charmap |  | removeformat  |help',
//               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//               }}
//           />
//         <button onClick={log}>Log editor content</button>

      

//       </div>
//   )
// }
// export default EditorBox;




{/* <div>
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
      onChange={handleImageChange}
    />
  </div>
    
  <div className="tags">
    <p>Add Tags:</p>
    <input 
      name='tags'
      type='text' 
      placeholder='tags'
      value={tags}
      onChange={(e) => setTags(e.target.value)}
    />
  </div>
    
  <button 
    type="submit" 
    disabled={!title || !content || !snippet || !status || !tags}>
      Save Article
  </button>
  {!loading}
    
</form>
</div> */}