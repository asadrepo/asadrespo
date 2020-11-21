import React from 'react';

const ListPort = ({ports}) => {
    return (
        <React.Fragment>
            {ports.map(port => {
                return (<tr key={port.id}>
                    <td>{port.port_number}</td>
                    <td>{port.service_name}</td>
                    <td>{port.service_alias}</td>

                </tr>);
            })}

        </React.Fragment>
    );
};

export default ListPort;
