'use client'
import { CSSProperties, MouseEventHandler } from 'react';
import {$createParagraphNode, $getRoot, $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, TextFormatType, $getNodeByKey, LexicalNode, EditorState } from 'lexical';
import {$setBlocksType} from '@lexical/selection';
import {$createHeadingNode} from '@lexical/rich-text';
import {useEffect, useState} from 'react';

import './editor.css'

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {HeadingNode} from '@lexical/rich-text';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { Box, Button, Typography } from '@mui/material';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const theme = {
  text: {
    bold: "textBold",
    italic: "textItalic",
    underline: "textUnderline",
  },
}


const headings = ['h1', 'h2', 'h3'] as const
type Heading = typeof headings[number]

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState, heading: Heading | null, setHeading: (h: Heading | null) => void, formats: TextFormatType[], setFormats: (f: TextFormatType[]) => void) { 

  const getHeadingSelection = (node: LexicalNode) => {
    if(node.__type === 'paragraph' && heading !== null){
      setHeading(null)
      return
    }
    if(node.__tag !== heading){
      setHeading(node.__tag)
      return
    }
  }

  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    
    // console.log(root, selection);

    if(!$isRangeSelection(selection)) return
    const node = $getNodeByKey(selection.anchor.key)
    // console.log("NODE", node)

    const format = node!.__format
    console.log("NODE FORMAT", format)
    const selectedFromats = [] as TextFormatType[]
    if(format%2 === 1) selectedFromats.push('bold')
    if(format >= 8) selectedFromats.push('underline')
    if(format === 2 || format === 3 || format >= 10) selectedFromats.push('italic')

    setFormats(selectedFromats)

    if(node?.__type === 'heading'){
      getHeadingSelection(node)    
      return
    }

    const parentKey = node?.__parent    

    if(!parentKey) {      
      setHeading(null)
      return
    }

    const parentNode = $getNodeByKey(parentKey)    
    // console.log("PARENT NODE", parentNode)
    getHeadingSelection(parentNode!)        
  });
}

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

function ToolbarPlugin({heading, setHeading, formats, setFormats}: {heading: Heading | null, setHeading: (h: Heading | null) => void,  formats: TextFormatType[], setFormats: (f: TextFormatType[]) => void}) {
  const [editor] = useLexicalComposerContext();  

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: TextFormatType[],    
  ) => {
    console.log("COMMAND", newFormats)
    newFormats.forEach((f) => {
      if(formats.includes(f)) return     
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, f)
    
    })
    formats.forEach((f) => {
      if(newFormats.includes(f)) return
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, f)       
    })
    setFormats(newFormats)
  };

  const onClick = (e: React.MouseEvent, h: Heading | null) => { 
    setHeading(h)
    editor.update(() => {
      const selection = $getSelection()
      if(!$isRangeSelection(selection)) return
      
      if(h === null) {
        $setBlocksType(selection, () => $createParagraphNode())
        return
      }

      $setBlocksType(selection, () => $createHeadingNode(h))
    })
  }

  return(
    <>
      <Box display='flex' flexDirection={'row'}>
      <Box>
        <ToggleButtonGroup
          value={heading}
          exclusive
          onChange={onClick}
          aria-label="headings"
        >
          <ToggleButton value="h1" aria-label="header one" style={{height: 40, width: 40}}>
            <Typography variant="body1" fontWeight={700} style={{fontSize: 14}}>H1</Typography>
          </ToggleButton>
          <ToggleButton value="h2" aria-label="header two" style={{height: 40, width: 40}}>
            <Typography variant="body1" fontWeight={700} style={{fontSize: 14}}>H2</Typography>
          </ToggleButton>
          <ToggleButton value="h3" aria-label="header three" style={{height: 40, width: 40}}>
            <Typography variant="body1" fontWeight={700} style={{fontSize: 14}}>H3</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box paddingLeft={1}>
        <ToggleButtonGroup
          value={formats}
          aria-label="formats"      
          onChange={handleFormat}
        >
          <ToggleButton value="bold" aria-label="bold" style={{height: 40, width: 40}}>
            <Typography variant="body1" fontWeight={700} style={{fontSize: 14}}>B</Typography>
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic" style={{height: 40, width: 40}}>
            <Typography fontStyle='italic' variant="body1" style={{fontSize: 14}}>i</Typography>
          </ToggleButton>
          <ToggleButton value="underline" aria-label="underline" style={{height: 40, width: 40}}>
            <Typography variant="body1" style={{fontSize: 14}} className='textUnderline'>U</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      </Box>
    </>
    
  )
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

export default function Editor() {
  const [heading, setHeading] = useState<Heading | null>(null);
  const [formats, setFormats] = useState<TextFormatType[]>([]);

  const initialConfig = {
    namespace: 'MyEditor', 
    theme,
    onError,
    nodes: [
      HeadingNode
    ]
  };

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin heading={heading} setHeading={setHeading} formats={formats} setFormats={setFormats}/>
        <div style={{position: 'relative'}}>
          <RichTextPlugin         
            contentEditable={<ContentEditable className='content-editable' />}
            placeholder={<div className='placeholder'>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}          
          />
        </div>
        <OnChangePlugin onChange={(editorState: EditorState) => onChange(editorState, heading, setHeading, formats, setFormats)} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
}