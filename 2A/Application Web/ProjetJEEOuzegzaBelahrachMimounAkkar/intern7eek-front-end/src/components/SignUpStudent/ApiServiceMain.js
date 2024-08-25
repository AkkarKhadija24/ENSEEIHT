// URL du backend pour l'inscription de l'entreprise
const SIGNUP_URL = "/back-end/rest/addstudent";

// Fonction pour s'inscrire
export async function signUpStudent(formData) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    const response = await fetch(SIGNUP_URL, requestOptions);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return await response.json();
}
