import React,{Component} from 'react';
import Quagga from 'quagga';
import {Input} from 'react-materialize';

declare var $ : any;



class Scanner extends Component {

    state = {
        overallResult:""
    };

    handleInputChange = (event) =>{

        const {name,value} = event.target;
        this.setState({
            [name]: value
        })

    };

    componentDidMount() {
        this.setState({overallResult:"(..Searching..)"});
        Quagga.init({
            inputStream: {
                target: document.querySelector("#interactive"),
                type : "LiveStream",
                constraints: {
                    width:960,
                    height: 960,
                    facingMode: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true,
                resolution:800
            },
            numOfWorkers: 0,
            decoder: {
                readers : [ "code_128_reader","ean_reader"]
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
        this.setState({overallResult : result.codeResult.code});
        this.props.onDetected(result)
    }

    render() {
        return (
            <div>
            <div id = "interactive2" className = "viewport" />
            <p><strong> Found Code: </strong> {this.state.overallResult}
            <br>
            </br>
            </p>
            <Input type="text" onChange={this.handleInputChange} s={12} label=" Correct if necessary:" defaultValue={this.state.overallResult} value={this.state.overallResult} name="overallResult" />
            <div className="viewport" id="interactive" />
            {/* <Input id="interactive" className="viewport" s={12} label="UPC" > {this.state.overallResult} </Input> */}
            </div>
        )
    }
}

export default Scanner;




