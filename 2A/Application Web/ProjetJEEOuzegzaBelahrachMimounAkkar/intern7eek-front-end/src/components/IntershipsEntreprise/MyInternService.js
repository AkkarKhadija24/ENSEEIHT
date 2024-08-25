// URL du backend
const MYINTERNSHIP_URL = "/back/rest/offers";

// Fonction
export async function offre(formData) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    const response = await fetch(MYINTERNSHIP_URL, requestOptions);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return await response.json();
}
