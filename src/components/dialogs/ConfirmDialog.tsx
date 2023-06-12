import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';

import Loading from '@/components/display/Loading';

export type DialogStyle = 'success' | 'warning' | 'error' | 'info'

interface DialogProps {
  title?: string,
  dialogText: string,
  confirmButtonText?: string,
  dialogStyle?: DialogStyle,
  permanentWarning?: boolean,
  open: boolean,
  submitting: boolean,
  handleCancel: () => void,
  handleConfirm: () => void
}


export default function ConfirmDialog({
  title="Löschen", 
  dialogText, 
  confirmButtonText="Löschen",
  dialogStyle='success', 
  permanentWarning=false,
  open, 
  submitting, 
  handleCancel, 
  handleConfirm
} : DialogProps) {  

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>
          {title}
        </DialogTitle>        
        <Loading submitting={submitting} />       
        <Box>
          <DialogContent>
            <DialogContentText>              
              <Typography variant='body1' component='span'>
                {dialogText}<br/><br/>
              </Typography>  
              {permanentWarning &&
                <Typography variant='body1' component='span' color='red'>
                  Achtung diese Aktion ist unwiderruflich!<br/><br/>
                </Typography>    
              }                        
            </DialogContentText>    
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Abbrechen</Button>
            <Button color={dialogStyle} variant='contained' onClick={() => handleConfirm()}>{confirmButtonText}</Button>
          </DialogActions>
        </Box>   
      </Dialog>
    </div>
  );
}