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
  const renderCards = () => {
    if(cardsArr[0] === undefined) {
      return;
    }
    console.log(cardsArr);

    return (
      <div className="CardPile-renderCards">
        {cardsArr.map((card, index) => (
          <Card key={card.id}
            id = {card.id}
            image = {card.image}
            index = {index}
            remaining = {card.remaining}
          />
        ))}
      </div>
    );
  };

  const addCard = card => {
    let newCard = { ...card, id: uuid() }
    console.log("newCard", newCard);
    setCardsArr(oldCards => [...oldCards, newCard]);
  }

  useEffect(() => {
    async function fetchDeck() {
      const deckResult = await axios.get(BASE_URL);
      setDeck(deckResult.data);
    };
    fetchDeck();
  },[]);
  
  const handleCardDraw = () => { {
    async function fetchCard() {
      const cardResult = await axios.get(`${CARD_URL}${deck.deck_id}/draw/?count=1`);
      if(cardResult.data.error){
        alert(cardResult.data.error);
      } else {
      
      addCard(cardResult.data.cards[0]);
      console.log(cardResult.data);
      }
    };
    fetchCard();
    
  };
  

  }

  return (
    <div>
      <p>{deck ? deck.deck_id : "Loading..."}</p>
      <button onClick={handleCardDraw}>Get a card</button>
      {renderCards()}
    </div>
  )
};


export default CardPile;
