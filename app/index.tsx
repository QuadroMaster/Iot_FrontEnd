import React from "react";
import ReactDom from "react-dom";

import "./index.css";

document.title = "Hello from Valtiel!";

/*var url = "https://dev.rightech.io:443";
var bearer = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MTBjMjgxMGYyN2RlOTAwMTA1ZjBmOGQiLCJzdWIiOiI1ZjkxYzRkNDQ0YWI3MjZhY2M2NmFiMDYiLCJncnAiOiI1ZjkxYzRkNDQ0YWI3MjBjMmQ2NmFiMDUiLCJvcmciOiI1ZjkxYzRkNDQ0YWI3MjBjMmQ2NmFiMDUiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTYyODE4NjY0MCwiZXhwIjoxNjM5Nzc0ODAwfQ.T_QH-XHeJr-jOPqEttj2nPOgz_fx6VOn0RP_ZMOGQW0";

const resp = await fetch(url, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
        'Authorization': bearer,
        
        'Content-Type': 'application/json'
    },
});
const devices = await resp.json();

console.log('devices', devices);*/

type Device = {
    _id: string;
    name: string;
}

const resp = await fetch('/devices');
const devices: Device[] = await resp.json();

console.log('devices', devices);

const list = devices.map(device => {
    return <div key={device._id}>
        {device.name}
    </div>
})




const page = <div className="app">
    <div className="head">head</div>
    <div className="left">{list}</div>
    <div className="main">main</div>
</div>;

ReactDom.render(page, document.querySelector("#root"));
