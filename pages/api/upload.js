// usamos multipary para traer archivos de nuestro request -
// cuando le damos a upload, ya se carga nuestro file y dentro de el tiene propiedades 
import { mongooseConnect } from "@/lib/mongoose";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
//  esta libreria especifican tipos de datos, como por ejemplo texto, imagen, audio, etc. que los archivos contienen. 
import mime from 'mime-types';
// ESTO SE DEBE CAMBIAR 
const bucketName = 'allcot-inventary';

export default async function handle(req, res) {
    
    await mongooseConnect();
    const {method} = req

    if(method === 'POST') {
        // INICIAMOS EL MULTIPARTY
        const form = new multiparty.Form();
        const { fields, files } = await new Promise((resolve, reject) => {
            // el callback tiene todas esas cosas
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });
    
        // ME CONECTO CON LA NUBE EN AWS
        const client = new S3Client({
            region: 'eu-north-1',
            // Las credenciales estan en la parte de usuario, cuando se crea un nuevo bucket. Las politicas que se usaron son las mismas que las de ecommerce -admin 
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
        });
        // creo el array vacio para agregar los links nuevos
        const links = []
        // codigo para crear un loop de todos los archivos. 
        // Dentro de file yo tengo un objeto con props, one of them is called "originalFilename" y de eso tenemos que obtener la extension. JPG, PNG, PDF etc . 
        // entonces hacemos esta formula: 
    
        for (const file of files.file) {
            const ext = file.originalFilename.split('.').pop();
            // y el nombre del archivo sera el nombre mas un random caracter
            const nameFile = file.originalFilename.split('.')[0];
            const randomStr = (Math.random() + 1).toString(36).substring(7)
            const newFilename = nameFile + randomStr + '.' + ext;
            //  si me fijo en los bucket aparece como 
            // estas son propiedades de aws, para enviarle la informacón con el comando, fiel.path es el path para que lo lea
            await client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
            }));
            const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
            links.push(link);
        }
        return res.json({links});
    }
    
}

export const config = {
    api: { bodyParser: false }
}