import React from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material'

import { ALL_PAIRS } from '@/constants'
import { Pair } from '@/types'
import { toDisplayPair, getCoinImageUrl } from '@/utils'

type Props = {
  onChangePair: (pair: Pair) => void
}

const DrawerInner: React.VFC<Props> = ({ onChangePair }) => {
  return (
    <React.Fragment>
      <List>
        {ALL_PAIRS.map((pair) => (
          <ListItem button key={pair} onClick={() => onChangePair(pair)}>
            <ListItemIcon sx={{ minWidth: 24 }}>
              <Avatar src={getCoinImageUrl(pair)} sx={{ width: 15, height: 15, my: 'auto' }} />
            </ListItemIcon>
            <ListItemText primary={toDisplayPair(pair)} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </React.Fragment>
  )
}

export default DrawerInner
