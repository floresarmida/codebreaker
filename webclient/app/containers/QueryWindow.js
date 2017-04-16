import React from 'react'

import { connect } from 'react-redux'
import { decodeCaesar } from '../actions'
//  Reset is called by submission (async via thunk)

import SolutionCard from '../components/SolutionCard'
import Composer from '../components/Composer'

import Paper from 'material-ui/Paper'

const Container = ({solutions = [], submit}) => (
  <div>
    <div id='chat'>
      {solutions.map((m, i) => (
        <div key={i}>
          <SolutionCard content={m.solution} />}
        </div>
      ))}
    </div>
    <footer>
      <Paper style={{backgroundColor: '#CFD8DC', padding: '0 16'}}>
        <Composer onSubmit={(e) => submit(e)} />
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
const QueryWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
export default QueryWindow
