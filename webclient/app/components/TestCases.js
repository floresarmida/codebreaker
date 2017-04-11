import React from 'react'

import {CardText} from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import Chip from 'material-ui/Chip'
import CopyToClipboard from 'react-copy-to-clipboard'

const styles = {
  chip: {
    margin: '8px 0',
    //  The following statements enable the final
    display: 'block',
    maxWidth: 260,
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
  expect: 'All but images'
}, {
  case: 'http://www.cnn.com/2017/04/10/politics/us-aircraft-carrier-carl-vinson-north-korea-strike-capabilities/index.html',
  expect: 'All properties'
}, {
  case: 'https://angular.io/docs/ts/latest/',
  expect: 'All propeties (gathered from absolute paths)'
}]

const TestCases = () => (
  <div>
    <Subheader>
      Test Cases
    </Subheader>
    <CardText>
      Plaintext will post as plain messages with placeholder data for users. If you post a standalone link with a protocol (http/https), it will trigger the OpenGraph API on the golang backend. Click any of the below test cases to copy them:
      {tests.map((t, i) => (
        <div key={i} >
          <CopyToClipboard text={t.case}>
            <Chip style={styles.chip}>{t.case}</Chip>
          </CopyToClipboard>
          <span>Expected: {t.expect}</span>
        </div>
      ))}
    </CardText>
  </div>
)

export default TestCases
