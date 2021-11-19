import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { addCardToTheDeck } from '../../actions/index';
import CustomClickButton from '../component/CustomClickButton';
import { white, purple, gray, lightPurp } from '../../utils/colors';
import { connect } from 'react-redux';

class NewCard extends Component {

    state = {
        question: '',
        answer: ''
    };
      
    handleQuestionChange = question => {
        this.setState({ question });
    };

    handleAnswerChange = answer => {
        this.setState({ answer });
    };

    handleSubmit = () => {
        
        const { addCardToTheDeck, title, navigation } = this.props;

        const card = {
          question: this.state.question,
          answer: this.state.answer
        };

        addCardToTheDeck(title, card);
    
        this.setState({ question: '', answer: '' });

        navigation.navigate("DeckDetails");
    };

    render() {
        return (
          <View style={styles.container}>
            <View>
              <View style={styles.block}>
                <Text style={styles.title}>Add a question</Text>
              </View>
              <View style={[styles.block]}>
                <TextInput
                  style={styles.input}
                  value={this.state.question}
                  onChangeText={this.handleQuestionChange}
                  placeholder="Question"
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => this.answerTextInput.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View style={[styles.block]}>
                <TextInput
                  style={styles.input}
                  value={this.state.answer}
                  onChangeText={this.handleAnswerChange}
                  placeholder="Answer"
                  ref={input => {
                    this.answerTextInput = input;
                  }}
                  returnKeyType="done"
                  onSubmitEditing={this.handleSubmit}
                />
              </View>
              <CustomClickButton
                btnStyle={{ backgroundColor: gray, borderColor: '#fff' }}
                onPress={this.handleSubmit}
                disabled={this.state.question === '' || this.state.answer === ''}
              >
                Submit
              </CustomClickButton>
            </View>
            <View style={{ height: '30%' }} />
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
      backgroundColor: lightPurp,
      justifyContent: 'space-around'
    },
    block: {
      marginBottom: 20
    },
    title: {
      textAlign: 'center',
      fontSize: 32
    },
    input: {
      borderWidth: 1,
      borderColor: purple,
      backgroundColor: '#fff',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      fontSize: 20,
      height: 40
    }
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');
    return {
      title
    };
  };
  

const mapDispatchToProps = (dispatch) => (
    {
      addCardToTheDeck: (title, card)=>dispatch(addCardToTheDeck(title, card))
    }
)
  
export default connect(mapStateToProps,mapDispatchToProps)(NewCard);