import React, {Component} from 'react'

import {
  // Button,
  StyleSheet,
  Alert,
  Image,
} from 'react-native'

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  // Text,
  Card, CardItem, Text, Icon
 } from 'native-base';

// import Icon from 'react-native-vector-icons/FontAwesome';

export default class Sidebar extends Component {

  render () {

    // <Header>
    // <Title>Gnosis España</Title>
    // </Header>
    return (
      <Container>
        <Content>
          <Image
            style={{width: 300, height: 150}}
            source={{uri: 'http://gnosisespaña.es/wp-content/uploads/2016/09/Encontrar-EsLibertad.jpg'}}
          />
          <Card>
            <CardItem>
                <Icon name="logo-googleplus" style={{ color: '#DD5044' }} />
                <Text>Google Plus</Text>
            </CardItem>
         </Card>
        </Content>
      </Container>
    )
    // <Button style={{width: 300}} onPress={() => {
    //   alert('asdf')
    // }}>
    // <Text style={{color: '#fff'}}>Conferencias</Text>
    // </Button>
    // <Button style={{width: 300, backgroundColor: 'red'}}>
    // <Text style={{color: '#fff'}}>Conferencias</Text>
    // </Button>
    // <Button style={{width: 300, marginVertical: 20, backgroundColor: 'red'}}>
    // <Text style={{color: '#fff'}}>Primera Camara</Text>
    // </Button>
    // <Button style={{width: 300, marginVertical: 20, backgroundColor: 'purple'}}>
    // <Text style={{color: '#fff'}}>Primera Camara</Text>
    // </Button>
  }

  alert () {
    Alert.alert('some alert')
  }
}

const style = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    height: 200,
    paddingVertical: 20,
  },
  button: {
    marginTop: 10
  },
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around'
  },
  content: {

  }
})
