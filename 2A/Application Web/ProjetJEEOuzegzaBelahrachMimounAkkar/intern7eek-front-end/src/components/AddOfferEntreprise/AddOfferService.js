// URL du backend 
const OFFERINTERNSHIP_URL = "/back/rest/addoffer";

export async function addOffer(offer, companyId) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer)
    };

    const response = await fetch(`${OFFERINTERNSHIP_URL}/${companyId}`, requestOptions);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return await response.json();
}

