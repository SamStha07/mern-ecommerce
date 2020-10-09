import React from 'react';
import { Card, Button } from 'react-bootstrap';

import Rating from './Rating';

const Product = ({
  id,
  name,
  description,
  price,
  image,
  rating,
  numReviews,
}) => {
  return (
    <Card style={{ width: '16rem', marginTop: '2rem' }}>
      <a href={`/product/${id}`}>
        <Card.Img variant="top" src={image} />
      </a>

      <Card.Body>
        <a href={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <Card.Title>{name}</Card.Title>
        </a>

        <Card.Text as="div">
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h4">Rs.{price}</Card.Text>

        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
