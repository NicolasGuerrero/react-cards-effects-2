import React from 'react';

function Card({image, index}) {
  const style = {
    transform: `rotate(${20 * index}deg)`,
    position: 'absolute'
  };
  return <img className="card" style={style} src={image} alt="card" />
};
export default Card;