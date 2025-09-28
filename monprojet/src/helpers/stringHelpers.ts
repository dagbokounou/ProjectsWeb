export const slugyfy = (name: string): string => {
    const randomNumber = Math.floor(Math.random() * 1000)// générer un nombre aléatoire
    let baseSlug = name
        .toLowerCase()
        .replace(/\s+/g, '-')//remplacer les espaces par des tirets
        .replace(/[^\w-g]+/g, '')//supprimer les caractères non alphanumériques et non tirets
        .replace(/--+/g, '-')// remplacer les doubles tirets par un seul tiret
        .trim()// supprimer les espaces 
    return `${baseSlug}-${randomNumber}`
}