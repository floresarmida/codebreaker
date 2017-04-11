import React from 'react'

import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Link from 'material-ui/svg-icons/content/link'

//  OG Props: Title, Type, Image, Source Url | Optional (but common): description
const styles = {
  cardHeader: {
    padding: '8px 16px'
  },
  cardText: {
    padding: '8px 16px'
  }
}

const ChatMessage = ({message}) => (
  <Card style={{margin: 16}}>
    {message.og // If OpenGraph
      ? <div>
        {message.og.image
          //  OG Image present
          ? <CardMedia
            overlay={<CardTitle
              title={message.og.title ? message.og.title : 'Shared'}
              subtitle={message.og.description}
            />}>
            <img src={message.og.image} />
          </CardMedia>
          //  No OG Image
          : <CardTitle
            title={message.og.title ? message.og.title : 'Shared Link'}
            subtitle={message.og.description}
            />
        }
        <CardActions>
          <a href={message.og.url} target='_blank'>
            <FlatButton label='Link'
              primary icon={<Link />} />
          </a>
        </CardActions>
      </div>
    //  Non-OG message
    : <div>
      <CardHeader title='User Name' subtitle='Timestamp'
        style={styles.cardHeader} />
      <CardText style={styles.cardText}>
        {message.text}
      </CardText>
    </div>
    }
  </Card>
)
export default ChatMessage
