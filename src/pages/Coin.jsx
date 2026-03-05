import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Coin.module.css'

function Coin() {
    const { id } = useParams();
    const [moneda, setMoneda] = useState(null);
    const [isFavorite, setIsFavourite] = useState(false);
    useEffect(() => {
        const fetchMoneda = async (id) => {
            try {
                const response = await fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_API_URL}&ids=${id}`);
                const data = await response.json();
                setMoneda(data?.data?.[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMoneda(id);
        const favorites = JSON.parse(localStorage.getItem("favorites")) ?? [];
        if (favorites.length > 0) {
            favorites.map((moneda) => {
                if (moneda.id === id) {
                    setIsFavourite(true);
                }
            });
        }
    }, [id]);
    const handleFavorite = (e) => {
        e.preventDefault();
        const favorites = JSON.parse(localStorage.getItem("favorites")) ?? [];
        if (isFavorite) {
            localStorage.setItem(JSON.stringify(favorites.map((moneda) => moneda.id !== id)));
            setIsFavourite(false);
        } else {
            localStorage.setItem(JSON.stringify(favorites.push(moneda)));
            setIsFavourite(true);
        }
    }
    return (
        <>
            {moneda && (
                <div className={styles.coin}>
                    <h1>{moneda.name}</h1>
                    <h2>{moneda.symbol}</h2>
                    <p>$ {parseFloat(moneda.priceUsd).toFixed(2)}</p>
                    <button onClick={handleFavorite}>{isFavorite ? "Eliminar" : "Guardar"} Favorito</button>
                </div>


            )}
        </>
    )
}

export default Coin;