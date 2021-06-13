import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function Header() {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/login")
    }
    return (
        <nav style={{ backgroundColor: "#3f51b5" }} className="navbar navbar-expand-lg navbar-dark ">
            <div className="container">
                <Link className="navbar-brand" to="/">UniSubscribe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="row display-row">
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <button onClick={handleLogout} className="mx-3 text-white"><svg id="bold" enableBackground="new 0 0 24 24" fill="#fff" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="6" r="5" /><path d="m13.25 13h-8.5c-2.619 0-4.75 2.131-4.75 4.75v3.5c0 .414.336.75.75.75h16.5c.414 0 .75-.336.75-.75v-3.5c0-2.619-2.131-4.75-4.75-4.75z" /><path d="m23.761 9.45-3.5-3.25c-.141-.131-.325-.199-.51-.199-.496 0-.751.422-.751.749v2.25h-4c-.553 0-1 .448-1 1s.447 1 1 1h4v2.25c0 .416.338.75.75.75.186 0 .369-.069.511-.2l3.5-3.25c.152-.142.239-.342.239-.55s-.087-.408-.239-.55z" /></svg></button>
                    </div>
                </div>
            </div>
        </nav >


    )
}

export default Header


