import React from "react";

function Inicio() {
  const imagem = "../assets/images/imagem-erro.png";
  return (
    <div className='text-center pt-5'>
      <img
        src={imagem}
        alt='Icone indicando moça trabalhando em um computador enquanto a página carrega.'
        srcset=''
      />
    </div>
  );
}

export default Inicio;
