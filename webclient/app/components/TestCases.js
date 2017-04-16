import React from 'react'

import Subheader from 'material-ui/Subheader'
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
  case: 'http://ogp.me/',
  expect: 'All properties'
}, {
  case: 'https://en.wikipedia.org/wiki/Julian_Assange',
  expect: 'No properties'
}, {
  case: 'http://www.cnn.com/',
  expect: 'Core properties w/o image'
}, {
  case: 'http://www.cnn.com/2017/04/10/politics/us-aircraft-carrier-carl-vinson-north-korea-strike-capabilities/index.html',
  expect: 'All properties'
}]
const TestCases = () => (
  <div>
      {tests.map((t, i) => (
        <CopyToClipboard key={i} text={t.case}>
          <ListItem style={styles.listItem}
            primaryText={t.case}
            secondaryText={`Expected: ${t.expect}`}
          />
        </CopyToClipboard>
      ))}
  </div>
)

export default TestCases
