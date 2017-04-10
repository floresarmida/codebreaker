import React from 'react'

import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Link from 'material-ui/svg-icons/content/link'

//  OG Props: Title, Type, Image, Source Url | Optional (but common): description
const ChatMessage = ({message}) => (
  <Card style={{margin: 16}}>
    {message.og
      ? <div>
        <CardMedia
          overlay={<CardTitle title={message.og.title} subtitle={message.og.description ? message.og.description : 'Shared Link'} />}
        >
          <img src={message.og.image} />
        </CardMedia>
        <CardActions>
          <a href={message.og.url} target='_blank'>
            <FlatButton label='Link'
              primary icon={<Link />} />
          </a>
        </CardActions>
      </div>
    : <div>
      <CardHeader title='User Name' subtitle='Timestamp'
        style={{padding: '8px 16px'}} />
      <CardText
        style={{padding: '8px 16px'}}
      >
        {message.text}
      </CardText>
    </div>
    }
  </Card>
)
export default ChatMessage
