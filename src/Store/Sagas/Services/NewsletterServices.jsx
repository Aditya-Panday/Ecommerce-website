export async function addRecord(payload) {
    let response = await fetch("http://localhost:8000/newsletter", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export async function getRecord() {
    let response = await fetch("http://localhost:8000/newsletter", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export async function deleteRecord(payload) {
    let response = await fetch("http://localhost:8000/newsletter/" + payload.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}