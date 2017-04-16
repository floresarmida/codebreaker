import React from 'react'

import { connect } from 'react-redux'
import { decodeCaesar } from '../actions'
//  Reset is called by submission (async via thunk)

import SolutionCard from '../components/SolutionCard'
import QueryComposer from '../components/QueryComposer'

import Paper from 'material-ui/Paper'

const Container = ({queries = [], submit}) => (
  <div>
    <div id='chat'>
      {queries.map((m, i) => (
        <SolutionCard key={i}
          source={m.source} solutions={m.solutions}
        />
      ))}
    </div>
    <footer>
      <Paper style={{backgroundColor: '#CFD8DC', padding: '0 16'}}>
        <QueryComposer onSubmit={(e) => submit(e)} />
      </Paper>
    </footer>
  </div>
)

const mapStateToProps = (state) => {
  let room = 'MAIN'
  switch (room) {
    case 'MAIN':
      return state.chat
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submit: (e) => dispatch(decodeCaesar(e))
  }
}
const QueryTool = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
export default QueryTool
