
// js/app.js
import { listenDoc } from "./data.js";
import { setSrc, setText, toast } from "./ui.js";
import { uploadToCloudinary } from "./cloudinary.js";

// Branding realtime (logo & nama portal)
listenDoc("sistem/branding", (d)=>{
  if(d?.logo) setSrc("#logoImg", d.logo);
  if(d?.nama_portal) setText("#portalName", d.nama_portal);
});

// Simple demo upload for logo
const logoInput = document.querySelector("#logoUpload");
if(logoInput){
  logoInput.addEventListener("change", async (e)=>{
    try{
      const file = e.target.files[0];
      if(!file) return;
      const url = await uploadToCloudinary(file, "logo");
      // save to Firestore (sistem/branding) via fetch to a callable endpoint OR ask admin to set manually
      // In pure static, we just preview:
      document.querySelector("#logoImg").src = url;
      toast("Logo diupload ke Cloudinary. Simpan URL ke Firestore via panel admin.");
    }catch(err){ toast(err.message) }
  });
}
