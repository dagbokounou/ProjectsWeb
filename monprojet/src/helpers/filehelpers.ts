import { resolve } from "path";

export const convertFileToLink = (file: File): Promise<string> => {

    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function (evt) {
            resolve(evt.target?.result as string);
        };



        reader.onerror = function (evt) {
            reject(new Error("Error reading the file."));
        };
        reader.readAsDataURL(file);


    })





}


export const convertFileToBlob = (file: File): Promise<Blob> => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (evt) {
            if (evt.target?.result instanceof ArrayBuffer) {
                const blob = new Blob([evt.target.result], { type: file.type })
                resolve(blob)

            } else {
                reject(new Error("Error converting file to Blob"))
            }
        };



        reader.onerror = function (evt) {
            reject(new Error("Error reading the file."));
        };
        reader.readAsArrayBuffer(file);


    })







}

export const linkToBlob = (url: string): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await fetch(url)
            if (!response.ok) {

                reject(`la requete a échoué avec le avec le statut ${response.status}`);

            }
            const buffer = await response.arrayBuffer()
            const blob = new Blob([buffer])
            resolve(blob)


        } catch (error) {

            reject('Error de la conversion du lien en blob :' + error)
            throw error
        }


    })


}
export const convertFileToBlobToUrl = (blob: Blob): string => {
    return URL.createObjectURL(blob)

}