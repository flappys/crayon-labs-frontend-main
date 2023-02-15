
import React from "react";
import { connect, useDispatch } from 'react-redux';
import './ModalPage.css'
import Modal from 'react-modal';
import { CloseModel } from "../../redux/actions/actions";
Modal.setAppElement('#root');
function ModalPage(props) {
    const dispatch = useDispatch()
  


    function closeModal() {
        dispatch(CloseModel(true))
    }
    return <div>
        <Modal
            isOpen={props.Showmodal.show}
            onRequestClose={closeModal}
            style={props.Showmodal.style}
        >
           {props.Showmodal.content}

        </Modal>
    </div>
}

function mapStateToProps(state) {
return {
    Showmodal: state.Showmodal
};
}

export default connect(mapStateToProps)(ModalPage);

