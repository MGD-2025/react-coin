import { useState, useEffect } from 'react';
import styles from './Home.module.css';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites")) ?? []);
    }, []);
    return (
        <>
            <h1>Tus favoritos</h1>
            {favorites.length > 0 ? (
                <ul className={styles.lista}>
                    {favorites.map((moneda) => (
                        <li key={moneda.id}>
                            <Link to={`/coin/${moneda.id}`}>
                                <h2>{moneda.name}</h2>
                                <h3>{moneda.symbol}</h3>
                                <p>$ {parseFloat(moneda.priceUsd).toFixed(2)}</p>
                            </Link>
                        </li>
                    ))}
                </ul>) : <p>No hay favoritos</p>
            }
        </>
    )
}

export default Favorites;