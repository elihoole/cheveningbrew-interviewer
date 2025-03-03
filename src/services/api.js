const API_BASE_URL = 'http://localhost:8000'; // Update this with your FastAPI server URL

export const uploadEssay = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
    });
    return response.json();
};

export const startInterview = async () => {
    const response = await fetch(`${API_BASE_URL}/interview`, {
        method: 'POST',
    });
    return response.json();
};

export const getFeedback = async (sessionId) => {
    const response = await fetch(`${API_BASE_URL}/feedback?session_id=${sessionId}`);
    return response.json();
};

export const sendAudioChunk = async (audioBlob, sessionId) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('session_id', sessionId);

    const response = await fetch(`${API_BASE_URL}/interview/audio`, {
        method: 'POST',
        body: formData,
    });
    return response.json();
};
