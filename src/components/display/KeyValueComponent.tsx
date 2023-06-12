import React from 'react'
import { Box, Button, Typography, Grid, ButtonGroup, Divider } from '@mui/material'
import { SxProps } from '@mui/system'

interface KeyValue {
  key: string
  component: React.ReactNode
}

interface KeyValueComponentProps {
  header: string,
  keyValues: KeyValue[],
  sx?: SxProps,
}

function KeyValueComponent({header, keyValues, sx}: KeyValueComponentProps) {

  return (
    <Box sx={sx}>
      <Typography variant='h6'>{header}</Typography>
      <Divider/>
      <Grid container>
        {keyValues.map(keyValue => {
          return( 
            <>
              <Grid item xs={4}>
                <Typography variant='body1'>{keyValue.key}</Typography>    
              </Grid>
              <Grid item xs={8}>
                {keyValue.component}
              </Grid>
              <Grid item xs={12}>
                <Divider/>
              </Grid>
            </>
          )
        })}       
      </Grid>
    </Box>
  )
}

export default KeyValueComponent