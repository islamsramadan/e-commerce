import React from 'react';
import { TbArrowsSort } from 'react-icons/tb';

import './sortBy.scss';

export default function SortBy() {
  return (
    <div className="SortBy">
        <h6> <TbArrowsSort/> Sort by</h6>
        <button className='active'>price : low to high</button>
        <button>price : high to low</button>
        <button>rate : high to low</button>
        <button>new arrival</button>
    </div>
  );
}
