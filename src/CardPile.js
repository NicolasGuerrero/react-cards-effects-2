import React, { useState, useEffect, useRef } from 'react';
import axios from "axios"
import Card from './Card';
import { v4 as uuid } from 'uuid';

const BASE_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const CARD_URL = 'https://deckofcardsapi.com/api/deck/';

function CardPile() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);
  const renderCards = () => {
    if(cards[0] === undefined) {
      return;
    }
    return (
      <div className="CardPile-renderCards">
        {cards.map(card => (
          <Card key={card.id}
            id = {card.id}
            image = {card.image}
          />
        ))}
      </div>
    );
  };

  const addCard = card => {
    let newCard = { ...card, id: uuid() }
    console.log("newCard", newCard);
    setCards(oldCards => [...oldCards, newCard]);
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
      setCard(cardResult.data.cards[0]);
    };
    fetchCard();
    console.log(card);
    addCard(card);
  };
  

    console.log(cards);
  }

  return (
    <div>
      <p>{deck ? deck.deck_id : "Loading..."}</p>
      <button onClick={handleCardDraw}>Get a card</button>
      {cards[0] ? renderCards(): "Loading"}
    </div>
  )
};


export default CardPile;