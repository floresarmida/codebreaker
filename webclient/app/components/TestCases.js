import React from 'react'

import {ListItem} from 'material-ui/List'

import CopyToClipboard from 'react-copy-to-clipboard'

const styles = {
  listItem: {
    //  Styles required for ellipsis overflow
    display: 'block',
    maxWidth: 300,
    overflowX: 'hidden',
    textOverflow: 'ellipsis'
  }
}

const tests = [{
  case: '[Rwbnac 90b Anonanwln Qnan]',
  expect: '(17) [Insert 90s Reference Here]'
}, {
  case: 'ubhfgba, jr unir n ceboyrz',
  expect: '(13) Houston, we have a problem'
}, {
  case: 'FYAI RFC NJYLCR',
  expect: '(2) HACK THE PLANET'
}, {
  case: 'Cqn Ljtn rb j Urn',
  expect: '(17) The Cake is a Lie'
}]
const TestCases = () => (
  <div>
      {tests.map((t, i) => (
        <CopyToClipboard key={i} text={t.case}>
          <ListItem style={styles.listItem}
            primaryText={t.case}
            secondaryText={t.expect}
          />
        </CopyToClipboard>
      ))}
  </div>
)

export default TestCases
