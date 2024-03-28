export async function addRecord(payload) {
    let response = await fetch("http://localhost:8000/wishlist", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export async function getRecord() {
    let response = await fetch("http://localhost:8000/wishlist", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export async function deleteRecord(payload) {
    let response = await fetch("http://localhost:8000/wishlist/" + payload.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}