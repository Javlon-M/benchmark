export default async function importTests(path: string){
   return (await import(path)).default
}