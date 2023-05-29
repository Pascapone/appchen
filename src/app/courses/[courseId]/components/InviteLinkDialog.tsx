import * as React from 'react';
import { useState, useEffect, createRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { Box, Typography, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { shortenText } from '@/utils/textUtils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/material';
import QRCode from "easyqrcodejs";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

import { toast } from 'react-toastify';

interface DialogProps {
  open: boolean,
  submitting: boolean,
  token: string,
  courseId: string,
  courseName: string,
  courseLevel: string,
  handleInvalidateToken: () => void,
  handleCancel: () => void,
  handleConfirm: () => void
}

export default function InviteLinkDialog({
  open, 
  submitting, 
  token,
  courseId,
  courseName,
  courseLevel,
  handleInvalidateToken,
  handleCancel, 
  handleConfirm
}: DialogProps) {

  const [inviteLink, setInviteLink] = useState('')
  const [qrCode, setQrCode] = useState<QRCode | null>(null)

  const theme = useTheme()

  const code = createRef<HTMLDivElement>();
  const qrDiv = createRef<HTMLDivElement>();
  
  const notifyCopiedLinkToClipboard = () => toast.info("Einladungslink in die Zwischenablage kopiert.", {
    theme: "colored",
  });

  const getBaseUrl = () => {    
    const port = window.location.port
    const hostname = window.location.hostname
    if(hostname === 'localhost'){
      return `http://${hostname}:${port}`
    }
    return `https://${hostname}`
  }  

  const handleCopyLinkToClipboard = () => {
    navigator.clipboard.writeText(inviteLink)
    notifyCopiedLinkToClipboard()
  }

  const handleCreateQRCode = async () => {
    if(qrCode) qrCode.clear()

    const qr = new QRCode(code.current, { text: inviteLink });    
    setQrCode(qr)
    const canvas = await html2canvas(qrDiv.current!, {
      onclone: (document) => {
        const canvas = document.getElementById('qrcode')
        if(!canvas) return
        canvas.style.display = 'block'

        const appchen = document.getElementById('appchen')
        if(!appchen) return
        appchen.style.color = 'black'

        const info = document.getElementById('info')
        if(!info) return
        info.style.color = 'black'
      }
    });
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  }

  useEffect(() => {
    if(!token) return
    setInviteLink(`${getBaseUrl()}/courses/join/${courseId}/${token}`)
  }, [token])

  console.log('InviteLinkDialog', token)
  console.log(window.location.hostname)
  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>
          Einladungslink
        </DialogTitle>        
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={submitting}         
        >
          <CircularProgress />        
        </Backdrop>         
        <Box>
          <DialogContent>
            <DialogContentText>   
              {
                token &&
                <>
                  <Typography variant='body1' component='span'>
                    Ihr Einladungslink für den ausgewählten Kurs.<br/><br/>                
                  </Typography>              
                  <Box sx={{backgroundColor: theme.palette.grey[700]}} width='fit-content'>
                    <Typography variant='subtitle2' component='span' sx={{paddingLeft: 1}}>              
                      {shortenText(inviteLink, 40)}   
                    </Typography>
                    <IconButton onClick={handleCopyLinkToClipboard}>
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton onClick={handleCreateQRCode}>
                      <QrCode2Icon />
                    </IconButton>
                  </Box>
                </>
                ||
                <>
                  <Typography variant='body1' component='span'>
                    Erstellen Sie einen neuen Einladungslink für den ausgewählten Kurs.<br/><br/>                
                  </Typography>  
                </>
              }          
            </DialogContentText>    
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={handleConfirm}>Link generieren</Button>
            { token && 
              <>
                <Button variant='contained' color='warning' onClick={handleInvalidateToken}>Link deaktivieren</Button>
              </>
            }
            <Button onClick={handleCancel}>Schließen</Button>
          </DialogActions>
        </Box>   
        <Box id='qrcode' width='fit-content' display='none' ref={qrDiv}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography id='appchen' variant='h4' component='span' align='center' sx={{width: '100%'}}>
              Appchen<br/>
            </Typography>            
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography id='info' variant='body1' component='span' align='center' sx={{width: '100%'}}>
            {courseName} - {courseLevel}
            </Typography>            
          </Box>
          <Box ref={code}/>
        </Box>
      </Dialog>
    </div>
  )
}
