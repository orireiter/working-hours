export function sortArrayOfObjectsByField<T>(arr: T[], fieldName: keyof T) {
    return arr.sort((a,b) => {
        if ( a[fieldName] < b[fieldName] ){
            return -1;
        }
        if ( a[fieldName] > b[fieldName] ){
            return 1;
        }
        return 0;
    });
}
