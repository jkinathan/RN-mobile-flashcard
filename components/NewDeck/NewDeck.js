import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TextInput } from 'react-native';

import { addDeck } from '../../actions/index';
import CustomClickButton from '../component/CustomClickButton';
import { white, orange, gray, lightPurp } from '../../utils/colors';

class NewDeck extends Component {

    state = {
       text: ''
    };
      
    handleChange = text => {
       this.setState({ text });
    };

    handleSubmit = () => {

        const { addDeck, navigation } = this.props;
        const { text } = this.state;
        addDeck(text);

        navigation.navigate("Decks");
        this.setState(() => ({ text: '' }));
    }

    render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>Write a Title of New Deck</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
        </View>
        <CustomClickButton
          btnStyle={{ backgroundColor: orange, borderColor: white }}
          onPress={this.handleSubmit}
          disabled={this.state.text === ''}
        >
          Create Deck
        </CustomClickButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      backgroundColor: lightPurp
    },
    block: {
      marginBottom: 20
    },
    title: {
      textAlign: 'center',
      fontSize: 32,
      color: white
    },
    input: {
      borderWidth: 1,
      borderColor: gray,
      backgroundColor: white,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      fontSize: 20,
      height: 40,
      marginBottom: 20
    }
});

const mapDispatchToProps = (dispatch) => (
    {
        addDeck: (title) => dispatch(addDeck(title))
    }
)
  
export default connect(null, mapDispatchToProps)(NewDeck);
