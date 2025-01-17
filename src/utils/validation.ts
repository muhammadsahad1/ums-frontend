export const validation = (data: string) => {

    const validateEmail = (data: string) => {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data);
    };

    const validatePassword = (data: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return passwordRegex.test(data);
    }

    return { validateEmail, validatePassword }
}