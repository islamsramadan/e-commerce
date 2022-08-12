import React from 'react';

import RateComponent from '../Rate';
import profileImg from '../../assets/images/user.jpg';
import './productReviews.scss';

export default function ProductReviews({ product }) {
    // console.log(product);
    const reviews = product?.reviews;

    if (reviews) {
        return (
            <div className="reviews">
                <div className="reviews-headerDiv">
                    <h3 className="reviewsDiv-headerDiv_title">Buyers Reviews</h3>
                    <div>
                        <RateComponent rate={3} />
                        <span>{product?.numReviews} reviews</span>
                    </div>
                </div>

                {reviews.map((review) => {
                    return (
                        <div key={review._id} className="reviews-contentContainer">
                            <img alt="product" src={profileImg} />
                            <div className="reviews-contentContainer-content">
                                <div className="reviews-contentContainer-content_row">
                                    <h6>{review.name}</h6>
                                    <span> rated it </span>
                                    <RateComponent rate={review.rating} />
                                </div>
                                <div className="reviews-contentContainer-content_row">
                                    <span>{review.createdAt.split('T')[0]}</span>
                                </div>
                                <div className="reviews-contentContainer-content_row">
                                    <p>{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
