import React, { Component } from "react";
// import callApi from '../../utils/apiCaller';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: "",
      status: "",
      nameErr: ""
    };
  }

  componentDidMount = () => {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      // callApi(`products/${id}`, 'GET', null).then(res => {
      //     let data = res.data;
      //     this.setState({
      //         id: data.id,
      //         name: data.name,
      //         price: data.price,
      //         status: data.status
      //     });
      // });
      this.props.editProduct(id);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.edit) {
      let { edit } = nextProps;
      this.setState({
        id: edit.id,
        name: edit.name,
        price: edit.price,
        status: edit.status
      });
    }
  }

  onChange = e => {
    let target = e.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };

  validate = () => {
    let isValid = true;
    let error = {};
    if (this.state.name === "") {
      error.nameErr = "can not empty";
      isValid = false;
    }
    this.setState({
      ...this.state,
      ...error
    });
    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();
    let { id, name, price, status } = this.state;
    let { history } = this.props;
    let product = {
      id: id,
      name: name,
      price: price,
      status: status
    };
    if (id) {
      //update
      // callApi(`products/${id}`, 'PUT', {
      //     name: name,
      //     price: price,
      //     status: status
      // }).then( res => {
      //     history.goBack();
      // });
      this.props.updateProduct(product);
    } else {
      //add
      // callApi('products', 'POST', {
      //     name: name,
      //     price: price,
      //     status: status
      // }).then(res => {
      //     history.goBack();
      // });
      this.props.addProduct(product);
      // if(error){
      //     console.log('a')
      //     this.props.addProduct(product);
      // }
      // else{
      //     console.log('b')
      //     console.log(this.state)
      // }
    }
    history.goBack();
  };

  render() {
    let { name, price, status } = this.state;
    return (
      <div className="col-6">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <br />
            {this.state.nameErr}
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={price}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              name="status"
              value={status}
              onChange={this.onChange}
              checked={status}
            />
            <label className="form-check-label ">Con hang</label>
          </div>
          <button className="btn btn-danger">Submit</button>
          <Link to={"/product-list"} className="btn btn-primary ml-3">
            Go Back
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    edit: state.edit
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addProduct: product => {
      dispatch(actions.addProductRequest(product));
    },
    editProduct: id => {
      dispatch(actions.editProductRequest(id));
    },
    updateProduct: product => {
      dispatch(actions.updateProductRequest(product));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductActionPage);
