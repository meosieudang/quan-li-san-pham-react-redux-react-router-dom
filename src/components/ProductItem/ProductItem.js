import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {

    onDelete = (id) => {
        if (confirm('Do you want delete it ?')) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }

    render() {
        let { product, index } = this.props;
        let productStatus = product.status ? 'Con Hang' : 'Het Hang';
        let classStatus = product.status ? 'success' : 'danger';
        
        return (
            <tr>
                <td>{index+1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <span className={`badge badge-${classStatus}`}>
                        { productStatus }
                    </span>
                </td>
                <td>
                    <Link to={`/product/${product.id}/edit`}
                        className='btn btn-outline-primary'
                    >
                        Edit
                    </Link>
                    <button 
                        className='btn btn-outline-danger ml-3'
                        onClick={() => {this.onDelete(product.id)}}
                    >
                        Delete
                    </button>
                </td>
            </tr>
            
        );
    }
}

export default ProductItem;