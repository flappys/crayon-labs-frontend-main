
import React, { useEffect } from "react";
import './DynamicAttribute.css'
function DynamicAttribute(props) {
    useEffect(() => {

    }, [])

    return <><div className="attributeplace">Attributes <span className="asterix">*</span></div>
        {props.attribute.map((attribute,index) => <div className="attributeForm">
            <div className="attributecolum">
                <input onChange={(e)=>props.changeAttribute(index,"traitValue",e.target.value)}
                    placeholder={attribute.TraitType}
                    type="text"
                    className="inputsAttribute"
                />
            </div>
            <div className="attributecolum">
                <input onChange={(e)=>props.changeAttribute(index,"value" ,e.target.value)}
                    placeholder={attribute.Value}
                    type="text"
                    className="inputsAttribute"
                />
            </div>
            <div className="attributecolum">
                {index==0?<button className="buttonAdd" onClick={()=>props.addElement()}>Add</button>:<button className="buttonDelete"  onClick={()=>props.removeAttribute(index)}>Delete</button>}
            </div>

        </div>
        )}
    </>
}

export default DynamicAttribute

