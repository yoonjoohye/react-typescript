import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../public/css/style.scss';

interface Props{
    color: string;
}

const App= ({color}:Props) => {
    return(
        <div>hello world,{color}</div>
    )
}


ReactDOM.render(<App color="red"/>,document.getElementById('root'));

