import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import axios from './axios'

import './TinderCards.css'

function TinderCards() {
    const [cards, setCards] = useState([])

    const Swipe = (direction, person) => {

    }

    const OutOfFrame = (person) => {

    }

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/tinder/cards');
            setCards(req.data);
        }
        fetchData();
    }, [])

    return (
        <div className='tinder-cards'>
            {cards.map((card) =>(
                <TinderCard
                className='swipe'
                key={card.name}
                preventSwipe = {['up','down']}
                onSwipe={(dir) => Swipe(dir,card.name)}
                onCardLeftScreen = {() => OutOfFrame(card.name)}
                >
                <div className="card" style={{backgroundImage:`url(${card.imgUrl})`}}>
                    <h3 className="card-name">{card.name}</h3>
                </div>
                </TinderCard>
            ))}
        </div>
    )
}

export default TinderCards
