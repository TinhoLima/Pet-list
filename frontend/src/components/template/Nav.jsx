import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className="menu">
            <Link to="/">
                <i className='fa fa-home'></i> <span>Início</span>
            </Link>
            <Link to="/users">
                <i className='fa fa-paw'></i> <span>Cadastro</span>
            </Link>
        </nav>
    </aside>