const BASE_URL = 'http://localhost:3000';

class HttpService {
    getMeals() {
        return fetch(BASE_URL + '/meals');
    }
}

export function getImageUrl(imgLocation) {
    return BASE_URL + '/' + imgLocation;
}

export const httpService = new HttpService();