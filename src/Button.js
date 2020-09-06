import React from "react"

const Button = ({ label, onClickFunction, id, className }) => (
  <div id={id} className={className} onClick={() => {onClickFunction()}}>
    {label}
  </div>
)

export default Button
