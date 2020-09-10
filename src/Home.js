import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home_image" src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/under1499store/english/Gateway/updated/V242338866_IN_CEPC_Under-1499_store_Graphics_3000x1200._CB406499466_.jpg" />

                <div className="home__row">
                    <Product  id="4112412" title="The Lean Startup" price={29.99} image="https://images-na.ssl-images-amazon.com/images/I/41+e3refnZL.jpg" rating={5}/>
                    <Product  id="3423412" title="KenWood kMix Stand Mixed for Baking , Preparing Dough..." price={239.0} rating={3} image="https://images-na.ssl-images-amazon.com/images/I/51kqDg%2BGS2L._SX679_.jpg"/>
                </div>

                <div className="home__row">
                <Product  id="3432424" title="OPPO Find X2-Ocean, 12GB RAM" price={739.0} rating={4} image="https://images-na.ssl-images-amazon.com/images/I/919e-u5b4zL._SX679_.jpg"/>
                <Product  id="3445412" title="Apple Iphone 11(128 GB)-Black" price={921.0} rating={3} image="https://images-na.ssl-images-amazon.com/images/I/51kGDXeFZKL._SX679_.jpg"/>
                <Product  id="3423643" title="Samsung S20 Ultra" price={1239.0} rating={5} image="https://images-na.ssl-images-amazon.com/images/I/71cD4NUIBWL._SY879_.jpg"/>
                </div>

                <div className="home__row">
                <Product  id="5532523" title="Play Station 5" price={339.0} rating={5} image="https://images.immediate.co.uk/production/volatile/sites/3/2020/08/playstation-5-77d37a0.jpg?quality=90&resize=620,413"/>
                </div>
            </div>
        </div>
    )
}

export default Home
