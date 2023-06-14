'use client'


import { RestAPI } from '@/restapi/RestAPI';

import { EditorState, $getRoot, $insertNodes, UNDO_COMMAND, REDO_COMMAND } from 'lexical';

import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html';
import {use, useEffect, useState, useCallback} from 'react';

import './editor.css'

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {HeadingNode} from '@lexical/rich-text';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { Box, Button, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';

import ConfirmDialog from '@/components/dialogs/ConfirmDialog';

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import throttle  from 'lodash.throttle';

import { useRouter } from 'next/navigation';

import { useLocalStorage, useBeforeUnload } from 'react-use';

const theme = {
  text: {
    bold: "textBold",
    italic: "textItalic",
    underline: "textUnderline",
  },
}


const headings = ['h1', 'h2', 'h3'] as const
type Heading = typeof headings[number]

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {    
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error: Error) {
  console.error(error);
}

function LoadPlugin({htmlString}: {htmlString: string}) {
  const [editor] = useLexicalComposerContext(); 

  useEffect(() => {
    if(!htmlString) return
    loadCachedEditor()
  }, [htmlString]);

  const loadCachedEditor = () => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlString as string, 'text/html');
    
      const nodes = $generateNodesFromDOM(editor, dom);
    
      $getRoot().select();
      $insertNodes(nodes);
    });
  }

  return <></>
}

export default function DisplayEditor({htmlSubmission, height}: {htmlSubmission: string, height?: number}) {

  console.log('htmlSubmission', htmlSubmission)

  const initialConfig = {
    namespace: 'MyEditor', 
    theme, 
    editable: false,  
    onError,
    nodes: [
      HeadingNode
    ]
  };  

  return (
    <div style={{width: '100%'}}>    
      <LexicalComposer initialConfig={initialConfig}>      
        <div style={{position: 'relative'}}>
          <RichTextPlugin         
            contentEditable={<ContentEditable className='content-editable' style={ height ? {height: height} : {}} />}
            placeholder={<div className='placeholder'>Text schreiben...</div>}
            ErrorBoundary={LexicalErrorBoundary}          
          />
        </div>
        <MyCustomAutoFocusPlugin /> 
        <LoadPlugin htmlString={htmlSubmission} />
      </LexicalComposer>
    </div>
  );
}