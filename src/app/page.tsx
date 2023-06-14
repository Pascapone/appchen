"use client"

import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import { Typography } from '@mui/material'

const Home = ({signOut, user}: WithAuthenticatorProps) => {  


  return (
    <div>      
      <Typography variant='h4'>Appchen</Typography>
      <Typography variant='body1'>Willkommen im Appchen!</Typography>
      <Typography variant='body1'>Es handelt sich bei dieser App um ein Testprodukt. Die Ladezeiten können etwas länger sein und es kann unter Umständen zu Fehlern kommen.</Typography>
      <Typography variant='body1'>Bei Problemen mit der App schreibt mir (Pascal) einfach per WhatsApp. Ich wünsche euch viel Spaß bei euren Textproduktionen.</Typography>
    </div>
  )
}
export default withAuthenticator(Home);