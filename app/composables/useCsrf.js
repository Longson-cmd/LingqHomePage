// read csrf token from cookie for csrf protection in Django
export const useCsrf = () => {
    const getCsrfToken = () => {
    if (process.server) return null

    const value = `; ${document.cookie}`
    const parts = value.split(`; csrftoken=`)

    if (parts.length === 2) return parts.pop().split(';').shift()

    return null
}
    return {
        getCsrfToken
    }
}
