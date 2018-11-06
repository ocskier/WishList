import React,{Component} from 'react';
import Quagga from 'quagga';
import {Input} from 'react-materialize';

class Scanner extends Component {

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers : [ "code_128_reader"]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = (result) => {
        this.props.onDetected(result)
    }

    render() {
        return (
            <Input id="interactive" className="viewport" s={12} label="UPC" />
        )
    }
}

export default Scanner;