import React, { useState, useEffect } from 'react';
import { ReserveDevice } from './ReserveDevice';
import EditDeviceModal from "./EditDeviceModal";
import useModal from "./useModal";

export default function Read() {
    const [data, setData] = useState([]);
    const [device, setDevice] = useState({});
    const [isShowingModal, toggleModal] = useModal();

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching")
            const response = await fetch("http://localhost:3000/devices")
            const data = await response.json()
            setData(data)
        } 
        fetchData()
    }, []);

    const EditData = (device) =>
    {
        setDevice(device)
        toggleModal()
    }

    const ReserveData = (device) =>
    {
        setDevice(device)
        toggleModal()
    }

    const listItems = data.map((device) =>
            <tr>
                <td>{device.d_ID}</td>
                <td>{device.Name}</td>
                <td>{device.IpAddress}</td>
                <td>{device.ManagementAddress}</td>
                <td>{device.Username}</td>
                <td></td>
                <td>{device.WaitingUsersCount}</td>
                <td><button className="edit" onClick={() => ReserveData(device)}>Reserve</button></td>
                <td><button className="edit" onClick={() => EditData(device)}>Edit</button></td>
            </tr>
        );
    return (
        <div id="devicesTable">
            <EditDeviceModal device={device} show={isShowingModal} onCloseButtonClick={toggleModal} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Management Address</th>
                        <th>Owner</th>
                        <th>Waiting Users</th>
                        <th>Waiting Users Count</th>
                        <th>Reserve</th>
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
