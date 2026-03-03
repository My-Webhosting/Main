
export function encodeJackImage(bitmap){
  const {width,height,data} = bitmap;

  const header = new Uint8Array(13);
  header.set([74,73,77,71]); // JIMG
  const view = new DataView(header.buffer);
  view.setUint32(4,width,true);
  view.setUint32(8,height,true);
  view.setUint8(12,24);

  const rgb = new Uint8Array(width*height*3);
  let j=0;
  for(let i=0;i<data.length;i+=4){
    rgb[j++] = data[i];
    rgb[j++] = data[i+1];
    rgb[j++] = data[i+2];
  }

  const out = new Uint8Array(header.length + rgb.length);
  out.set(header,0);
  out.set(rgb,header.length);
  return out;
}
