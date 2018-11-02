import React, { Fragment } from 'react'
import DropzoneDialogExample from './DropzoneDialogExample'
import DropzoneAreaExample from './DropzoneAreaExample';


export default function(props){
    return (
        <Fragment>
            <DropzoneDialogExample/>
            <br/>
            <DropzoneAreaExample />
        </Fragment>
    )
}