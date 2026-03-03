
JACKIMAGE FULL INTEGRATION PACKAGE

Format:
Header: JIMG
Width: uint32 LE
Height: uint32 LE
Depth: 24
Raw RGB pixel data

To integrate into convert system:
1. Register format id: jackimage
2. MIME: image/x-jackimage
3. Add decoder: jackimage -> bitmap
4. Add encoder: bitmap -> jackimage
5. Rebuild project (npm install && npm run build)
