
interface FormData {
    eventName: string;
    description: string;
    location: string;
    date: string;
    time: string;
}

export function validateEventInput(formData: FormData) {
    for (const field in formData) {
        const value = formData[field as keyof FormData].trim();

        if (value.length === 0) {
            return `The ${field} field cannot be blank`;
        }

        // if (field === 'date' && !isValidDate(value)) {
        //     return 'Invalid date format. Please use DD-MM-YYYY';
        // }
    }

    return null;
}

// function isValidDate(dateString: string) {
//     const regex = /^\d{2}-\d{2}-\d{4}$/;
//     return dateString.match(regex) !== null;
// }
