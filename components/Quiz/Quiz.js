import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../../utils/notification';
import QuizError from "./QuizError";
import QuizResult from './QuizResult';
import { black, white, red, green, azure, lightPurp  } from '../../utils/colors';
import CustomClickButton from "../component/CustomClickButton"
import TextButton from "../component/TextButton"

class Quiz extends Component {

    state = {
        title: '',
        currentQuestion: '',
        currentAnswer: '',
        correctAnswer: 0,
        incorrectAnswer: 0,
        questionNumber: 0,
        numberOfQuestions: 0,
        score: 0,
        quizFinished: false,
        errorShow: false,
        questions: ''
    }

    resetQuiz = () => {
        this.setState({
          title: '',  
          currentQuestion: this.state.questions[0].question,
          currentAnswer: '',
          correctAnswer: 0,
          incorrectAnswer: 0,
          questionNumber: 1,
          score: 0,
          quizFinished: false,
          errorShow: false,
        });
    }

    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }

    componentWillMount() {
        const { navigation, deck } = this.props;
        const title = navigation.getParam('title', 'undefined');
        const questions = deck.questions;
        const currentQuestion = questions.length != 0 ? questions[0].question : "";

        this.setState({
            title: title,
            currentQuestion: currentQuestion,
            questionNumber: 1,
            questions: questions,
            numberOfQuestions: questions.length,
            quizFinished: false,
            errorShow: false,
        })
    }

    updateScore = () => {
        const newScore = this.state.score + 1;
        this.setState({
          score: newScore
        })
    }

    showAnswer = () => {

        if (this.state.currentAnswer === '')
          this.setState({
            currentAnswer: this.state.questions[this.state.questionNumber-1].answer,
            errorShow: false
        })
    }

    nextQuestion = (isCorrect) => {
        
        
        if (this.state.currentAnswer === '') {
            this.setState({
                errorShow: true
            });
        }
        else {

            if (isCorrect) {

                this.setState({
                    correctAnswer: this.state.correctAnswer + 1
                });

                this.updateScore();
            }else {
    
                this.setState({
                    incorrectAnswer: this.state.incorrectAnswer + 1
                })

            }


            this.updateQuestion();

        }
        
    }

    updateQuestion = () => {
        const newQuestionNumber = this.state.questionNumber + 1;
        if (newQuestionNumber-1 < this.state.numberOfQuestions) {
            this.setState({
              currentAnswer: '',
              currentQuestion: this.state.questions[newQuestionNumber-1].question,
              questionNumber: newQuestionNumber,
            });
        } else {
            this.setState({
                quizFinished: true
            })
        }
    }

    backToDeckDetails = () => {
        this.props.navigation.navigate(
          'Decks'
        );
    }

    render() {

        const {numberOfQuestions, quizFinished } = this.state;

        if (numberOfQuestions === 0) {
            return <QuizError />;
        }

        console.log("quizFinished : ", quizFinished);

        if (quizFinished === true) {
            const { correctAnswer, incorrectAnswer , numberOfQuestions, score } = this.state;
            const scorePercentValue = ((correctAnswer / numberOfQuestions) * 100).toFixed(0);
            
            return (
                <QuizResult
                    deck={this.props.deck}
                    navigation={this.props.navigation}
                    handleReset={this.resetQuiz}
                    percent={scorePercentValue}
                    correctAnswer = {correctAnswer}
                    incorrectAnswer = {incorrectAnswer}
                    score = {score}
                    returnBack = {this.backToDeckDetails}
                    quizFinished = {quizFinished}
                />
            );
        }

        return (

            <View style={styles.mainView}>
                <View style={styles.header}>
                    <Text style={{fontSize: 20, alignItems: 'flex-start' ,color: white}}>{this.state.title} Quiz</Text>
                    <Text style={{fontSize: 20, alignItems: 'flex-end' ,color: white}}>Score: {this.state.score}</Text>
                </View>

                <View>
                    <View>
                        <Text style={styles.titleText}>Question {this.state.questionNumber} of {this.state.numberOfQuestions}</Text>
                    </View>
                    <Text style={styles.questionText}>
                        {this.state.currentQuestion}
                    </Text>

                    <TextButton style={styles.buttonText} 
                                onPress={() => this.showAnswer()}>
                                Show Answer
                    </TextButton>

                    <Text style={styles.questionText}>
                          {this.state.currentAnswer}
                    </Text>

                    <CustomClickButton
                        btnStyle={{ backgroundColor: green, borderColor: white }}
                        onPress={() => this.nextQuestion(true) }
                        disabled={this.state.quizFinished == true}
                    >
                        Correct
                    </CustomClickButton>

                    <CustomClickButton
                        btnStyle={{ backgroundColor: red, borderColor: white }}
                        onPress={() => this.nextQuestion(false)}
                        disabled={this.state.quizFinished == true}
                    >
                        InCorrect
                    </CustomClickButton>

                    { this.state.errorShow &&
                        <Text style={styles.questionText}>
                            Please, click answer first
                        </Text>
                    }

                </View>

            </View>
        )
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 20,
        color: white
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: white,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: white,
        backgroundColor: azure,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 20,
        borderColor: white,
        borderRadius: 5,
        borderWidth: 1
    }
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');
    const deck = state[title];
  
    return {
      deck
    };
};


export default connect(mapStateToProps)(Quiz);