import React from 'react'

import {Card, CardHeader} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

//  Nice for UX, though overkill
import CopyToClipboard from 'react-copy-to-clipboard'

const SolutionCard = ({source, solutions}) => (
  <Card style={{marginTop: 32}}>
    <CardHeader title='Transposition Solutions - Click to Copy'
      subtitle={`Query: ${source}`}
    />
    <List>
      {solutions.map((s, i) => (
        <CopyToClipboard key={i} text={s}>
          <ListItem
            key={i} primaryText={s}
            leftAvatar={
              <Avatar size={30} style={{margin: 5}}
                backgroundColor={'#388e3c'}
              >
                {i}
              </Avatar>}
            />
        </CopyToClipboard>
        ))}
    </List>
  </Card>
)
export default SolutionCard
