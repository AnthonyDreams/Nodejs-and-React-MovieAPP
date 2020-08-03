const fs = require("fs")
const FileType = require('file-type');
 
export class Base64FileUtil{
    file : any
    fileBuffer : Buffer
    ext : string
    fileName : string

    constructor(file){
        this.file = file
    }

    async initFileFromBase64(filename){
       await this.setFileBufferFromBase64()
        this.setFullFileName(filename)

        return this

    }
    public setFullFileName(filename){
        this.fileName = `${filename}.${this.ext}`
    }

    public async setFileBufferFromBase64(){
        this.fileBuffer = await Buffer.from(this.file, 'base64');
        const mime = await FileType.fromBuffer(this.fileBuffer)
        this.ext = mime.ext
    }

    public saveFileToPath(location){
        fs.lstat("src/"+ location, async (err, stats) =>{
        
            fs.writeFileSync(`src/${location}${this.fileName}`, this.fileBuffer)
        }) 
    }


}