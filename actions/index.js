// index.js
import {getDecks, saveDeckTitle, removeDeckFromStorage, addCardToDeck} from '../utils/api';

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const REMOVE_DECK = "REMOVE_DECK";
export const RESET_DATA = "RESET_DATA";

export function receiveDecksAction(decks) {
    return {
      type: RECEIVE_DECKS,
      decks
    };
}
  
export function addDeckAction(title){
    return {
      type: ADD_DECK,
      title
    };
}
  
export function addCardToDeckAction(title, card){
    return {
      type: ADD_CARD,
      title,
      card
    };
}
  
export function removeDeckAction(title){
    return {
        type: REMOVE_DECK,
        title
    };
}

export const resetData = () => ({
    type: RESET_DATA
});


export const getAllDecks = () => async(dispatch) => {
    try {
        getDecks().then(decks => {
            dispatch(receiveDecksAction(decks))
        })
    } 
    catch(error) {
        console.error('Error reading decks from file', error);
    }
}
  
export const addDeck = (title) => async(dispatch) => {
    try {
        saveDeckTitle(title)
        return dispatch(addDeckAction(title))
    } catch (error) {
        console.error('Error saving new deck', error);
    }
}

export const addCardToTheDeck = (title, card) => async(dispatch) => {
    try {
        addCardToDeck(title, card).then(
            r =>dispatch(addCardToDeckAction(title, card)))
    } catch (error) {
        console.error('Error adding card to the deck', error);
    }
}

export const removeDeck = (title) => async(dispatch) => {
    try {
        removeDeckFromStorage(title).then(r => dispatch(removeDeckAction(title)))
    } catch (error) {
        console.error('Error removing deck', error);
    }
}