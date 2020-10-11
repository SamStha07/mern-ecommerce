import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to={`/product/${id}`}>
        <Card.Img variant="top" src={image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <Card.Title>{name}</Card.Title>
        </Link>

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
