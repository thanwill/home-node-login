// documento header do site com links para as páginas login, cadastro e home

import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // busca o nome e email do usuário logado

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href=' '>
            {" "}
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarText'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link' to='/produtos'>
                  Produto
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/estoques'>
                  Estoque
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/movimentos'>
                  Movimentação
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link dropdown-toggle'
                  to='/entrar'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  Opções
                </Link>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    <Link className='dropdown-item' to='/usuarios'>
                      Usuários
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-item' to='/entrar'>
                      Login
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <span className='navbar-text'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatum, nobis?
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
