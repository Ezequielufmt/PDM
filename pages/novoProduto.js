
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
 
export default class novoProduto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome_produto: '',
      valor_venda: '',
  
    };
  }
 
  salvarProduto = () => {
    var that = this;
    const { nome_produto } = this.state;
    const { valor_venda } = this.state; 
    
    if (nome_produto) {
      if (valor_venda) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO tabelaProduto (nomeProduto, valorVenda) VALUES (?,?)',[nome_produto, valor_venda],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Sucesso',
                    'Cadastro realizado com sucesso!',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Falha no registro!');
                }
              }
            );
          });       
      } else {
        alert('Preencha o campo Valor');
      }
    } else {
      alert('Preencha o campo Descrição');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: '#E7BC68', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Descrição"
              onChangeText={nome_produto => this.setState({ nome_produto })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Valor de venda"
              onChangeText={valor_venda => this.setState({ valor_venda })}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding:10 }}
            />
            <Mybutton
              title="Salvar"
              customClick={this.salvarProduto.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}