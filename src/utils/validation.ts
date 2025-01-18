export const validation = () => {

    const validateEmail = (data: string) => {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data);
    };

    const validatePassword = (data: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return passwordRegex.test(data);
    }


    const validateFirstName = (data: string) => {
        return /^[A-Za-z]{2,}$/.test(data);
    };

    const validateLastName = (data: string) => {
        return /^[A-Za-z]{2,}$/.test(data);
    };

    const validatePhoneNumber = (data: string) => {
        const regex = /^[0-9]{10}$/;
        const isValid = regex.test(data);
        const isSequential = /^(.)\1{9}$/.test(data);
        return isValid && !isSequential;
    };

    return { validateEmail, validatePassword, validatePhoneNumber, validateLastName, validateFirstName }
}