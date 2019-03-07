import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
// import callApi from './../../utils/apiCaller';
import { Link } from 'react-router-dom';
import * as actions from './../../actions/index';
import '../../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            todosPerPage: 3,
            active: false
        }
    }

    onChange = (page) => {
        console.log(page);
        this.setState({
            current: page,
        });
    }

    componentDidMount() {
        // callApi('products', 'GET', null).then( res => {
        //     // this.setState({
        //     //     products: res.data
        //     // });
        //     this.props.listAllProduct(res.data);
        // })
        this.props.listAllProduct();
    }

    onDelete = (id) => {
        // let {products} = this.state;
        // callApi(`products/${id}`, 'DELETE', null).then( res => {
        //     let index = findIndex(products, function(o) { return o.id === id; });
        //     if(index !== -1){
        //         products.splice(index, 1);
        //         this.setState({
        //             products : products
        //         })
        //     }
        // });
        this.props.onDeleteProduct(id);
    }

    handleClick = (event) => {
       
            this.setState({
                currentPage: Number(event.target.id)
            });
    
        
    }

    render() {
        let { products } = this.props;
        if (!products.length) {
            return <div className='loading'>
                <CircularProgress className='circle' />
            </div>
        }

        const { currentPage, todosPerPage, active } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = products.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((product, index) => {
            return <ProductItem
                key={index}
                product={product}
                index={index}
                onDelete={this.onDelete}
            />
        })
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map((number, index) => {
            return (
                <li className={(this.state.currentPage === number ? 'active ' : '')}
                    key={index}
                    id={number}
                    onClick={this.handleClick}
                >
                   {number}
                </li>
            );
        });

        return (
            <div className="col-12">
                <Link to={'/product/add'} className='btn btn-danger mt-4'>Add Product</Link>
                {/* <ProductList showProducts={this.showProducts(products)} /> */}
                <ProductList products={renderTodos} />
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
                
            </div>
        );
    }

    showProducts = (products) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />

                );
            });
        }
        return result;
    }

}

const mapStateToProps = state => {
    return {
        products: state.products
    }
};

const mapDispatchToProps = (dispath, props) => {
    return {
        listAllProduct: () => {
            dispath(actions.listAllProductRequest())
        },
        onDeleteProduct: (id) => {
            dispath(actions.deleteProductRequest(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
