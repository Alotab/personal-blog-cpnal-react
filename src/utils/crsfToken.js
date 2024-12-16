const getCSRFToken = () => {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(';');

    for (let i = 0; i < cookieArr.length; i++) {
        let c = cookieArr[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);  // Return the CSRF token value
        }
    }
    return '';  // Return an empty string if not found
};

export default getCSRFToken;




// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// };

// const csrftoken = getCookie('csrftoken');

// console.log('cookiiess', csrftoken);