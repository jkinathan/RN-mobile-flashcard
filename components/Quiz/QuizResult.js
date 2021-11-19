import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { gray, red, green,  azure ,lightPurp, white, orange, customRedColor  } from '../../utils/colors';
import CustomClickButton from "../component/CustomClickButton"

class QuizResult extends Component {


    state = {
        status: true
    }

    componentDidMount() {
        if(this.props.quizFinished == true) {
            this.setState({
                status: false
            })
        }
    }

    render() {

        const {deck, handleReset, returnBack, percent, correctAnswer , incorrectAnswer, score } = this.props;

        return (
            <View style={styles.mainView}>
                <Text style={styles.quizFinishedText}>Quiz Finished!</Text>
                <Text style={[styles.questionText, styles.textCenter]}>Deck Title : {deck.title}</Text>
                <View style={styles.quizReview}>
                    <Text style={[styles.questionText, styles.textCenter]}>Quiz Result Review</Text>
                    <Text style={[styles.questionText, styles.textCenter]}>Score : {score}</Text>
                    <Text style={[styles.questionText, styles.textCenter]}>Correct Answer : {correctAnswer}</Text>
                    <Text style={[styles.questionText, styles.textCenter]}>Incorrect Answer : {incorrectAnswer}</Text>
                    <Text style={[styles.questionText, styles.textCenter]}>Score Percentage : {percent} %</Text>
                </View>
                <CustomClickButton
                        btnStyle={{ backgroundColor: orange, borderColor: white }}
                        onPress={() => handleReset()}
                        disabled={this.state.status == true}
                    >
                        Reset Quiz
                </CustomClickButton>

                <CustomClickButton
                        btnStyle={{ backgroundColor: gray, borderColor: white }}
                        onPress={() => returnBack()}
                        disabled={this.state.status == true}
                    >
                        Go Back
                </CustomClickButton>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex:1,
        justifyContent: 'space-between',
        backgroundColor: lightPurp,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
    },
    quizFinishedText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: customRedColor,
        paddingTop: 30,
        paddingBottom: 20,
      },
    questionText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: white,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    textCenter: {
        textAlign: 'center'
    },
    quizReview: {
        backgroundColor: azure,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    }
});

export default QuizResult;