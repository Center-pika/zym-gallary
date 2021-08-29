let defaultToken = ''
try {
    if (localStorage.token) {
        defaultToken = localStorage.token
    }
} catch (e) { console.log(e) }

export default {
    token: defaultToken
}
