import { Icon } from '@iconify/react';
import { useState } from 'react';
import Alert from "react-bootstrap/Alert";



const Success_message = (message) => {

return <Alert dismissible variant='success'>
    <Alert.Heading>
        success
    </Alert.Heading>
    <p>{message}</p>
</Alert>
    }

 
export {Success_message}