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

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import throttle  from 'lodash.throttle';

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

function ExportPlugin({userAssignmentId}: {userAssignmentId: string}) {
  const [editor] = useLexicalComposerContext();  

  const handleExport = async () => {
    let htmlString = 'Check'
    editor.update(() => {
      htmlString = $generateHtmlFromNodes(editor, null); 
      
      console.log("HTML", htmlString)
    })   

    console.log("HTML After Update", htmlString)
    await RestAPI.assignment.submitUserAssignment(userAssignmentId, htmlString).catch(err => {
      console.log('Error: submitUserAssignment')
      console.log(err)
    })
  }   

  return (    
    <Box sx={{paddingTop: 0}}>
      <Button variant='contained' onClick={handleExport}>Abschicken</Button>
    </Box>
  )
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();  
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],    
  ) => {
    if(newFormats[0] === 'undo') {
      editor.dispatchCommand(UNDO_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REDO_COMMAND, undefined)
    }
    console.log(newFormats)
  }; 

  return(
    <>
      <Box display='flex' flexDirection={'row'}>        
        <Box>
          <ToggleButtonGroup
            aria-label="formats"      
            onChange={handleFormat}
          >
            <ToggleButton value="undo" aria-label="undo" style={{height: 40, width: 40}}>
              <Typography variant="body1" style={{fontSize: 14}}>
                <UndoIcon/>
              </Typography>
            </ToggleButton>
            <ToggleButton value="redo" aria-label="redo" style={{height: 40, width: 40}}>
              <Typography variant="body1" style={{fontSize: 14}}>
                <RedoIcon/>
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>        
      </Box>
    </>
    
  )
}

function onError(error: Error) {
  console.error(error);
}

function LocalStoragePlugin({changed, textAssignmentUserId}: {changed: boolean, textAssignmentUserId: string}) {
  const [editor] = useLexicalComposerContext();  
  const [value, setValue, remove] = useLocalStorage(textAssignmentUserId);
  const [initialized, setInitialized] = useState(false)  

  const saveEditorState = (changed: boolean) => {
    console.count("Update Local Storage")
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null); 
      setValue(htmlString)
      console.log("HTML", htmlString)
    })  
  }

  const saveEditorStateHandler = useCallback(
    throttle(saveEditorState, 500)
  , [])
  

  useEffect(() => {
    if(!initialized) return
    saveEditorStateHandler(changed)
  }, [changed])

  useEffect(() => {    
    if(!initialized) {
      setInitialized(true)
      console.log("Chached Value:", value)
      console.log("Chached Value Type:", typeof(value))
      if (value != null) loadCachedEditor()      
    }
  }, [])    

  const loadCachedEditor = () => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value as string, 'text/html');
    
      const nodes = $generateNodesFromDOM(editor, dom);
    
      $getRoot().select();
      $insertNodes(nodes);
    });
  }

  return <></>
}

function onChange(editorState: EditorState, setChanged: React.Dispatch<React.SetStateAction<boolean>>) {   
  setChanged((prev) => !prev)
}

export default function SubmissionEditor({textAssignmentUserId}: {textAssignmentUserId: string}) {
  const [changed, setChanged] = useState(false)
   
  const initialConfig = {
    namespace: 'MyEditor', 
    theme,
    onError,
    nodes: [
      HeadingNode
    ]
  };   

  return (
    <div style={{width: '100%'}}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div style={{position: 'relative'}}>
          <RichTextPlugin         
            contentEditable={<ContentEditable className='content-editable' />}
            placeholder={<div className='placeholder'>Text schreiben...</div>}
            ErrorBoundary={LexicalErrorBoundary}          
          />
        </div>
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <ExportPlugin userAssignmentId={textAssignmentUserId}/>
        <OnChangePlugin onChange={(editorState: EditorState) => onChange(editorState, setChanged)} />
        <LocalStoragePlugin changed={changed} textAssignmentUserId={textAssignmentUserId}/>        
      </LexicalComposer>
    </div>
  );
}