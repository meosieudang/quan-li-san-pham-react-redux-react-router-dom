import React, { Component } from 'react';
class ProductList extends Component {
    render() {
        return (
            <div className="card border-primary mt-4">
                <img className="card-img-top" src="holder.js/100px180/" alt="" />
                <div className="card-body">
                    <h4 className="card-title">List Products</h4>
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {this.props.data} */}
                            {this.props.products}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        );
    }
}

export default ProductList;
