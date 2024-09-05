export async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw data.errors.messages;
        }
        
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
