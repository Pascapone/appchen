import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { shortenText } from '@/utils/textUtils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/material';

interface DialogProps {
  open: boolean,
  submitting: boolean,
  token: string,
  handleCancel: () => void,
  handleConfirm: () => void
}

export default function InviteLinkDialog({
  open, 
  submitting, 
  token,
  handleCancel, 
  handleConfirm
}: DialogProps) {

  const [inviteLink, setInviteLink] = useState('')

  const theme = useTheme()

  const getBaseUrl = () => {    
    const port = window.location.port
    const hostname = window.location.hostname
    if(hostname === 'localhost'){
      return `http://${hostname}:${port}`
    }
    return `https://${hostname}`
  }  

  useEffect(() => {
    if(!token) return
    setInviteLink(`${getBaseUrl()}/courses/join/${token}`)
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
                    <IconButton onClick={() => navigator.clipboard.writeText(inviteLink)}>
                      <ContentCopyIcon />
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
            <Button onClick={handleCancel}>Schließen</Button>
          </DialogActions>
        </Box>   
      </Dialog>
    </div>
  )
}
