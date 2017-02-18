
import React from 'react';

import PaymentsAPI from './PaymentsAPI';

export default class PaymentsInspectionComp extends React.Component {
    _bind(methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    constructor(props) {
        super(props);
        this._bind([]);
    }

    CallbackHandler() {
        PaymentsAPI.getHighestPayments(20);
    }

    PromiseHandler() {
        console.log("PromiseHandler");
    }

    FilterPaymentHandler() {
        console.log("FilterPaymentHandler");
    }

    AddPaymentHandler() {
        console.log("AddPaymentHandler");
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
                {/* Payments Table Here */}
                </section>
            </main>
        );
    }
}