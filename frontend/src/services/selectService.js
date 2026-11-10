// selectService.js

export async function getDocumentTypes() {
    const res = await fetch("/src/data/selects/documentTypes.json")
    return res.json();
}

export async function getSupplierNames() {
    const res = await fetch("/src/data/selects/supplierNames.json")
    return res.json();
}