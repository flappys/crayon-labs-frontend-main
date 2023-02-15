
import React, { useEffect } from "react";
import { COUNT } from "../../utils/globals";
import './Count.css'
import CountUp from 'react-countup';
function Count() {
    useEffect(() => {

    }, [])
    return <div className="countcard">
        <div className="text-center">
            <p className="countName">{COUNT.MAIN_TITLE}</p>
        </div>
        <div className="countFlex">
            {COUNT.card.map((count) => <div className="countCard">
                <div className="headBottom">

                    <CountUp  end={count.count} />
                </div>
                <div className="headCount">
                    {count.name}
                </div>

            </div>

            )}
        </div>
    </div>
}

export default Count

