import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'; 

const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'Product',
        to: '/product-list',
        exact: false
    },
];

const MenuLink = ({label, to, activeWhenExact})=> {
    return (
        <Route 
            path={to}
            exact={activeWhenExact}
            children={({ match })=>{
                let active = match ? 'active' : '';
                return (
                    <li className={`nav-item ${active}`}>
                        <Link to={to} className='nav-link'>
                            {label}
                        </Link>
                    </li>
                );
            }}
        />
    );
};

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">CALL API</Link>
                <ul className="navbar-nav">
                    { this.showMenu(menus) }
                </ul>
            </nav>
        );
    }

    showMenu = (menus) => {
        let result = null;
        if(menus.length > 0){
            result = menus.map((menu, index)=> {
                return (
                    <MenuLink 
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeWhenExact={menu.exact}
                    />
                )
            })
        }
        return result;
    }
}

export default Menu;
