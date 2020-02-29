import React, { useState, useEffect, useRef } from 'react';
import axios from "axios"
import Card from './Card';
import { v4 as uuid } from 'uuid';
import './CardPile.css'

const BASE_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const CARD_URL = 'https://deckofcardsapi.com/api/deck/';

function CardPile() {
  const [deck, setDeck] = useState(null);
  const [cardsArr, setCardsArr] = useState([]);
  const timerId = useRef();
  const [timer, setTimer] = useState(false);

  const toggleTimer = () => {
    console.log(timer)
    let newTimerState;
    if(timer){
      newTimerState = false;
    } else {
      newTimerState = true;
    }
    setTimer(newTimerState)
  }



  const addCard = card => {
    let newCard = { ...card, id: uuid() }
    setCardsArr(oldCards => [...oldCards, newCard]);
  }

  // 2. use hook useEffect to fetch card data right after component renders
  // 3. update state of deck
  // 
  useEffect(() => {
    async function fetchDeck() {
      const deckResult = await axios.get(BASE_URL);
      setDeck(deckResult.data);
    };
    fetchDeck();
  }, []);

  useEffect(() => {
    if (timer) {
      timerId.current = setInterval(() => {
        handleCardDraw()
        console.log(timer)
      }, 200);
    } else {
      console.log("GOT HERE!")
      clearInterval(timerId.current);

    }
    const handleCardDraw = () => {
      async function fetchCard() {
        const cardResult = await axios.get(`${CARD_URL}${deck.deck_id}/draw/?count=1`);
        if (cardResult.data.error) {
          setTimer(false)
          alert(cardResult.data.error);
        } else {

          addCard(cardResult.data.cards[0]);

        }
      };
      fetchCard();
    }
  }, [timer, timerId])





  const renderCards = () => {
    if (cardsArr[0] === undefined) {
      return null;
    }
    

    return (
      <div className="CardPile-renderCards">
        {cardsArr.map((card, index) => (
          <Card key={card.id}
            id={card.id}
            image={card.image}
            index={index}
            remaining={card.remaining}
          />
        ))}
      </div>
    );
  };

  const buttonState = () => {
    if(timer){
      return "Stop Drawing Cards";
    }
    return "Start Drawing Cards";
  }

  // 1. Displays on initial render 
  return (
    <div>
      <p>{deck ? deck.deck_id : "Loading..."}</p>
      <button onClick={toggleTimer}>{buttonState()}</button>
      {renderCards()}
    </div>
  )
};


export default CardPile;
