export const uploadToCloudinary = async (file, folder = "general") => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("Cloudinary credentials missing in .env");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", `kruthik_loans/${folder}`);
  formData.append("resource_type", "auto");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary Upload Error:", data);
      return null;
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};
