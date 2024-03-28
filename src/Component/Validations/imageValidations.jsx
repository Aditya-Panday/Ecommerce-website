export default function imageValidations(e) {
    let { files } = e.target
    console.log(files);
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > 1048576)
            return "Pic Size Must Be Less then 1 MB"
        else if (files[i].type === "image/jpeg" || files[i].type === "image/jpg" || files[i].type === "image/png")
            return ""
        else
            return "Invalid File"
    }
}