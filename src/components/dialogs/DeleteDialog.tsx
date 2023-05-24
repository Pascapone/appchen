import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dropdown from '../inputs/Dropdown';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function DeleteDialog({title="Löschen", deleteText, open, submitting, handleCancel, handleConfirm} : {title: string, deleteText: string, open: boolean, submitting: boolean, handleCancel: () => void, handleConfirm: () => void}) {  

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>
          {title}
        </DialogTitle>        
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={submitting}
          title='Löschen...'            
        >
          <CircularProgress />        
        </Backdrop>         
        <Box>
          <DialogContent>
            <DialogContentText>              
              <Typography variant='body1' component='span'>
                {deleteText}<br/><br/>
              </Typography>      
              <Typography variant='body1' component='span' color='red'>
                Achtung diese Aktion ist unwiderruflich!<br/><br/>
              </Typography>          
            </DialogContentText>    
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Abbrechen</Button>
            <Button color='warning' variant='contained' onClick={() => handleConfirm()}>Löschen</Button>
          </DialogActions>
        </Box>   
      </Dialog>
    </div>
  );
}