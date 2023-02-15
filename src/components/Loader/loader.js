
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import './loader.css'
function Loader(props) {
    return <div>
        {props.isLoader == true ? 
            <div class="overlay">
                <div class="overlay__inner">
                    <div class="overlay__content"><span class="spinner"></span></div>
                </div>
            </div>:null}
    </div>
}

function mapStateToProps(state) {
    return {
        isLoader: state.isLoader
    };
}

export default connect(mapStateToProps)(Loader);