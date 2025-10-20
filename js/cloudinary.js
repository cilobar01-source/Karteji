
// js/cloudinary.js
export async function uploadToCloudinary(file, folder = "karangtaruna"){
  const cloudName = "YOUR_CLOUD_NAME";          // <-- ganti
  const uploadPreset = "YOUR_UPLOAD_PRESET";    // <-- ganti

  if(!cloudName || !uploadPreset) throw new Error("Cloudinary belum dikonfigurasi.");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: formData
  });
  if(!res.ok) throw new Error("Upload gagal ke Cloudinary");
  const data = await res.json();
  return data.secure_url;
}
