import React from "react";
import Particles, { IParticlesParams } from 'react-particles-js';

export default class ParticleWrapper extends React.Component {
    render() {
        return (
            <div id="particles-js-container">
                <Particles params={config2} style={style} />
            </div>
        );
    }
}

const config2: IParticlesParams = {
    "particles": {
        "line_linked": {
            "color":"#FFFFFF"
        },
        "number": {
            "value": 70,
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
        "color": {
            "value": "#00acc4"
        },           
        "size": {
            "value": 5
        },
        "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
        },        
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            }
        }
    }
}

const style = {
    width: '100%',
    height: '100%',
    background: '#132229',
    position: 'fixed',
    'z-index': '-9999',
    top: '0',
}
