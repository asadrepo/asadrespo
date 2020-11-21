import React from 'react';

const InputRange = ({name, onChange, min = 1, max=5, steps=1}) => {
    return (
        <div className="col-range">
        <div className="range">
          <input type="range" 
                  min={min} 
                  max={max} 
                  steps={steps} 
                  defaultValue={1} 
                  name={name}
                  onChange={onChange}
                 // value={value}
                 // disabled={true}
           />
        </div>
        <ul className="range-labels">
          <li className="active selected">1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
    );
}

export default InputRange;