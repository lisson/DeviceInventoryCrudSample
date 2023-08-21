import ReactDOM from 'react-dom';
import { Button,Form } from 'semantic-ui-react'
import React, { useState } from 'react';
import configData from "../config.json"

const EditDeviceModal = ({ device, show, onCloseButtonClick, setfetch }) => {
    const [formData, setFormdata] = useState({});
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
        var formDataholder = {}
        for(const property in device)
        {
            formDataholder[property] = device[property]
        }
        setFormdata(formDataholder)
    }

    const formDataHandler = (inputdata) =>
    {
        var render = false
        var formDataholder = JSON.parse(JSON.stringify(formData))
        for(const property in inputdata)
        {
            if(inputdata[property] != null)
            {
                formDataholder[property] = inputdata[property]
                render = true
            }
        }
        if(render)
        {
            setFormdata(formDataholder)
        }
    }

    const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
    const setDeviceAsync = async() => {
        setInputDisabled(true)
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
                    <Form className="create-form">
                        <Form.Field>
                            <label>Device Name</label>
                            <input disabled={InputDisabled} value={formData.Name} placeholder='Device Name' onChange={(e) => formDataHandler({"Name": e.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>IP</label>
                            <input disabled={InputDisabled} value={formData.IpAddress} placeholder='Device IP' onChange={(e) => formDataHandler({"IpAddress": e.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>In Use By</label>
                            <input disabled={InputDisabled} value={formData.Username} placeholder='Username' onChange={(e) => formDataHandler({"Username": e.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Management Address</label>
                            <input disabled={InputDisabled} value={formData.ManagementAddress } placeholder='ManagementAddress' onChange={(e) => formDataHandler({"ManagementAddress": e.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Comment</label>
                            <textarea disabled={InputDisabled} value={formData.Comment } placeholder='Comment' onChange={(e) => formDataHandler({"Comment": e.target.value})} rows={4} cols={40}/>
                        </Form.Field>
                        <Button onClick={postData} type='submit'>Save</Button>
                        <label value={message}></label>
                    </Form>
                </div>
            </div>
        </div>
        , document.getElementById('root')
        );
};

export default EditDeviceModal;