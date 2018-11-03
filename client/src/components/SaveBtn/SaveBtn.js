import React from 'react'

const SaveBtn = (props) => {
  return (
    <button className="btn-sm btn-danger float-right" id={props.id} onClick={props.click} price={props.price} name={props.name} desc={props.desc}>Save</button>
  )
}

export default SaveBtn;