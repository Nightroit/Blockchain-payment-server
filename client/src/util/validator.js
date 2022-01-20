import validator from "validator";

function Validator(userData, callback) {

    let error = []; 
    if(userData.userName.length < 4) {
        if(userData.userName == "") {
            error.push("Username is empty")
        } else {
            error.push("Invalid username")
        }
    }
    if(userData.email !== undefined) {
        if(userData.email !== undefined && userData.email === "") {

            error.push("Email is empty");
        } else {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(!pattern.test(userData.email)){ 
                error.push("Invalid email address"); 
            }

        } 
    }

    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if(!pattern.test(userData.password)) {
        error.push("Invalid password"); 
    }

    if(userData.confirmPassword !== undefined) {
        if(userData.confirmPassword === "") {
            error.push("Confirm password is empty")
        }
        if(userData.password == "") {
            error.push("Password is empty"); 
        } else {
            if(userData.password !== userData.confirmPassword) {
                error.push("Password does not match");
            }
        }
    }
    callback(error);
}

export default Validator; 