/**
 * Created by siri on 2017-07-02.
 */
import React, {Component} from 'react';
import {BookForm} from '../components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {bookPostRequest, load, bookListRequest, deleteBook, bookEditRequest} from '../actions/book';
import axios from 'axios';
import {Grid, MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

import {findDOMNode} from 'react-dom';
import InitializeFromStateForm from "../components/BookEditForm";

class BookAdmin extends Component {
    constructor() {
        super();
        this.state = {
            images: [{}],
            img: '',
            flag: true,
            errorMessage: false,
            successMessage: false
        }
    }

    componentDidMount() {
        //GET IMAGES FROM API
        axios.get('/api/book/images')
            .then(function (response) {
                console.log('book IMAGES');
                this.props.bookListRequest();
                this.setState({images: response.data});
            }.bind(this))
            .catch(function (err) {
                this.setState({images: 'error loading image files from the server', img: ''})
            }.bind(this))
    }

    handleSelect(img) {
        this.setState({
            img: '/images/' + img
        })
    }

    handlePost({title, description, price}) {
        const image = this.state.img;
        this.props.bookPostRequest({title, description, price, image})
            .then(() => {
                this.props.load({title, description, price,image}); //야매....
                this.setState({errorMessage: false,img:''});
                this.props.load({}); //bookFormReset....
                console.log('post book form reset')
            });
    }

    handleDelete(e) {
        e.preventDefault();

        let bookId = findDOMNode(this.refs.delete).value;
        if (bookId == 'select') {
            console.log(bookId);
            this.setState({errorMessage: true})
            return
        }
        this.props.deleteBook(bookId).then(() => {
            this.setState({img: ''});

            this.props.load({}); //bookFormReset....
        });
        this.setState({successMessage: true, errorMessage: false});
    }

    handleEdit({title, description, price}) {
        let bookId =
            findDOMNode(this.refs.delete).value;
        if (bookId == 'select') {
            console.log(bookId);
            this.setState({errorMessage: true});
            return
        }
        const image = this.state.img;
        const id = this.state.id;
        this.props.bookEditRequest({id, title, description, price, image})
            .then(() => {
                this.props.bookListRequest();   //수정필요? list aixos 요청 안해도 됨. 리듀스에서 state 업데이트 해주면 됨.
                this.setState({img: ''});
                this.props.load({}); //bookFormReset....
            });
        this.setState({successMessage: true, errorMessage: false});

        return;
    }

    /*****************
    ** 초기 post form init 세팅을 해줌. (edit 폼에서 post폼으로 전환했을 떄 초기 세팅을 해주는 역할.
     */
    onPost() {
        this.props.load({}); //bookFormReset....
        this.setState({img: '', flag: true, errorMessage: false});
        findDOMNode(this.refs.delete).value='select';
    }

    onEdit() {
        this.setState({flag: false});   //flag를 false로 해줌으로써 edit/delete 폼으로 렌더링해줌

        let bookId = findDOMNode(this.refs.delete).value;

        if (bookId == 'select') {
            console.log(bookId);
            this.setState({errorMessage: true})
            return
        }

        const index =
            this.props.books.findIndex(
                function (book) {
                    return book._id === bookId;
                }
            )
        const editBook = this.props.books[index];

        this.setState({
            img: editBook.image,
            id: bookId,
            errorMessage: false
        })
        this.props.load(editBook);
    }

    msgChange() {

        this.setState({
        successMessage: false //이거 떄문에 success 성공 버튼이 사라지는거임????
        })

        console.log("몇번찍히나보자")  //onChange 때문에 찍히는 거임.
    }

    render() {

        const booksList = this.props.books.map(function (booksArr) {
            return (
                <option value={booksArr._id} key={booksArr._id}> {booksArr.title}</option>
            )
        }, this);

        const imgList = this.state.images.map(function (imgArr, i) {
            return (
                <MenuItem key={i} eventKey={imgArr.name}
                          onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
            )
        }, this);


        return (
            <Grid>
                <Well>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Panel>
                                <InputGroup>
                                    <FormControl type="text" ref="img" value={this.state.img}/>
                                    <DropdownButton
                                        componentClass={InputGroup.Button}
                                        id="input-dropdown-addon"
                                        title="Select an image"
                                        bsStyle="primary">
                                        {imgList}
                                    </DropdownButton>
                                </InputGroup>
                                <Image src={this.state.img} responsive/>
                            </Panel>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Panel>
                                {this.state.flag ?
                                    <BookForm onSubmit={this.handlePost.bind(this)} msg={this.state.successMessage}/>
                                    : <InitializeFromStateForm onSubmit={this.handleEdit.bind(this)}
                                                               msg={this.state.successMessage}
                                                               errorMsg={this.state.errorMessage}
                                                               onDelete={this.handleDelete.bind(this)}
                                                               onChange={this.msgChange.bind(this)}/>
                                }
                            </Panel>

                            <Panel>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>If you want to edit or delete an item, select the one. </ControlLabel>
                                    <FormControl ref="delete" componentClass="select" placeholder="select">
                                        <option value="select">select</option>
                                        {booksList}
                                    </FormControl>
                                </FormGroup>
                                <Button
                                    onClick={this.onPost.bind(this)}
                                    bsStyle="success"
                                    style={{margin: '0 10px 0 0'}}>Post Section</Button>
                                <Button
                                    onClick={this.onEdit.bind(this)} bsStyle="warning"
                                    style={{margin: '0 10px 0 0'}}>Edit / Delete Section</Button>

                                {this.state.errorMessage ?
                                    <div><p style={{color: 'red'}}>Choose Item in select box</p></div> : null}
                            </Panel>
                        </Col>
                    </Row>
                </Well>
            </Grid>

        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.book.list.data
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        bookPostRequest,
        bookListRequest,
        deleteBook,
        load,
        bookEditRequest
    }, dispatch)
}

// BookAdmin = connect(mapStateToProps, mapDispatchToProps)(BookAdmin);
//
// export default reduxForm({
//     form: 'book'
// })(BookAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(BookAdmin);