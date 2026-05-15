import { ServerResponse } from "@/types/client-types";
import supabase from "./db";


export async function uploadImg(file: File): Promise<ServerResponse<string>> {
  const fileName = `${Date.now()}-${file.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')
  }`
  const {data: uploadData, error: uploadError} = await supabase.storage
    .from('images')
    .upload(fileName, file);

  if (uploadError) {
    return {
      message: uploadError.message,
      success: false
    };
  }

  const { data } = supabase.storage.from('images').getPublicUrl(uploadData.path)

  const imageUrl = data.publicUrl;
  const path = uploadData.path;
  
  return {
    message: 'Image successfully registered!',
    success: true,
    data: imageUrl,
    path
  };
};