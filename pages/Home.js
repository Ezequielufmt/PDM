
import React from 'react';
import { View } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
 
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tabelaProduto'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tabelaProduto', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tabelaProduto(idProduto INTEGER PRIMARY KEY AUTOINCREMENT, nomeProduto VARCHAR(100), valorVenda INT(10))',
              []
            );
          }
        }
      );
    });
  }
 
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#E7BC68',
          flexDirection: 'column',
        }}>
        <Mytext text="MENU" />
        <Mybutton
          title="Produtos"
          customClick={() => this.props.navigation.navigate('ListarProduto')}
        />
        <Mybutton
          title="Deletar"
          customClick={() => this.props.navigation.navigate('Delete')}
        />
        </View>
    );
  }
}