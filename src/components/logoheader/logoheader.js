import { HEADER_MENU } from '../../utils/globals';
import './logoheader.css';

function Logoheader() {

    return <div className='logoHeader'>
            <div className='center'>
                <img alt="slide" src={HEADER_MENU.logoIcon} className="imgIcon_mob"></img>
            </div>
    </div>
}

export default Logoheader;