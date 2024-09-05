import { apiRequest } from './api';
import { API_URL } from './config';

export async function createResource(resource, data, token) {
    return await apiRequest(`${API_URL}/${resource}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(data),
    });
}

export async function updateResource(resource, id, data, token) {
    return await apiRequest(`${API_URL}/${resource}/${id}`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(data),
    });
}

export async function deleteResource(resource, id, token) {
    return await apiRequest(`${API_URL}/${resource}/${id}`, {
        method: 'delete',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined,
        },
    });
}
