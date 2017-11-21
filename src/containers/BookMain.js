import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bookListRequest} from '../actions/book';
import {Carousel, Grid, Row, Col, Button} from 'react-bootstrap';
import {getCart} from '../actions/cart';
import {socialSigninUser} from '../actions/auth';

import {BookItem} from '.';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

const TOTAL_PER_PAGE =12;

class BookMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            page: 0,
            totalPages: Math.ceil(this.props.books.length / TOTAL_PER_PAGE)
        };
        this.incrementPage = this.incrementPage.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.socialSigninUser();
        }

        //고려해보장...ㅠㅠ
        this.props.bookListRequest().then(() => {
            const totalPages = Math.ceil(this.props.books.length / TOTAL_PER_PAGE);
            this.setState({
                page: 0,
                totalPages
            });
        });
    }

    setPage(page) {
        return () => {
            this.setState({page});
        };
    }

    incrementPage() {
        const {page} = this.state;

        this.setState({page: page + 1});
    }

    render() {

        const {page, totalPages} = this.state;
        const startIndex = page * TOTAL_PER_PAGE;

        const booksList = this.props.books.slice(0, startIndex + TOTAL_PER_PAGE).map(function (booksArr) {
            return (
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        image={booksArr.image}
                        price={booksArr.price}/>
                </Col>
            )
        }, this)

        return (
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={900} height={300} alt="900x300" src="/images/home1.jpg"/>
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={300} alt="900x300" src="/images/home2.jpg"/>
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    {booksList}
                </Row>
                <Row>
                    <Col xs={6} md={4}/>
                    <Col xs={6} md={4}>
                        {page !== (totalPages - 1) &&
                        <Button block bsStyle="success" onClick={this.incrementPage}>More</Button>}
                    </Col>
                    <Col xs={6} md={4}/>
                </Row>
            </Grid>
        )
    }
}


BookMain.propTypes = {
    books: PropTypes.array
};

BookMain.defaultProps = {
    books: []
};

function mapStateToProps(state) {
    return {
        books: state.book.list.data,
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        bookListRequest,
        getCart,
        socialSigninUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookMain);