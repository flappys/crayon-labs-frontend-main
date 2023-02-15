import { useEffect, useState } from 'react';
import arrowdown from '../../../../images/arrowdown.png'
import Select from 'react-select'
function Form(props) {
    const [content, setContent] = useState(props.content)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [expandToggle, setExpandToggle] = useState(false)
    const setOpen = (index) => {
        content.data[index].active = true;
        setSelectedIndex(index + 1);
        setContent(content);
    }


    useEffect(()=>{
        console.log(props)
    },[props])

    const expand = () => {
        if (content.type == "dropdown") {
            if (expandToggle) {
                setExpandToggle(false)
            }
            else {
                setExpandToggle(true);
            }
        }

    }

    return props.flex == true ?
        <div className="formflexinputmint">
            <div className="inputstep1">
                <p className="addforminput">{props.input1.name} <span className="asterix">*</span></p>
            </div>

            <div className="inputstep2">
                <input className="inputsdata1"></input>
            </div>
            <div className="inputstep3">
                <p className="addforminput">{props.input2.name} </p>
            </div>
            <div className="inputstep4">
                <input className="inputsdata2"></input>
            </div>
       
        </div> :
        <div className='flexinputcontainer'>
            <div className='inputfull'>
                <div className='row'>
                    <div className='inputrow'>
                        <p className='labelinput'>{props.content.name} <span className='asterix'>*</span></p>
                    </div>
                    <div className='inputrow1'>
                        {props.data.length!=0?<Select options={props.input1.data} />:<p>sdds</p>}
                    </div>

                </div>
            </div>
        </div>


}

export default Form;