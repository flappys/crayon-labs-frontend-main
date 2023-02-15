
import React, { useEffect } from "react";
import { blockchaindata, blockchaindata2, responsive, responsive2, responsive3 } from "../../../utils/globals";
import Carousel from "react-multi-carousel";

import './blockchain.css'

function Blockchain() {
    useEffect(() => {

    }, [])
    return <> <div className="mainblockchain">
        {blockchaindata.input1.map((data) =>
            <div className="blockflex" key={data.name}>
                <div className="innerblockflex">
                    <div>
                        <p className="blockchainname">{data.name}</p>
                    </div>
                    <div>
                        <img className="topimg" src={data.imgurl}></img>
                    </div>
                </div>

            </div>
        )}


    </div>
        <div className="mainblockchainpart">
            {blockchaindata.input2.map((data) =>
                <div className="blockflex2" key={data.imgurl}>
                    <div className="innerblockflex2">
                        <div className="block1">
                            <p className="blockchainname">{data.name}</p>
                        </div>
                        <div className="block2">
                            <img className="topimg2" src={data.imgurl}></img>
                        </div>
                    </div>

                </div>

            )}
        </div>

        <div className="topswiper">
            <Carousel arrows={false} responsive={responsive3} swipeable={true} draggable={true}>
                {blockchaindata2.input1.map((x) =>
                    <div className="flexcarousel" key={x.imgurl}>
                        <div className="slide1">
                            <p className="polyname">{x.name}</p>
                        </div>
                        <div className="slide2">
                            <img className="imagebloxk" src={x.imgurl}></img>
                        </div>
                    </div>
                )}
            </Carousel>
        </div>



    </>
}

export default Blockchain

