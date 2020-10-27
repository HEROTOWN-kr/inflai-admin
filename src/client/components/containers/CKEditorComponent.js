import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

function CKEditorComponent(props) {
  const { setValue, name } = props;
  return (
    <div>
      <div id={`${name}_toolbar-container`} />
      <CKEditor
        editor={DecoupledEditor}
        config={
            {
              ckfinder: {
                uploadUrl: '/api/TB_AD/upload'
              },
            }
        }
        // data="<p>Hello from CKEditor 5!</p>"
        onInit={(editor) => {
          const toolbarContainer = document.querySelector(`#${name}_toolbar-container`);
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          window.editor = editor;
          setValue(name, editor.getData());
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(name, data);
        }}
        /* onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }} */
      />
    </div>
  );
}

export default CKEditorComponent;
