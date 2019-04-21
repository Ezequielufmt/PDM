
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });


export default class DeleteProduto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
    };
  }
  deleteUser = () => {
    var that = this;
    const { input_user_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  tabelaProduto where idProduto=?',
        [input_user_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Produto deletado com sucesso!',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Por favor insira um Id válido');
          }
        }
      );
    });
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Digite um id"
          onChangeText={input_user_id => this.setState({ input_user_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Deletar"
          customClick={this.deleteUser.bind(this)}
        />
      </View>
    );
  }
}