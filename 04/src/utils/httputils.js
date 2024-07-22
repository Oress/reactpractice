const BASE_URL = 'http://localhost:3000';

class HttpService {
    getMeals() {
        return fetch(BASE_URL + '/meals');
    }

    saveOrder(payload) {
        return fetch(BASE_URL + '/orders', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }});
    }
}

export function getImageUrl(imgLocation) {
    return BASE_URL + '/' + imgLocation;
}

export const httpService = new HttpService();