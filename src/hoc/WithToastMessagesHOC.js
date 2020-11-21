import React from 'react';
import { ToastProvider, useToasts } from 'react-toast-notifications'

function WithToastMessagesHOC(Component){
    return function WrappedComponent(props){
        const { addToast } = useToasts();
        return <Component {...props} addToast={addToast} />;
    }
}


export default WithToastMessagesHOC;