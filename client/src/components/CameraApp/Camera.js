import React,{Component} from 'react';
import Scanner from './Scanner';
import Result from './Result';

class Camera extends Component {
    state = {
        results: []
    };

    _onDetected = (result) => {
        this.setState({results: this.state.results.concat([result])},
            () => this.props.scanner(result.codeResult.code))
    }

    render() {
        return (
            <div>
                
                <br />
                <ul className="results">
                    {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}
                </ul>
                {this.props.scanning ? <Scanner onDetected={this._onDetected.bind(this)}/> : null}
                {/* <Modal id="modal1" header={this.state.articleTitle} fixedFooter style={{maxHeight:"80%"}}
                    actions={
                    <div className="modal-footer" style={{width:"100%",display:"block",paddingTop:"10px"}}>
                        <button style={{margin:"0 20px"}} onClick={this.cancel} className="modal-close waves-effect waves-red left">Exit</button>
                    </div>
                    }>
                    <br />
                </Modal> */}
            </div>
        )
    }
}

export default Camera;