import { Router } from "express";
import { readdirSync } from "fs";

const PathRouter = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName:string) => {
    const file = fileName.split('.').shift(); // obtener el nombre del archivo sin la extension
    return file;
}

readdirSync(PathRouter).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if(cleanName !== 'index') {
        import(`./${cleanName}`)
            .then((moduleRouter) => {
                console.log(`cargando ruta... /${cleanName}`);
                router.use(`/${cleanName}`, moduleRouter.router);
            })
    }
});

export { router }