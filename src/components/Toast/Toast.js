
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import './Toast.css'
import toast, { Toaster } from 'react-hot-toast'
function Toast(props) {

    useEffect(() => {
        if (props.toast.show) {
            if(props.toast.toastFormat=="error"){
                toast.error(props.toast.message, { position: 'bottom-right' })
            }
            else{
                toast.success(props.toast.message, { position: 'bottom-right' })
            }
           
        }

    }, [props.toast])
    return <div>
        {props.toast.show == true && <Toaster />} </div>

}

function mapStateToProps(state) {
    return {
        toast: state.toast
    };
}

export default connect(mapStateToProps)(Toast);

