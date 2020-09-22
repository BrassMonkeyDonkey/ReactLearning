import React, { Component } from "react";

import Aux from "../Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super();
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });

            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
        }

        state = {
            error: null
        }

        errorHandledConfirmed = () => {
            this.setState({error: null});
        };

        render() {
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorHandledConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.state.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;