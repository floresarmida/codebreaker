import React from 'react'

import {CardHeader, CardMedia, CardText} from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'

import TestCases from '../components/TestCases'

const Nav = () => (
  <div>
    <CardMedia>
      <img src='https://learncryptography.com/assets/img/content/caesar_cipher.png'
        alt='Visual of a Caesar Cipher'
      />
    </CardMedia>
    <Subheader>About this tool</Subheader>
    <CardText>
      This is a query tool for a Caesar Cipher Codebreaking API I've developed for this assignment. I figured this would be a more fun solution to Paper Three, because were I to decode a transposition cipher in a higher level language, it would take maybe 20 lines of code. Still, the assignment is to build something in Python/Java, *not* Golang / web technology, so I can make a CLI codebreaker instead if you want.
      <br /><br />
      <em>Note: I've limited queries to a 255 character maximum, so you don't 403 the server</em>
    </CardText>
    <List>
      <Subheader>Location</Subheader>
      <ListItem disabled primaryText='http://138.68.21.112' />
      <Subheader>Test Cases (Click to Copy)</Subheader>
      <TestCases />
    </List>
  </div>
)

export default Nav
