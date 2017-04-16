import React from 'react'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

const SolutionCard = ({source, solutions}) => (
  <Card>
    <CardHeader title='Transposition Solutions'
      subtitle={`Query: ${source}`}
    />
    <CardText>{solutions[13]}</CardText>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Key</TableHeaderColumn>
          <TableHeaderColumn>Solution</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(solutions).forEach((key) => (
          <TableRow>
            <TableRowColumn>Key: {key}</TableRowColumn>
            <TableRowColumn>Solution: {solutions[key] && console.log(solutions[key])}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
)
export default SolutionCard
