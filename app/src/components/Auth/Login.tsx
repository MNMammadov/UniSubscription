import React, { ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import "../../assets/style/login.scss";
import { loginService } from '../../modules/login';


export const Login = () => {

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })

    const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const history = useHistory();
    const submitMutation = useMutation(loginService.loginSubsc);
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(formState)
        if (formState.email && formState.password) {
            submitMutation.mutate(formState, {

                onSuccess: ({ token }) => {
                    localStorage.setItem("token", token);
                    history.push("/subscriptions")
                }
            })
        }
    }
    return (
        <div id="body">
            <div className="wrapper__area" id="wrapper_Area">
                <div className="forms__area">

                    <form
                        className="login__form"
                        id="loginForm"
                        onSubmit={(e) => handleLoginSubmit(e)}
                    >
                        <h1 className="form__title">Sign In</h1>
                        <div className="input__group">
                            <label className="field">
                                <input
                                    type="text"
                                    value={formState.email}
                                    onChange={handleLoginChange}
                                    name="email"
                                    placeholder="Email"
                                    id="loginUsername" />
                            </label>
                            <span className="input__icon"><i className="bx bx-user"></i></span>
                        </div>
                        <div className="input__group">
                            <label className="field">
                                <input
                                    type="password"
                                    value={formState.password}
                                    onChange={handleLoginChange}
                                    name="password"
                                    placeholder="Password"
                                    id="loginPassword" />
                            </label>
                            <span className="input__icon"><i className="bx bx-lock"></i></span>
                            <span className="showHide__Icon"><i className="bx bx-hide"></i></span>
                        </div>
                        <button type="submit" className="submit-button" id="loginSubmitBtn">Sign in</button>
                    </form>

                </div>

                <div className="aside__area" id="aside_Area">
                    <div className="login__aside-info">
                        <img src="https://d.top4top.io/p_1945xjz2y1.png" alt="login page" />
                        <p>Enter your personal details and start journey with us</p>
                        <button id="aside_signUp_Btn"><Link to="/register">Sign Up</Link></button>
                    </div>
                </div>
            </div>

        </div>
    )
}

