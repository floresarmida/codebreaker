import React from 'react'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

const SolutionCard = ({source, solutions}) => (
  <Card>
    <CardHeader title='Casar Transposition Solutions'
      subtitle={`Query: ${source}`}
    />
    <CardText>{solutions[13]}</CardText>
  </Card>
)
export default SolutionCard
