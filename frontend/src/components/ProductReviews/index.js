import React from 'react';

import RateComponent from '../Rate';
import profileImg from '../../assets/images/user.jpg'
import './productReviews.scss';

export default function ProductReviews(props) {
    const reviews = [1, 2, 3];

    return (
        <div className="reviews">
            <div className="reviews-headerDiv">
                <h3 className="reviewsDiv-headerDiv_title">Buyers Reviews</h3>
                <div>
                    <RateComponent rate={3} />
                    <span>12 reviews</span>
                </div>
            </div>

            {reviews.map((review) => {
                return (
                        <div key={review} className="reviews-contentContainer">
                            <img alt='product' src={profileImg} />
                            <div className="reviews-contentContainer-content">
                                <div className="reviews-contentContainer-content_row">
                                    <h6>moemen</h6>
                                    <span> rated it </span>
                                    <RateComponent rate={3} />
                                </div>
                                <div className="reviews-contentContainer-content_row">
                                    <span>15/2/2020</span>
                                </div>
                                <div className="reviews-contentContainer-content_row">
                                    <p>tex ttex tlkd sfhjlksdf jhoishjlkdbmdfpjkbpad </p>
                                </div>
                            </div>
                        </div>
                );
            })}
        </div>
    );
}
