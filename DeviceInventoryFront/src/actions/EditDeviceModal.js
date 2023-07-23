import ReactDOM from 'react-dom';
import { Button,Form } from 'semantic-ui-react'
import React, { useState } from 'react';


const EditDeviceModal = ({ device, show, onCloseButtonClick }) => {
    const [formData, setFormdata] = useState({});
    const [deviceId, setDeviceId] = useState(0);

    if (!show)
    {
        return null;
    }

    if(deviceId != device.d_ID)
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
            if(inputdata[property])
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

    const postData = () => {
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
                            <label>Owner</label>
                            <input value={formData.Username} placeholder='Username' onChange={(e) => formDataHandler({"Username": e.target.value})}/>
                        </Form.Field>
                        <Button onClick={postData} type='submit'>Save</Button>
                    </Form>
                </div>
            </div>
        </div>
        , document.getElementById('root')
        );
};

export default EditDeviceModal;