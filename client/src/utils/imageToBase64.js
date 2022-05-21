const imageToBase64 = (file,formData,setFormData,attribute) => {
    const reader = new FileReader()
    reader.onload = () => {
        setFormData({...formData, [attribute]: `data:image/jpeg;base64,${reader.result.replace("data:", "")
            .replace(/^.+,/, "")}`})
    }
    reader.readAsDataURL(file)
}

export default imageToBase64