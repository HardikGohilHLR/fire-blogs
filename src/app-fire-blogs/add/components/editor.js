// Blog Content Editor 

import React, { useEffect, useState } from 'react';

import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import Editor from '@draft-js-plugins/editor';
import { BoldButton, CodeBlockButton, ItalicButton, OrderedListButton, UnderlineButton, UnorderedListButton, } from '@draft-js-plugins/buttons';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';

const BlogEditor = ({content, onChange}) => {
    
    const toolbarPlugin = createToolbarPlugin();
    const Toolbar = toolbarPlugin.Toolbar;

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        setEditorState(content);
    }, [content]);    

    const convert = {
        convertToHTML: (content) => {
            const blocksFromHTML = convertFromHTML(content);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            );

            return EditorState.createWithContent(state);
        }
    }

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
            <div className="draft-editor-wpr">
                <div className="draft-editor">
                    <Editor 
                        ref={(element) => { return element }}
                        plugins={[toolbarPlugin]}
                        editorState={editorState} 
                        onChange={handle.change} 
                    />
                </div>

                <Toolbar>
                    {externalProps => {
                        let overrideProps = {getEditorState: () => editorState, setEditorState}
                        return <div className="fb_flex">
                            <BoldButton {...externalProps} {...overrideProps}/>
                            <ItalicButton {...externalProps} {...overrideProps}/>
                            <UnderlineButton {...externalProps} {...overrideProps}/>
                            <UnorderedListButton {...externalProps} {...overrideProps}/>
                            <OrderedListButton {...externalProps} {...overrideProps}/> 
                        </div>
                    }}
                </Toolbar>
            </div>
        </React.Fragment>
    )
}

export default BlogEditor;