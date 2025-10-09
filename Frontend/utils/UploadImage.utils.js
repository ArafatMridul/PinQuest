export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    try {
        const response = await fetch(
            "http://localhost:8000/journal/images-upload",
            {
                method: "POST",
                body: formData,
            }
        );
        
        const data = await response.json(); 
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Image upload failed.");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Image upload failed.");
    }
};
