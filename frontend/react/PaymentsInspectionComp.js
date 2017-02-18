
import React from 'react';

import PaymentsAPI from './PaymentsAPI';

export default class PaymentsInspectionComp extends React.Component {
    _bind(methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    constructor(props) {
        super(props);
        this._bind([
            "ErrorHandler",
            "SetPaymentsData",
            "CallbackHandler",
            "PromiseHandler",
            "FilterPaymentHandler",
            "AddPaymentHandler",
            "getPaymentsTableComp",
        ]);
        this.state = {
            feedback: {},
        }
    }

    ErrorHandler(e) {
        // TODO: show a notification
        console.log("got error", e)
    }

    SetPaymentsData(data) {
        // TODO: set data to be rendered
        console.log("got data", data)
        this.setState({
            payments: data
        })
    }

    CallbackHandler() {
        PaymentsAPI.getHighestPayments(20, this.SetPaymentsData, this.ErrorHandler);
    }

    PromiseHandler() {
        PaymentsAPI.getPaymentsBy("Ginger", this.SetPaymentsData, this.ErrorHandler);
    }

    FilterPaymentHandler() {
        console.log("FilterPaymentHandler");
    }

    AddPaymentHandler() {
        console.log("AddPaymentHandler");
    }

    getPaymentsTableComp() {
        var PaymentsTableComp;
        var PaymentsTableCompInner;
        if (this.state.payments && this.state.payments.length) {
            PaymentsTableCompInner = this.state.payments.map(function(v, i) {
                return (
                    <tr key={i}>
                        <td>{v.id}</td>
                        <td>{v.merchant}</td>
                        <td>{v.method}</td>
                        <td>{v.amount/100}({v.currency})</td>
                        <td>{v.status}</td>
                        <td>{v.created}</td>
                    </tr>
                );
            })

            PaymentsTableComp = (
                <table className={{border: "1"}}>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Merchant</th>
                            <th>Method</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        {PaymentsTableCompInner}
                    </tbody>
                </table>
            );
            return PaymentsTableComp;
        } else {
            return (
                <div>
                    No data to be shown
                </div>
            );
        }

    }

    render() {
        return (
            <main>
                <aside>
                    <button onClick={this.CallbackHandler}>Callback</button>
                    <button onClick={this.PromiseHandler}>Promise</button>
                    <button onClick={this.FilterPaymentHandler}>Filter Payment-Method</button>
                    <button onClick={this.AddPaymentHandler}>Add payment</button>
                </aside>
                <section>
                    {this.getPaymentsTableComp()}
                    {/* TODO: Payment methods filter dropdown here */}
                </section>
            </main>
        );
    }
}