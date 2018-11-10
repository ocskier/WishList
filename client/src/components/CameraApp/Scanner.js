import React,{Component} from 'react';
import Quagga from 'quagga';

declare var $ : any;

class Scanner extends Component {

    state = {
        overallResult: ""
    };

    componentDidMount() {

        this.setState({overallResult:"(..Searching..)"});
        Quagga.init({
            inputStream: {
                target: document.querySelector("#interactive"),
                type : "LiveStream",
                constraints: {
                    width:980,
                    height: 640,
                    facingMode: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true,
                resolution: 800
            },
            numOfWorkers: 0,
            decoder: {
                readers : [ "ean_reader","ean_8_reader","upc_reader"]
            },
            locate: true
                       
        }, function(err) {
            console.log("This is what is firing ");
            if (err) {
                return console.log(err);
            } else {
                Quagga.start();
            }
        });

        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = (result) => {
        console.log(result);
        this.setState({overallResult : result.codeResult.code}, () => 
            this.props.onDetected(result));
    }

    render() {
        return (
            <div>
                <p><strong> Found Code: </strong> {this.state.overallResult}
                <br />
                </p>
                <div className="viewport" id="interactive" />
                {/* <Input id="interactive" className="viewport" s={12} label="UPC" > {this.state.overallResult} </Input> */}
            </div>
        )
    }
}

export default Scanner;




