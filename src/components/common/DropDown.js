import React from 'react';

const DropDown = ({name, title, data, key = 'name', id='id', onChange = () => {}}) => {
    return (
        <select name={name} className="form-control" onChange={onChange}>
        <option key={0} value={''}>{title}</option>
        {data.length > 0 && data.map(data => {
            return (<option key={data.id} value={data[id]}>{data[key]}</option>)
        })}
      </select>
    )
}

export default DropDown;