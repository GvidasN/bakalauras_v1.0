import axios from 'axios';

const apiBaseURL = 'http://localhost:5000/api'

let inMemoryToken;
let inMemoryRole;
let inMemoryId;
let inMemoryRiskLevel;

export const GET_NO_AUTH = url => {
    if (!inMemoryToken)
        return;

    return axios(`${apiBaseURL}/${url}`, {
        method: 'GET',
    });
}

export const GET = url => {
    if (!inMemoryToken)
        return;

    return axios(`${apiBaseURL}/${url}`, {
        method: 'GET',
        headers:{
            'Authorization': inMemoryToken
        }
    });
}

export const GET_BY_ID = (url) => {
    if (!inMemoryToken)
        return;

    return axios(`${apiBaseURL}/${url}/${inMemoryId}`, {
        method: 'GET',
        headers: {
            'Authorization': inMemoryToken
        }
    });
}

export const LOGIN = async (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'POST',
        data
    });
}

export const REGISTER_USER = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'POST',
        data
    });
}

export const POST = (url, data) => {
    if (!inMemoryToken)
        return;

    return axios(`${apiBaseURL}/${url}`, {
        method: 'POST',
        data,
        headers:{
            'Authorization': inMemoryToken
        }
    });
}

export const PUT = (url, data) => {
    if (!inMemoryToken)
        return;

    return axios(`${apiBaseURL}/${url}/${inMemoryId}`, {
        method: 'PUT',
        data,
        headers:{
            'Authorization': inMemoryToken,
            "Content-Type": "application/json; charset=utf-8"
        }
    });
}

export const UPDATE = (url, id, data) => {
    if (!inMemoryToken)
        return;
    
    return axios(`${apiBaseURL}/${url}/${id}`, {
        method: 'PUT',
        data,
        headers:{
            'Authorization': inMemoryToken,
            "Content-Type": "application/json; charset=utf-8"
        }
    });
}

export const DELETE = (url, id) => {
    if (!inMemoryToken)
        return;

    CheckIfLogged();
    return axios(`${apiBaseURL}/${url}/${id}`, {
        method: 'DELETE',
        headers:{
            'Authorization': inMemoryToken
        }
    });
}

export const GET_REGISTRATIONS_BY_ID = (url, id) => {
    if (!inMemoryToken)
    return;

    return axios(`${apiBaseURL}/${url}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': inMemoryToken
        }
    });
}

export const FORGOT_PASSWORD = (url, email) => {
    return axios(`${apiBaseURL}/${url}/${email}`, {
        method: 'GET'
    });
}

export function SetSession(token, id, role, riskLevel) {
    inMemoryToken = `Bearer ${token}`;
    inMemoryId = id;
    inMemoryRole = role;
    inMemoryRiskLevel = riskLevel;
}

export function ClearSession() {
    inMemoryToken = null;
    inMemoryId = null;
}

export function CheckIfLogged() {
    if (!inMemoryToken) {
        return false;
    }
}

export const CHECK_ROLE = () => {
    if(inMemoryRole !== "" && inMemoryRole !== null)
        return inMemoryRole; 
}

export const CHECK_ID = () => {
    if(inMemoryId !== "" && inMemoryId !== null)
    return inMemoryId; 
}

export const CHECK_RISK_LEVEL = () => {
    if(inMemoryRiskLevel !== "" && inMemoryRiskLevel !== null)
    return inMemoryRiskLevel; 
}