import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { Controller } from 'react-hook-form';

function CKEditorComponent(props) {
  const {
    setValue, name, defaultValue, control, setCampaignEditor, campaignEditor
  } = props;
  return (
    <div>
      <div id={`${name}_toolbar-container`} />
      <Controller
        render={controllerProps => (
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
              setCampaignEditor({ ...campaignEditor, [name]: editor });
              // window[name] = editor;
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValue(name, data);
            }}
          />
        )}
        defaultValue=""
        name={name}
        control={control}
      />
      {/* <div id={`${name}_toolbar-container`} />
      <CKEditor
        editor={DecoupledEditor}
        config={
            {
              ckfinder: {
                uploadUrl: '/api/TB_AD/upload'
              },
            }
        }
        data="<p>Hello from CKEditor 5!</p>"
        onInit={(editor) => {
          const toolbarContainer = document.querySelector(`#${name}_toolbar-container`);
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          window.editor = editor;
          if (defaultValue) setValue(name, defaultValue);
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
        }}
      /> */}
    </div>
  );
}

export default CKEditorComponent;
