import React from 'react'
import { List, ListItem, ListItemText, Divider } from '@mui/material'

import { ALL_PAIRS } from '@/constants'
import { Pair } from '@/types'
import { toDisplayPair } from '@/utils'

type Props = {
  onChangePair: (pair: Pair) => void
}

const DrawerInner: React.VFC<Props> = ({ onChangePair }) => {
  return (
    <>
      <List>
        {ALL_PAIRS.map((pair) => (
          <ListItem button key={pair} onClick={() => onChangePair(pair)}>
            <ListItemText primary={toDisplayPair(pair)} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  )
}

export default DrawerInner
