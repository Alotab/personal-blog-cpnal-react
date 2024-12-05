// import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom';
// import { Editor as TineMCE } from '@tinymce/tinymce-react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import {
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
	Paragraph,
  Table,
	TableColumnResize,
} 
from 'ckeditor5';


const EditorBox = () => {
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

    // const { FormatPainter } = cloud.CKEditorPremiumFeatures;

    return (
        <CKEditor
            editor={ ClassicEditor }
            data={ '<p>Hello world!</p>' }
            config={ {
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzQ2NTI3OTksImp0aSI6ImZhZTNmOThlLThhNGMtNGZiMi04NjY1LWNkZTI0ZTk0MTFkMiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM5ZTdlODgxIn0.lFkEYR0BdtwXGIN2YLypyMMKE3E9f3oQAYj-xG13FKu9oayScchIJT6VyTNj21wNi57yV_4NOjlKg5MPnU-mjQ',
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