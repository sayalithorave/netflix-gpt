export const checkValidate = (name, email, password) => {
    
// const isNameValid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(name)
const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
const isPasswordValid =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

// if(!isNameValid) return "Name not valid"
if (!isEmailValid) return "Email not valid"
if(!isPasswordValid) return "Password not valid"

return null  // It get when email & password is right or No Error

}