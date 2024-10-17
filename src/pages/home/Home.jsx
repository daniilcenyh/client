import { useGetAllProductsQuery } from "../../store/productSlice/productsAPI";
import { RiSearchLine } from "react-icons/ri";

import Card from "../../components/card/Card";

import "./home.css"
import { useState } from "react";
import Modal from "../../components/modal/Modal";

export default function Home() {
    const {data, error, isLoading} = useGetAllProductsQuery();
    
    const [dataModal, setDataModal] = useState([]);
    const [openModal,setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    const handleDataModal = (product) => {
        setDataModal(product)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(data);

    // Функция для поиска товара по имени
    function searchProductByName(productName) {
        return data.filter(product => 
            product.title.toLowerCase().includes(productName.toLowerCase())
        );
    }
    var tmp;
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        
        // Обновляем список отфильтрованных товаров
        setFilteredProducts(searchProductByName(value));
    };

    const handleReset = () => {
        setSearchTerm('');
        setFilteredProducts([]); // Сброс до изначального списка
    };

    tmp = searchTerm;

    console.log(tmp);
    
    return (
        <div className="home__container">
            <div>
                <div className="search__block">
                    <RiSearchLine />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Введите название товара"
                    />
                    <button onClick={handleReset}>Сбросить поиск</button>
                </div>
                
            
            <div className="catalog__block">
                {filteredProducts?.map((product,index) => (
                    <Card
                    title={product.title}
                    img={product.img}
                    price={product.price}
                    rate={product.rate}
                    key={index} 
                    id={product.id}
                    product={product}
                    handleDataModal={handleDataModal}
                    handleOpenModal={handleOpenModal}
                    openModal={openModal}
                /> 
                ))}
            </div>
            </div>
            {/* модальное окно */}
            
                {
                    openModal ?  
                        <div className="blur__block">
                            <Modal dataModal={dataModal} handleOpenModal={handleOpenModal}/>
                        </div>
                    : ""
                    
                }
            
            
            {
                isLoading ? 
                    (<p className="loader"></p>) : 

                error ? 
                    (<p>An error occured {error}</p>) : 

                (              
                <div className="catalog__block">
                    
                    {
                        data?.map((product,index) => {
                            return (
                            // <div key={index} onClick={() => {
                            //     handleDataModal(product)
                            //     handleOpenModal(!openModal)
                            // }}>
                                <Card
                                     title={product.title}
                                     img={product.img}
                                     price={product.price}
                                     rate={product.rate}
                                     key={index} 
                                     id={product.id}
                                     product={product}
                                     handleDataModal={handleDataModal}
                                     handleOpenModal={handleOpenModal}
                                     openModal={openModal}
                                 /> 
                        // </div>
                        )})
                    }
                </div>)
            }
        </div>
    );
}

