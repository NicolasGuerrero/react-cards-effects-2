import React from 'react';

function Card({image}) {
  const style = {
    transform: `20deg`
  };
  return <img className="card" style = {style} src={image} alt="card image" />
};
export default Card;