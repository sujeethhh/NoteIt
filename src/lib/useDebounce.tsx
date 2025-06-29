import React from "react";
// Removed import of setTimeout from "timers/promises"

export function useDebounce(value:string, delay:number){
    const[debounceValue,setdebounceValue]=React.useState(value)

    React.useEffect(()=>{
        const handler = window.setTimeout(() => {
            setdebounceValue(value);
        }, delay);
        return ()=>{
            clearTimeout(handler);
        }
    },[value,delay])
    return debounceValue;
}