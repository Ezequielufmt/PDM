
import React from 'react';
import { Image, TouchableHighlight } from 'react-native';

import {createStackNavigator,createAppContainer} from 'react-navigation';
import Home from './pages/Home';
import novoProduto from './pages/novoProduto';
import DeleteProduto from './pages/DeleteProduto';
import ListarProduto from './pages/ListarProduto';

 



const App = createStackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      title: 'TELA INICIAL',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },

  ListarProduto: {
    screen: ListarProduto,   
  },
  AddProduto: {
    screen: novoProduto,
    navigationOptions: {
      title: 'Novo Produto',
      headerStyle: { backgroundColor: '#BF3A81' },
      headerTintColor: '#ffffff',
    },
  },
  Delete: {
    screen: DeleteProduto,
    navigationOptions: {
      title: 'Deletar produto',
      headerStyle: { backgroundColor: '#1976D2' },
      headerTintColor: '#ffffff',
    },
  },

});

export default createAppContainer(App);