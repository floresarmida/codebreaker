import React from 'react'

import {CardHeader, CardMedia, CardText} from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import TestCases from '../components/TestCases'

const techStack = [{
  title: 'React.JS',
  subtitle: 'Front-End Framework',
  avatar: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'
}, {
  title: 'Redux - Flux Architecture',
  subtitle: 'Design Pattern',
  avatar: 'https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png'
}, {
  title: 'Material-UI',
  subtitle: 'UI Kit (JSS Styling)',
  avatar: 'http://www.material-ui.com/images/components.svg'
}, {
  title: 'Go',
  subtitle: 'Back-End & RESTful API',
  avatar: 'http://www.unixstickers.com/image/cache/data/stickers/golang/golang.sh-600x600.png'
}, {
  title: 'DigitalOcean',
  subtitle: 'Infrastructure Service',
  avatar: 'https://a248.e.akamai.net/secure.meetupstatic.com/photos/member/2/d/f/e/highres_255491774.jpeg'
}, {
  title: 'Docker',
  subtitle: 'Production Environment',
  avatar: 'https://d3nmt5vlzunoa1.cloudfront.net/phpstorm/files/2015/10/large_v-trans.png'
}]

//  TODO: RoomSelector component, state and behavior reg. room selection.
const Nav = () => (
  <div>
    <CardMedia
      overlay={<CardHeader style={{padding: 8}}
        title='Deploying to the Cloud'
        subtitle='Slouch v0.3 by Keller'
      />}
    >
      <img src='https://domenicoluciani.com/assets/images/covers/gopher.jpg'
        alt='Image of our hero, the golang gopher'
      />
    </CardMedia>
    <Subheader>
      Overview
    </Subheader>
    <CardText>
      Slouch Chat is the foundation for INFO 344's final deliverable - a fully functional slack clone. This version (v0.3) fulfils the core requirements for the Cloud Deployment assignment, and lays the foundation for the final deliverable.
      <br />
      Note: I am currently troubleshooting some issues with the actual API, despite passing tests I still have problems parsing HTML. Exceptions are toString'd and displayed both in the console and as a modal.
    </CardText>
    <List>
      <Subheader>Location</Subheader>
      <ListItem disabled
        primaryText='Client-Side'
        secondaryText='138.68.245.192'
      />
      <ListItem disabled
        primaryText='Back-End'
        secondaryText='138.68.249.21'
      />
      <Subheader>Technology Stack</Subheader>
      {techStack.map((item, i) => (
        <ListItem key={i} disabled
          primaryText={<b>{item.title}</b>}
          secondaryText={item.subtitle}
          leftAvatar={<Avatar src={item.avatar} />}
        />
      ))}
    </List>
    <TestCases />
  </div>
)

export default Nav
