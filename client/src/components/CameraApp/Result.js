import React from 'react';

const Result = (props) => (
    
        <li>
            {props.result ? props.result.codeResult.code[props.result.codeResult.format] : null}
        </li>
       
  );
  
export default Result;