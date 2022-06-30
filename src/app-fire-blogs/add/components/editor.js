// Blog Content Editor 

import React, { useState } from 'react';

import { EditorState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';


const BlogEditor = ({onChange}) => {
    
    const toolbarPlugin = createToolbarPlugin();
    const Toolbar = toolbarPlugin.Toolbar;
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handle = {
        change: (e) => {
            setEditorState(e);
            const rawContentState = convertToRaw(e.getCurrentContent());
            const markup = draftToHtml(rawContentState);
            onChange(markup);
        },        
    }

    return (
        <React.Fragment>
            <div className="draft-editor">
                <Editor 
                    ref={(element) => { return element }}
                    plugins={[toolbarPlugin]}
                    editorState={editorState} 
                    onChange={handle.change} 
                />
            </div>
                <Toolbar />
        </React.Fragment>
    )
}

export default BlogEditor;