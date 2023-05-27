import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default function Create() {
    const [devicename, setDeviceName] = useState('');
    const [deviceIp, setDeviceIp] = useState('');
    const [username, setUsername] = useState('');
    const [managementAddress, setManagementAddress] = useState('');
    
    const postData = () => {
        var request = {};
        request["Name"] = devicename
        request["IpAddress"] = deviceIp
        request["ManagementAddress"] = managementAddress
        request["Username"] = username

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        fetch('http://localhost:3000/SetDevice', requestOptions)
            .then(response => response.json())
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Device Name' onChange={(e) => setDeviceName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>IP</label>
                    <input placeholder='Device IP' onChange={(e) => setDeviceIp(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Owner</label>
                    <input placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Management Address</label>
                    <input placeholder='ManagementAddress' onChange={(e) => setManagementAddress(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Save</Button>
            </Form>
        </div>
    )
}
