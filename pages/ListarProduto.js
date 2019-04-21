
import React from 'react';
import { FlatList, Text, View, ActivityIndicator, TouchableOpacity, StyleSheet  } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
import Mybutton from './components/Mybutton';

var db = openDatabase({ name: 'UserDatabase.db' });

export default class ListarProduto extends React.Component {
   static navigationOptions = ({ navigation }) => {
      let headerStyle = { backgroundColor: '#BF3A81' };
      let headerTitle = 'Produtos';
      let headerTitleStyle = { color: 'white' };
      let headerRight = (<TouchableOpacity
            style={styles.btnAdd}            
            onPress={() => { navigation.navigate('AddProduto');
            }}
          >
            <Text style={{ color: 'white'}}>Add</Text>
          </TouchableOpacity>   );
      return { headerTitle, headerTitleStyle, headerRight, headerStyle }
   }


  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tabelaProduto', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }

  render() {
    return (
      
        <View style={{ backgroundColor: '#E7BC68', paddingTop: 20, flex: 1 }}>        
               
        <FlatList
          data={this.state.FlatListItems}          
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.idProduto} style={{ backgroundColor: 'white', padding: 10, marginHorizontal: 35, marginVertical: 2, borderRadius: 5 }}>
              <Text>Id: {item.idProduto}</Text>
              <Text>Descrição: {item.nomeProduto}</Text>
              <Text>Valor: R$ {item.valorVenda}</Text>
                          
            </View>      
          )}
        />
      </View>



    );
  }
}


const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: '#7EA135',
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginHorizontal: 35,
    borderRadius: 5
  },

});