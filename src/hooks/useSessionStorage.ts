export const useSessionStorage =   (key: string): any | boolean => {

    // Comprobando si tengo token guardado en sessionStorage
    const storedValue = sessionStorage.getItem(key);

    if(!storedValue){
        return false;
    }else {
        return storedValue;
    }
}