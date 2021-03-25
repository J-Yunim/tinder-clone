import React, { useState,useEffect } from 'react'
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "./actions/authActions";
import classnames from "classnames";
import { useHistory } from 'react-router';

import './Register.css'



function Login(props) {

    const [user, setUser] = useState({
        email:"",
        password: "",
        errors: {}
    })

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      if (props.auth.isAuthenticated) {
        // history.push("/dashboard"); // push user to dashboard when they login
        console.log('logged in!!');
      }

      if (props.errors) {
        setUser({
          ...user,
          errors: props.errors
        });
      }
    }, [props])

    const onChange = e => {
        setUser({...user, [e.target.id]: e.target.value });
      };
    const onSubmit = e => {
        e.preventDefault();
    
        const userData = {
            email: user.email,
            password: user.password
        };

        loginUser(userData,dispatch)
        console.log(userData);
    };


    const { errors } = user;

    return (
        <div className={`login`}>
            <form noValidate className="input-container" onSubmit={onSubmit}>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  onChange={onChange}
                  value={user.email}
                  error={errors?.email}
                  placeholder='your email'
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors?.email || errors?.emailnotfound
                  })}
                />
                <span className="red-text">
                  {errors?.email}
                  {errors?.emailnotfound}
                </span>
              </div>
              <div className="input-field">
              <label htmlFor="password">Password</label>
                <input
                  onChange={onChange}
                  value={user.password}
                  error={errors?.password}
                  placeholder='your password'
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors?.password || errors?.passwordincorrect
                  })}
                />
                <span className="red-text">
                  {errors?.password}
                  {errors?.passwordincorrect}
                </span>
              </div>
              <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Log In
                </button>
            </form>
        </div>
    )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
