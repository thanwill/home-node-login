import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Inicio() {
  const imagem = "../images/imagem-erro.png";
  return (
    <>
      <div className='container'>
        <Header title='Erro' />
        <div className='text-center pt-5'>
          <h1 className='display-1'>404</h1>
          <h2 className='display-6'>Página em construção.</h2>
          <img
            src={imagem}
            alt='Icone indicando moça trabalhando em um computador enquanto a página carrega.'
            srcset=''
          />
          <p className='lead'>
            A página que você está procurando não está disponível no momento.
          </p>
          <Link to='/'>Voltar</Link>
        </div>
      </div>
    </>
  );
}

export default Inicio;
