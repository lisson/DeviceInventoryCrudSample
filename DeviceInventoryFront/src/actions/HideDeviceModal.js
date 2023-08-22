import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import React, { useState } from 'react';
import configData from "../config.json"

const HideDeviceModal = ({ device, show, onCloseButtonClick, setfetch }) => {
    const [deviceId, setDeviceId] = useState(0);
    const [InputDisabled, setInputDisabled] = useState(false);
    const [message, setMessage] = useState("");

    if (!show)
    {
        return null;
    }

    if(deviceId !== device.d_ID)
    {
        console.debug("new device in form. re-render")
        setDeviceId(device.d_ID)
    }

    const setDeviceAsync = async() => {
        setInputDisabled(true)

        var formData = {"d_ID": device.d_ID, "Hidden": true}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        var response = await fetch(`${configData.SERVER_URL}/update-device`, requestOptions)
        console.debug(response)
        if(response.status == 200)
        {
            console.log("Success")
            setMessage("Success")
            setInputDisabled(false)
            onCloseButtonClick()
            setfetch(true)
        }
        else
        {
            setMessage("Error updating the data.")
        }
    }

    const postData = () => {
        console.debug("postData")
        setDeviceAsync()
    }

    return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div className="modal">
                <div className="body">
                    <div className="edit-modal-header">
                        <h2>{device.d_ID}</h2>
                        <button onClick={onCloseButtonClick}>Cancel</button>
                    </div>
                    <p>Remove device <b>{device.Name}</b> ?</p>
                    <Button onClick={postData} type='submit'>Remove</Button>
                    <label value={message}></label>
                </div>
            </div>
        </div>
        , document.getElementById('root')
    );
}

export default HideDeviceModal;