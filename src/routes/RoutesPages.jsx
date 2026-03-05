import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root.jsx';
import Error from '../pages/Error.jsx';
import Home from '../pages/Home.jsx';
import Coin from '../pages/Coin.jsx';
import Favorites from '../pages/Favorites.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error />,
        element: <Root />,
        children: [
            {path: "/", element: <Home />},
            {path: "/coin/:id", element: <Coin />},
            {path: "/favorites", element: <Favorites />},
        ]
    },
]);

export default router;