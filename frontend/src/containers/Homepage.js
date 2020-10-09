import React from 'react';
import { Row, Col } from 'react-bootstrap';

import products from '../products';
import Product from '../components/Product';

const Homepage = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              rating={product.rating}
              numReviews={product.numReviews}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homepage;
