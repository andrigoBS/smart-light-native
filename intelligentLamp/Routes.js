import {fetch} from "react-native/Libraries/Network/fetch";
import {confirmButtonStyles} from "react-native-modal-datetime-picker";

const projectIP = "http://192.168.3.33"

export function setBrightness(body) {
    fetch(`${projectIP}/brightness`, {
        method: "POST",
        body: body
    });
}

export function getBrightness() {
    return fetch(`${projectIP}/brightness`, {
        method: "GET"
    }).then(response => response.json());
}

export function setLight(body) {
    fetch(`${projectIP}/light-on`, {
        method: "POST",
        body: body
    });
}

export function getLight() {
    return fetch(`${projectIP}/light`, {
        method: "GET"
    }).then(response => response.json());
}

export function setAutoOn(body) {
     fetch(`${projectIP}/auto-on`, {
        method: "POST",
        body: body
    });
}

export function setMaxOnTime() {
    return fetch(`${projectIP}/max-on-time`, {
        method: "POST",
        body: body
    });
}

export function setOffTime(body) {
    console.log("Aqui", body)
    fetch(`${projectIP}/off-time`, {
        method: "POST",
        body: body
    });
}

export function getOffTime() {
    return fetch(`${projectIP}/off-time`, {
        method: "GET"
    }).then(response => response.json());
}




