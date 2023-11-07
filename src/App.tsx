import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './index.css'
import { BiSolidUserCircle } from 'react-icons/bi'

// Interface para a estrutura de dados das ações
interface Stock {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number | null;
  logo: string;
  sector: string | null;
}

function formatNumberToCurrency(value: number | null): string {
  if (value === null) {
    return 'Não especificado';
  }

  // Arredonda o número para duas casas decimais
  const roundedValue = value.toFixed(2);
  // Formata o número no estilo X,XX
  return new Intl.NumberFormat('pt-BR').format(parseFloat(roundedValue));
}

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const stocksPerPage = 8;
  const pagesVisited = pageNumber * stocksPerPage;
  const mobileMenuOpen = false;
  const [isCreateAccountPopupOpen, setIsCreateAccountPopupOpen] = useState(false);
  const [showMobileNotification, setShowMobileNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const openCreateAccountPopup = () => {
    setIsCreateAccountPopupOpen(true);
  };
  
  const closeCreateAccountPopup = () => {
    setIsCreateAccountPopupOpen(false);
  };
  
  
  const showNotification = () => {
    setShowMobileNotification(true);
    setTimeout(() => {
      setShowMobileNotification(false);
    }, 5000);
  };


  useEffect(() => {
    // URL da API
    const apiUrl = 'https://brapi.dev/api/quote/list';
    // Token de autenticação
    const token = 'nL9D76wqKna8P1Gi5vZBre';

    // Configuração para enviar o token como parâmetro
    const config = {
      params: { token: token },
    };

    // Faz a solicitação GET à API
    axios
      .get(apiUrl, config)
      .then((response) => {
        if (response.status === 200) {
          setStocks(response.data.stocks);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar ações: ', error);
      });
  }, []);

  // Filtra as ações com base no termo de pesquisa
  const filteredStocks = stocks.filter((stock) => {
    return stock.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayStocks = filteredStocks
    .slice(pagesVisited, pagesVisited + stocksPerPage)
    .map((stock, index) => (
      <div key={index} className="bg-gray-100 shadow-sm p-4 rounded">
        <img src={stock.logo} alt={stock.name} className="h-[50px] rounded w-[50px] mb-4" />
        <h3 className="text-xl mb-2 text-black">{stock.name}</h3>
        <div className='flex justify-between'>
          <p>
            <span className="text-black">
              R${formatNumberToCurrency(stock.close)}
            </span>
          </p>
          <p>
            <span className={stock.change >= 0 ? 'text-white bg-green-500 text-[20px] p-1 rounded' : 'bg-red-500 text-[20px] p-1 rounded'}>
              {formatNumberToCurrency(stock.change)}%
            </span>
          </p>
        </div>

        <a href="#" className='p-1 rounded bg-gray-300 mt-[20px] text-black' onClick={openCreateAccountPopup}>Saiba mais</a>

      </div>
    ));

  const pageCount = Math.ceil(filteredStocks.length / stocksPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Você pode realizar a pesquisa aqui, se necessário
  };

  return (
    <div>

{isCreateAccountPopupOpen && (
  <div className="fixed inset-0 flex w-[100%] justify-center items-center bg-gray-800 bg-opacity-50" onClick={closeCreateAccountPopup}>
    <div className="bg-white p-8 rounded-lg w-[30%]" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={closeCreateAccountPopup}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
      >
        X
      </button>
      <h2 className="text-2xl font-500 mb-4 text-black border-b pb-5">Registre-se já</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nome Completo</label>
          <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-gray-700">CPF</label>
          <input type="text" id="cpf" name="cpf" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Senha</label>
          <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar Senha</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-300 text-black py-2"
        >
          Criar Conta
        </button>
      </form>
    </div>
  </div>
)}




      {/* Navbar Responsiva */}
      <nav className="bg-[#000] py-5">
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-2">
            <div className=" font-[500] text-xl">the investidor <span className='text-yellow-500'>.</span></div>
            <div className="md:hidden">
              <button
                className="p-2 focus:outline-none"
              >
                {mobileMenuOpen ? 'X' : '☰'}
              </button>
            </div>
            <div className="hidden md:flex space-x-4 justify-center items-center gap-1">
              <a href="/login" className="flex justify-center items-center gap-2  text-white p-1">
                <BiSolidUserCircle /> Entrar
              </a>

              <div className='border-l border-white h-[20px]' />

              <a href="/register" className=''>Criar conta</a>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absoluteinset-0 h-[50%] top-[50%] bg-gray-200 text-white z-50 p-4">
          <div className="container mx-auto">
            <ul className="md:hidden text-2xl font-[500] text-center">
              <li className="mb-4"><a href="#">Página Inicial</a></li>
              <li className="mb-4"><a href="#">Sobre Nós</a></li>
              <li className="mb-4"><a href="#">Serviços</a></li>
              <li className="mb-4"><a href="#">Contato</a></li>
            </ul>
          </div>
        </div>
      )}


<div className="ticker-container overflow-hidden bg-black">
    <div className="ticker-carroussel overflow-hidden">
      <div id="ticker-content" className="flex animate-ticker infinite items-center w-full">
        {stocks.map((stock, index) => (
          <a
            href={`https://www.infomoney.com.br/${stock.stock.toLowerCase()}`}
            key={index}
            className={`w-[100vw] flex gap-25 px-5 justify-center border-r border-[#444444] items-center `}
          >
            <div className="text-[12px] font-500 w-[120px]">{stock.name}</div>
            <div className="flex items-center gap-5 w-[50%]">
              <div className="text-[12px]">{`R$${stock.close.toFixed(2)}`}</div>
              <div className={` text-[12px] spread text-lg ${stock.change >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                {stock.change !== null ? `${stock.change >= 0 ? '+' : '-'}${Math.abs(stock.change).toFixed(2)}%` : 'N/A'}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>

 {/* Banner em Imagem */}

    <div className='lg:block max-md:hidden'>
      <a href="/login">
      <img src="banner.jpg" alt="" />
      </a>
    </div>

    <div className='lg:hidden max-md:block'>
      <a href="/login">
      <img src="banner-mobile.png" alt="" />
      </a>
    </div>


      {/* Conteúdo da Página */}
      <div className="container mx-auto py-10 w-[70%]">
        <h1 className="text-2xl font-[400] mb-4 text-black">Olá, investidor</h1>
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar ações"
            className="p-2 border border-gray-300 text-black rounded w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayStocks}
        </div>

        <br />
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Próxima'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'pagination flex justify-center text-black flex-row space-x-2'}
          previousLinkClassName={'pagination__link border-[2px] text-black p-2'}
          nextLinkClassName={'pagination__link border-[2px] text-black p-2'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active bg-yellow-400 w-[30px] text-center rounded'}
          pageLinkClassName={'pagination__link'}
        />
      </div>

      <footer className='relative bottom-0 p-4 bg-[#000] w-[100%]'>
          <div className='flex justify-center'>
              <h4>Todos os direitos reservados - 2023</h4>
          </div>
      </footer>
    </div>
  );
}

export default App;
