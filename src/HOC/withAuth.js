import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    return class ComponentWithAuth extends Component {
        render() {
            let jwt = localStorage.getItem("JWT")
            if (jwt !== null) {
                return <WrappedComponent {...this.props} />;
            } else {
                return <Redirect push to="/login" />
            }
        }
    };
};

export default withAuth;