import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Homepage = (props) => {
  useEffect(() => {
    props.listProducts();
  }, []);

  const { products, loading, error } = props.productList;
  // console.log(products);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product
                id={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.productImage}
                rating={product.rating}
                numReviews={product.numReviews}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

function mapStateToProps(state) {
  // console.log(state.productList);
  return { productList: state.productList };
}

export default connect(mapStateToProps, { listProducts })(Homepage);
