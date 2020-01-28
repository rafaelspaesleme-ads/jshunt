import React, { Component } from 'react';
import api from '../../services/api'

import { Link } from 'react-router-dom';

import './style.css';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({products: docs, productInfo, page })
    }

    prevPage = () => {
        const { page, productInfo } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);

    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

  render() {
    const { products, page, productInfo } = this.state;

    return (
        <div>
            <h1 className="product-header">Quantidades de produtos atuais: {this.state.products.length}</h1>
            <div className="product-list">
                <ul>
                    {products.map(product => (
                        <li className="product-box" key={product._id}>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <br/>
                            <Link to={`/products/${product._id}`}>Acessar</Link>
                        </li>
                    ))}
                </ul>
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage} >Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage} >Próximo</button>
                </div>
            </div>
        </div>
    );
  }
}
