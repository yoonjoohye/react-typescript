import * as React from "react";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to="/">
                <span className="blue">M</span>andal-<span
                className="yellow">A</span>RT

            </Link>
            <Link to="/sign"><span>로그인/가입</span></Link>
        </header>
    )
}

export default Header;