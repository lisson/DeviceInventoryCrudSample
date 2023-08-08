import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import configData from "../config.json"

export default function Create() {
    const [devicename, setDeviceName] = useState('');
    const [deviceIp, setDeviceIp] = useState('');
    const [username, setUsername] = useState('');
    const [managementAddress, setManagementAddress] = useState('');
    const [comment, setComment] = useState('');

    
    const postData = () => {
        var request = {};
        request["Name"] = devicename
        request["IpAddress"] = deviceIp
        request["ManagementAddress"] = managementAddress
        request["Username"] = username
        request["Comment"] = comment

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const setDeviceAsync = async() => {
            var response = await fetch(`${configData.SERVER_URL}/SetDevice`, requestOptions)
            console.log(response)
            window.location.href = "/"
        }
        setDeviceAsync()
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Device Name</label>
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
                <Form.Field>
                    <label>Comment</label>
                    <textarea placeholder='Comment' onChange={(e) => setComment(e.target.value)} rows={4} cols={40}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Save</Button>
            </Form>
        </div>
    )
}
