import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  REMOVE_DECK,
  RESET_DATA
} from "../actions/index";
import { decksList } from "../utils/_DATA";


const initialState = decksList;

function decks(state = initialState, action) {
  
  switch (action.type) {
    case RECEIVE_DECKS: {
      return {
        ...state,
        ...action.decks
      };
    }
    case ADD_DECK: {
      const { title } = action;

      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };
    }
    case ADD_CARD: {
      const { title, card } = action;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [...state[title].questions].concat(card)
        }
      };
    }
    case REMOVE_DECK: {
      const { [action.title]: value, ...restOfState } = state;
      return {
        ...restOfState
      };
    }
    case RESET_DATA: {
      return startingDecks;
    }
    default:
      return state;
  }
}

export default decks;

