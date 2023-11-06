import React from "react";
import '../index.css'
import { BsCheckCircleFill } from 'react-icons/bs'


export default function Register() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:order-2">
            <div className="text-center my-2">
              <h1 className="text-black font-500 text-[25px]">the investidor <span className="text-yellow-300">.</span></h1>
            </div>


            <div className="ibox-content bg-gray-100 w-[80%] mx-auto text-whitetext-left p-[1rem]">
              <br />
              <form className="flex-col w-[80%] mx-auto">
                <div className="form-group">
                  <input type="text" id="name" name="name" className="form-control w-full p-2" placeholder="nome" style={{ textTransform: "lowercase" }} />
                </div>
              <br />
                <div className="form-group">
                  <input type="email" id="email" name="email" className="form-control w-full p-2" placeholder="email" style={{ textTransform: "lowercase" }} />
                </div>
                <br />
                <div className="form-group">
                  <input type="tel" id="tel" name="tel" className="form-control w-full p-2" placeholder="celular" style={{ textTransform: "lowercase" }} />
                </div>
                <br />
                <div className="form-group">
                  <input type="password" id="password" name="password" className="form-control w-full p-2" placeholder="senha" />
                </div>
                <br />
                <button type="submit" className="btn bg-green-500 text-white w-full m-b p-2">Registrar</button>
                <p className="text-white text-center">
                  <small className="text-black">Já tem uma conta?</small>
                </p>

                <hr className="hr-line-solid" />
                <a href="/login" className="border border-green-500 text-green-500 block text-center p-2 mt-2 text-black">Entrar agora</a>
              </form>
            

            </div>
          </div>
          <div className="w-full md:w-1/2 md:order-1  flex flex-col max-xl:hidden md:block justify-center">
            <h2 className="font-500 text-black text-[30px]">
              Cadastre-se agora
            </h2>
            <span className="text-[18px] text-black">e você terá acesso a:</span>
            <br />
            
            <h4 className="flex items-center gap-2 text-black text-[18px]">
              <BsCheckCircleFill className="text-yellow-500" /> Soluções do the investidor
            </h4>
            
            <h4 className="flex items-center gap-2 text-black text-[18px]">
              <BsCheckCircleFill className="text-yellow-500" /> Newsletter Diária
            </h4>

            <h4 className="flex items-center gap-2 text-black text-[18px]">
              <BsCheckCircleFill className="text-yellow-500" /> Análise Financeira / Ações
            </h4>

            <h4 className="flex items-center gap-2 text-black text-[18px]">
              <BsCheckCircleFill className="text-yellow-500" /> Conteúdos especiais
            </h4>
           
          </div>
        </div>
      </div>
    </div>
  );
}