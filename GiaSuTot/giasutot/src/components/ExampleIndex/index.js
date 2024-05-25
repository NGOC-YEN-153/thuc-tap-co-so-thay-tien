import { useEffect, useState } from "react";

function Ex() {
    const [state, setState] = useState('bạn ')
    // useEffect(() => console.log(state))
    console.log(state + 1)
    return (
        <>
            <p>hello{state}</p>
            <button onClick={() => setState('world')}>click</button>
        </>
    );
}
export default Ex;