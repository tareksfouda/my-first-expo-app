import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View  } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class HomeScreen extends Component {
    componentDidMount(){
        return fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json')
          .then((response) => response.json())
          .then((responseJson) => {
            // console.log(responseJson);
            this.setState({
              isLoading: false,
              dataSource: responseJson.rounds,
            }, function(){
      
            });
      
          })
          .catch((error) =>{
            console.error(error);
          });
      };

  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  };

  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={styles.container}>
          {
            this.state.dataSource.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                leftIcon={{name: 'soccer-ball-o', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('Details', {
                    matches: `${JSON.stringify(item.matches)}`,
                  });
                }}
                badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 }}}
                subtitle={'hello'}
                chevron
              />
            ))
          }
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingBottom: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    activity: {
      flex: 1,
      padding: 20,
    }
  })
  
export default HomeScreen;