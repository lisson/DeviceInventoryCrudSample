import React, { useState, useEffect } from 'react';

export default function Read() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/devices")
            const data = await response.json()
            setData(data)
        } 
        fetchData()
    }, []);
    console.log(data)
    const listItems = data.map((device) =>
            <tr>
                <td>{device.d_ID}</td>
                <td>{device.Name}</td>
                <td>{device.IpAddress}</td>
                <td>{device.ManagementAddress}</td>
                <td>{device.Username}</td>
                <td></td>
                <td>{device.WaitingUsersCount}</td>
                <td></td>
            </tr>
        );
    return (
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Management Address</th>
                    <th>Owner</th>
                    <th>Waiting Users</th>
                    <th>Waiting Users Count</th>
                    <th>Reserve</th>
                </tr>
                {listItems}
            </table>
        </div>
    )
}
