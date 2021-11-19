import AsyncStorage from '@react-native-async-storage/async-storage'
import { decksList } from './_DATA';

export const DECK_STORAGE_KEY = "mobileflashcards:decks"

/**
 * @description Return all the decks in the database
 * @returns {object} data
 */
export async function getDecks () {
    try {
        const data  = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        if (data  === null) {
          AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksList));
        }
        return data  === null ? decksList : JSON.parse(data);
    } catch (err) {
        console.log(err);
    }
}

/**
 * @description Return deck by id in the database
 * @param {string} title 
 * @returns {object} dataById
 */
export async function getDeck(title) {
    try {
      const data = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  
      return JSON.parse(data)[title];
    } catch (err) {
      console.log(err);
    }
}

/**
 * @description Save Deck as a title
 * @param {string} title 
 */
export async function saveDeckTitle(title) {
    try {
      await AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [title]: {
            title,
            questions: []
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
}

/**
 * @description Remove Deck from Storage
 * @param {string} id 
 */
export async function removeDeckFromStorage(id) {
    try {
      const decksData = await AsyncStorage.getItem(DECK_STORAGE_KEY);
      const decksList = JSON.parse(decksData);
  
      decksList[id] = undefined;
      delete decksList[id];
      await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksList));
    } catch (e) {
      console.log(e);
    }
};

/**
 * @description Add Card to the Deck
 * @param {string} title 
 * @param {object} card 
 */
export async function addCardToDeck(title, card) {
    try {
      const deck = await getDeck(title);
  
      await AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [title]: {
            questions: [...deck.questions].concat(card)
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
}

/**
 * @description Reset all deck in storage
 */
export async function resetDecks() {
    try {
      await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksList));
    } catch (err) {
      console.log(err);
    }
}
