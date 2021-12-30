

const checkNaN = (parameter : number[]) => {
    for(let index of parameter)
    {
        if(isNaN(index))
        {
            //console.log("one of parameters is NaN");
            throw new Error("One of parameters is NaN");
            
        }
    }
}

export default checkNaN