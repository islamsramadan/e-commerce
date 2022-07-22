import React from 'react';

import './search.scss';
import ProductCard from '../../components/ProductCard';
import Filter from '../../components/Filter';

export default function SearchPage() {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="container-fluid search">
      <div className="row">
        <div className="d-none d-lg-block col-lg-2">
          <Filter></Filter>
        </div>
        <div className="col-lg-10 col-md-12">
          <div className="row">
            {products.map((product) => {
              return (
                <div key={product} className="col-12 col-sm-6 col-md-3">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
