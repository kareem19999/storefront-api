

const checkNull = (parameter : (string | number | undefined)[]) => {
    for(let index of parameter)
    {
        if(index == null)
        {
            //console.log("one of parameters is Null");
            throw new Error("One of parameters is null");
        }
    }
}

export default checkNull