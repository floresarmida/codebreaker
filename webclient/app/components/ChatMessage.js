import React from 'react'

// {
// "description": "The Open Graph protocol enables any web page to become a rich object in a social graph.",
// "image": "http://ogp.me/logo.png",
// "image:height": "300",
// "image:type": "image/png",
// "image:width": "300",
// "title": "Open Graph protocol",
// "type": "website",
// "url": "http://ogp.me/"
// }

import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Link from 'material-ui/svg-icons/content/link'

//  Title, type, image, source url | description
const ChatMessage = ({message}) => (
  <Card>
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
      <CardHeader title='User Name' subtitle='Timestamp' />
      <CardText>{message.text}</CardText>
    </div>
    }
  </Card>
)
export default ChatMessage
