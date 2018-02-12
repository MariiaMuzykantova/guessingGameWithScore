import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, AsyncStorage } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userGuessedNumber: '',
      message: 'Guess a number between 1-100',
      correctAnswer: Math.floor(Math.random() * 100) + 1,
      counter: 0
    }
  }
  resultPushing = async () => {
    try {
      await AsyncStorage.setItem('highscore', this.state.counter);
    } catch (err) {
      Alert.alert(err);
    }

    try {
      let value = await AsyncStorage.getItem('highscore');
    } catch (error) {
      Alert.alert(error);
    }
  }

  evaluateAnswer = () => {
    this.setState({ counter: this.state.counter + 1 }, function () {
      if (this.state.userGuessedNumber == this.state.correctAnswer) {
        this.resultPushing();
        Alert.alert('Your highscore is ' + this.state.counter + ' guesses!\nThe game is over.')
      }
      else if (this.state.userGuessedNumber < this.state.correctAnswer) {
        this.setState({ message: 'Your guess ' + this.state.userGuessedNumber + ' is too low' });
      }
      else {
        this.setState({ message: 'Your guess ' + this.state.userGuessedNumber + ' is too high' });
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>
        <TextInput value={this.state.userGuessedNumber}
          style={{ width: 100, borderColor: 'gray', borderWidth: 1 }}
          keyboardType='phone-pad'
          onChangeText={(userGuessedNumber) => this.setState({ userGuessedNumber })}
        />
        <Button onPress={this.evaluateAnswer} title="MAKE GUESS" style={styles.button} color='#0066ff' />
        <Text>Highscore: {this.state.counter} guesses</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});