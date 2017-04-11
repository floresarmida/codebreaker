import React from 'react'

import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Link from 'material-ui/svg-icons/content/link'

//  OG Props: Title, Type, Image, Source Url | Optional (but common): description
const styles = {
  card: {
    margin: 16
  }
}
const OpenGraphMessage = ({
  image,
  title = 'Shared Link',
  description,
  url, source  //  User argument for message, backup if !url
}) => (
  <Card style={styles.card}>
    {image
      ? <CardMedia
        overlay={<CardTitle
          title={title}
          subtitle={description}
        />}>
        <img src={image} />
      </CardMedia>
      //  No Image
      : <CardTitle title={title} subtitle={description} />
    }
    <CardActions>
      <a href={url || source} target='_blank'>
        <FlatButton label='Link'
          primary icon={<Link />} />
      </a>
    </CardActions>
    }
  </Card>
)
export default OpenGraphMessage
