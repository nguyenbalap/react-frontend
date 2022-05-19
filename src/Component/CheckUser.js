import React from 'react';

export default function check() {

    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        return true;
    } else {
        alert("No account please login");
        return false;
    }
}