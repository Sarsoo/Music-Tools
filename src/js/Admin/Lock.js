import React, { Component } from "react";
const axios = require('axios');

import showMessage from "../Toast.js"

class Lock extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            accounts: []
        }

        this.getUserInfo();

        this.handleLock = this.handleLock.bind(this);
    }

    getUserInfo(){
        axios.get('/api/users')
        .then((response) => {
            this.setState({
                accounts: response.data.accounts,
                isLoading: false
            })
        })
        .catch((error) => {
            showMessage(`error getting users info (${error.response.status})`);
        });
    }

    handleLock(event, username, to_state){
        axios.post('/api/user', {
            username: username,
            locked: to_state
        }).catch((error) => {
            var lockMessage = to_state ? 'locking' : 'unlocking';
            showMessage(`error ${lockMessage} ${username} (${error.response.status})`);
        }).finally(() => {
            this.getUserInfo();
        });
    }

    render() {

        const loadingMessage = <p className="center-text text-no-select">loading...</p>; 

        return this.state.isLoading ? loadingMessage : 
            <div>
                <table className="app-table max-width">
                    <thead>
                        <tr>
                            <th colSpan='3'>
                                <h1 className="text-no-select">
                                    account locks
                                </h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.accounts.map((account) => <Row account={account} handler={this.handleLock}
                        key= {account.username}/>) }
                    </tbody>
                </table>
            </div>;

    }
}

function Row(props){
    return (
        <tr>
            <td className="ui-text center-text text-no-select" style={{width: "40%"}}>{ props.account.username }</td>
            <td className="ui-text center-text text-no-select" style={{width: "30%"}}>
                { props.account.last_login }
            </td>
            <td style={{width: "30%"}}>
                <button className="button full-width"
                        onClick={(e) => props.handler(e, props.account.username, !props.account.locked)}>
                            {props.account.locked ? "unlock" : "lock"}
                </button>
            </td>
        </tr>
    );
}

export default Lock;