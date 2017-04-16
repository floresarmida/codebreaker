import React from 'react'

import {Card, CardHeader, CardText} from 'material-ui/Card'

// const styles = {
//   card: {
//     margin: 16
//   },
//   cardHeader: {
//     padding: '8px 16px'
//   },
//   cardText: {
//     padding: '8px 16px'
//   }
// }
const SolutionCard = ({source, solutions}) => (
  <Card>
    <CardHeader title='Casar Transposition Solutions'
      subtitle={`Query: ${source}`}
    />
    <CardText>{solutions[13]}</CardText>
  </Card>
)
export default SolutionCard
