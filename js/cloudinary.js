// js/cloudinary.js
// Upload multi file ke Cloudinary (unsigned)
const CLOUD_NAME = "dxdmjdcz3";
const UPLOAD_PRESET = "karteji_upload"; // harus unsigned preset

export async function uploadToCloudinary(files){
  if(!files || files.length===0) return [];
  const urls = [];
  for (const file of files){
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);
    // optional: form.append("folder","karteji");

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
      method: "POST",
      body: form
    });
    if(!res.ok){
      const t = await res.text();
      throw new Error("Upload gagal: "+t);
    }
    const json = await res.json();
    urls.push(json.secure_url);
  }
  return urls;
}
