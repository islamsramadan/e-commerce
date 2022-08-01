import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import './rate.scss';

export default function RateComponent(props) {
    const rate = props.rate.toFixed(0);
    const starSize = props.size || 20;
    let filledStarArr = [];
    let outlinedStarArr = [];
    for (let i = 0; i < rate; i++) filledStarArr.push(i);
    for (let i = 0; i < 5 - rate; i++) outlinedStarArr.push(i);

    return (
        <div className="rateDiv">
            {filledStarArr.map((i) => {
                return <AiFillStar key={i} style={{ 'fontSize': starSize + 'px' }} />;
            })}
            {outlinedStarArr.map((i) => {
                return <AiOutlineStar key={i} style={{ 'fontSize': starSize + 'px' }} />;
            })}
        </div>
    );
}
