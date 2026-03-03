
export function decodeJackImage(buffer) {
  const bytes = new Uint8Array(buffer);
  const header = String.fromCharCode(...bytes.slice(0,4));
  if(header !== "JIMG") throw new Error("Invalid JackImage");

  const view = new DataView(bytes.buffer);
  const width = view.getUint32(4,true);
  const height = view.getUint32(8,true);
  const depth = view.getUint8(12);
  if(depth !== 24) throw new Error("Unsupported depth");

  const rgba = new Uint8ClampedArray(width*height*4);
  let pi=13, di=0;
  while(pi < bytes.length){
    rgba[di++] = bytes[pi++];
    rgba[di++] = bytes[pi++];
    rgba[di++] = bytes[pi++];
    rgba[di++] = 255;
  }

  return {width,height,data:rgba};
}
