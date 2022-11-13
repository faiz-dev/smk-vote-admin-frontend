export const useArrNumCreator = (count) => {
    const arr = []
    for(let i = 0; i < count; i++) {
        arr.push(i)
    }
    return arr
}