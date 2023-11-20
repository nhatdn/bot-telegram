export function getLocalToken() {
    return window.localStorage.getItem('t');
  }
  export function getLocalRefreshToken() {
    return window.localStorage.getItem('r');
  }
  
  // Set TOKEN
  export function setLocalToken(newToken) {
    window.localStorage.setItem('t', newToken);
  }
  export function setLocalRefreshToken(newRefeshToken) {
    window.localStorage.setItem('r', newRefeshToken);
  }
  
  // Remove TOKEN
  export function removeLocalToken() {
    return window.localStorage.removeItem('t');
  }
  export function removeLocalRefreshToken() {
    return window.localStorage.removeItem('r');
  }
  export function setProfile(profile) {
    localStorage.setItem("p", JSON.stringify(profile));
  }