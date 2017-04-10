import React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

//  TODO: RoomSelector component, state and behavior reg. room selection.
const Nav = () => (
  <div>
    <CardMedia
      overlay={<CardHeader title='Deploying to the Cloud' subtitle='Slouch v0.2 - Ryan Keller' />}
    >
      <img src='https://domenicoluciani.com/assets/images/covers/gopher.jpg' />
    </CardMedia>
    <Subheader>
      Overview
    </Subheader>
    <CardText>
      Slouch Chat is the foundation for INFO 344's final deliverable - a fully functional slack clone. This version (v0.2) fulfils the core requirements for the Cloud Deployment assignment, but I've also laid the foundation for a highly scalable application.
    </CardText>
    <List>
      <Subheader>Technology Stack</Subheader>
      <ListItem innerDivStyle={{color: 'black !important'}}
        primaryText='React.JS'
        secondaryText='Front-End Framework'
        leftAvatar={<Avatar src='https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' />}
      />
      <ListItem
        primaryText='Redux - Flux Architecture'
        secondaryText='Design Pattern'
        leftAvatar={<Avatar src='https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png' />}
      />
      <ListItem
        primaryText='Material-UI'
        secondaryText='UI Kit'
        leftAvatar={<Avatar src='http://www.material-ui.com/images/components.svg' />}
      />
      <ListItem
        primaryText='Go'
        secondaryText='Back-End & RESTful API'
        leftAvatar={<Avatar src='http://www.unixstickers.com/image/cache/data/stickers/golang/golang.sh-600x600.png' />}
      />
      <ListItem
        primaryText='DigitalOcean'
        secondaryText='Low Level IaaS'
        leftAvatar={<Avatar src='https://a248.e.akamai.net/secure.meetupstatic.com/photos/member/2/d/f/e/highres_255491774.jpeg' />}
      />
      <ListItem
        primaryText='Docker'
        secondaryText='Production Environment'
        leftAvatar={<Avatar src='https://d3nmt5vlzunoa1.cloudfront.net/phpstorm/files/2015/10/large_v-trans.png' />}
      />
    </List>
    <Subheader>
        Key Facts:
    </Subheader>
    <CardText>
      <ul>
        <li>
          <b>API Host:</b> http://138.68.249.21/
        </li>
        <li>
          <b>WebClient Host:</b> http://138.68.245.192/
        </li>
      </ul>
    </CardText>
  </div>
)

export default Nav
