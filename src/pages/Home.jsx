import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    const [monedas, setMonedas] = useState([]);
    useEffect(() => {
        const fetchMonedas = async () => {
            try {
                const response = await fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_API_URL}`);
                const data = await response.json();
                setMonedas(data?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMonedas();
    }, []);
    return (
        <>
            <h1>Lista de criptomonedas</h1>
            <ul className={styles.lista}>
                {monedas.map((moneda) => (
                    <li key={moneda.id}>
                        <Link to={`/coin/${moneda.id}`}>
                            <h2>{moneda.name}</h2>
                            <h3>{moneda.symbol}</h3>
                            <p>$ {parseFloat(moneda.priceUsd).toFixed(2)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Home;