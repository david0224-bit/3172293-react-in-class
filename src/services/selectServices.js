// selectService.js
//😂

export async function getDocumentTypes() {
    const response = await fetch("/src/data/selects/documentTypes.json")
    return response.json();
}
