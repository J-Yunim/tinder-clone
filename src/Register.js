import React, { useEffect, useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import {
  GET_ERRORS,
} from "./actions/types";
import axios from './axios'

import './Register.css'


function Register(props) {

    const [user, setUser] = useState({
        name:"",
        email:"",
        password: "",
        password2: "",
        errors: {}
    })

    const dispatch = useDispatch();
    // Register User
    const registerUser = (userData, history) =>{
      console.log('registering....');
      axios
        .post("/api/users/register", userData)
        .then(res =>console.log(res.status) ) // history.push("/login")) // re-direct to login on successful register
        .catch(err =>
          {console.log(err);

          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })}
        );
    };

    useEffect(() => {
      console.log(props.errors);
      if (props.errors) {
        setUser({
          ...user,
          errors: props.errors
        });
      }
    }, [props])

    const onChange = e => {
        setUser({...user ,[e.target.id]: e.target.value });
      };

    const onSubmit = e => {
        e.preventDefault();
    
        const newUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            password2: user.password2
            };
        registerUser(newUser, 'props.history')
        console.log(newUser);
    };

    const { errors } = user;

    return (
        <div className={`register`}>
            <form noValidate className="input-container" onSubmit={onSubmit}>
              <div className="input-field">
              <label htmlFor="name">Name</label>
                <input
                  onChange={onChange}
                  value={user.name}
                  error={errors?.name}
                  placeholder='your name'
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors?.name
                  })}
                />
                <div className="red-text">{errors?.name}</div>
              </div>
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
                    invalid: errors?.email
                  })}
                />
                <div className="red-text">{errors?.email}</div>
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
                    invalid: errors?.password
                  })}
                />
                <div className="red-text">{errors?.password}</div>
              </div>
              <div className="input-field">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  onChange={onChange}
                  value={user.password2}
                  error={errors?.password2}
                  placeholder='confirm your password'
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors?.password2
                  })}
                />
                <div className="red-text">{errors?.password2}</div>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                  Sign up
                </button>
              </div>
            </form>
        </div>
    )
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(Register);
