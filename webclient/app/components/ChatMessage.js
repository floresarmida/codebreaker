import React from 'react'

import {Card, CardHeader, CardText} from 'material-ui/Card'

const styles = {
  card: {
    margin: 16
  },
  cardHeader: {
    padding: '8px 16px'
  },
  cardText: {
    padding: '8px 16px'
  }
}
const ChatMessage = ({message}) => (
  <Card style={styles.card}>
    <CardHeader title='User Name' subtitle='Timestamp'
      style={styles.cardHeader} />
    <CardText style={styles.cardText}>
      {message}
    </CardText>
  </Card>
)
export default ChatMessage
