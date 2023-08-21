import React, { useState, useEffect } from 'react';
import EditDeviceModal from "./EditDeviceModal";
import HideDeviceModal from "./HideDeviceModal"
import useModal from "./useModal";
import configData from "../config.json"

export default function Read() {
    const [data, setData] = useState([]);
    const [device, setDevice] = useState({});
    const [isShowingModal, toggleModal] = useModal();
    const [isShowingHideDevice, toggleHideDeviceModal] = useModal();
    const [fetchData, setFetchData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching")
            const response = await fetch(`${configData.SERVER_URL}/get-devices`)
            const data = await response.json()
            setData(data)
        }
        if(fetchData)
        {
            fetchData()
            setFetchData(false)
        }
    }, [fetchData]);

    const EditData = (device) =>
    {
        setDevice(device)
        toggleModal()
    }

    const HideDevice = (device) =>
    {
        setDevice(device)
        toggleHideDeviceModal()
    }

    const listItems = data.map((device) =>
            <tr>
                <td>{device.d_ID}</td>
                <td>{device.Name}</td>
                <td>{device.IpAddress}</td>
                <td><a href={device.ManagementAddress}>{device.ManagementAddress}</a></td>
                <td>{device.Username}</td>
                <td>{device.Comment}</td>
                <td>
                    <button className="edit" onClick={() => EditData(device)}>Edit</button>
                    <label> | </label>
                    <button className="edit" onClick={() => HideDevice(device)}>Remove</button>
                </td>
            </tr>
        );
    return (
        <div id="devicesTable">
            <EditDeviceModal device={device} show={isShowingModal} onCloseButtonClick={toggleModal} setfetch={setFetchData} />
            <HideDeviceModal device={device} show={isShowingHideDevice} onCloseButtonClick={toggleHideDeviceModal} setfetch={setFetchData} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Management Address</th>
                        <th>In Use By</th>
                        <th>Comment</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
            <div id="CreateDeviceDiv">
                <a id="CreateDeviceButton" href="/Create">Add Device</a>
            </div>
        </div>
    )
}
