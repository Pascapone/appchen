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

function ExportPlugin({handleSubmit, timeLimitReached, handleAutoSubmit}: {handleSubmit: (htmlString: string) => void, timeLimitReached: boolean, handleAutoSubmit: (htmlString: string) => void}) {
  const [editor] = useLexicalComposerContext();  

  useEffect(() => {
    if(timeLimitReached) {
      let htmlString = getExportString()
      handleAutoSubmit(htmlString)
    }
  }, [timeLimitReached])

  const getExportString = () => {
    let htmlString = ''
    editor.update(() => {
      htmlString = $generateHtmlFromNodes(editor, null);       
    })   
    return htmlString
  }

  const handleExport = async () => {
    let htmlString = getExportString()
    handleSubmit(htmlString)    
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

      setInitialized(true)
    });
  }

  return <></>
}

function onChange(editorState: EditorState, setChanged: React.Dispatch<React.SetStateAction<boolean>>) {   
  setChanged((prev) => !prev)
}

export default function SubmissionEditor({textAssignmentUserId, timeLimitReached, editable}: {textAssignmentUserId: string, timeLimitReached: boolean, editable: boolean}) {
  const [changed, setChanged] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [openApplyDialog, setOpenApplyDialog] = useState(false)
  const [htmlSubmission, setHtmlSubmission] = useState('') 
   
  const router = useRouter()

  const initialConfig = {
    namespace: 'MyEditor', 
    theme, 
    editable,  
    onError,
    nodes: [
      HeadingNode
    ]
  };   

  const handleSubmitAssignment = (htmlString: string) => {
    setHtmlSubmission(htmlString)
    setOpenApplyDialog(true)
  }

  const handleAutoSubmit = async (htmlString: string) => {
    setSubmitting(true) 
    await RestAPI.assignment.submitUserAssignment(textAssignmentUserId, htmlString).catch(err => {
      console.log('Error: submitUserAssignment')
      console.log(err)
    }) 
    router.push(`/assignments`)
  }

  const confirmSubmitAssignment = async () => {  
    setSubmitting(true) 
    await RestAPI.assignment.submitUserAssignment(textAssignmentUserId, htmlSubmission).catch(err => {
      console.log('Error: submitUserAssignment')
      console.log(err)
    })
    setOpenApplyDialog(false)  
    router.push(`/assignments`)
  }

  return (
    <div style={{width: '100%'}}>
      <ConfirmDialog
        open={openApplyDialog}
        dialogText='Bist du sicher, dass du diese Aufgabe abschicken möchtest? Du kannst die Aufgabe nicht mehr bearbeiten.'
        handleCancel={() => setOpenApplyDialog(false)}
        handleConfirm={confirmSubmitAssignment}
        submitting={submitting}
        confirmButtonText='Abschicken'
        dialogStyle='success'
        permanentWarning={true}
        title='Aufgabe abschicken'
      />
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
        <ExportPlugin timeLimitReached={timeLimitReached} handleSubmit={handleSubmitAssignment} handleAutoSubmit={handleAutoSubmit}/>
        <OnChangePlugin onChange={(editorState: EditorState) => onChange(editorState, setChanged)} />
        <LocalStoragePlugin changed={changed} textAssignmentUserId={textAssignmentUserId}/>        
      </LexicalComposer>
    </div>
  );
}