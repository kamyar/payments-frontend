
import React from 'react';

import PaymentsAPI from './PaymentsAPI';

import NotificationSystem from 'react-notification-system';

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
            "submitNewPayment",
            "AddPaymentHandler",
            "cancelAddPayment",
            "getPaymentsTableComp",
            "PaymentMethodChangeHandler",
            "getInputForm",
        ]);
        this.state = {};
        this._notificationSystem = null;
    }

    ErrorHandler(e) {
        this.addNotification({msg: e.message, level: "error"})
    }

    SetPaymentsData(data) {
        this.addNotification({msg: "Payments data updated", level: "success"})
        this.setState({
            payments: data,
            showInputForm: false,
        });
    }

    CallbackHandler() {
        PaymentsAPI.getHighestPayments(20, this.SetPaymentsData, this.ErrorHandler);
    }

    PromiseHandler() {
        var that = this;
        PaymentsAPI.getPaymentsBy({merchant: "Ginger"})
            .then(that.SetPaymentsData)
            .catch(that.ErrorHandler);
    }

    FilterPaymentHandler() {
        if (this.state.paymentMethod) {
            var that = this;
            PaymentsAPI.getPaymentsBy()
                .then(function(data) {
                     return data.filter((item) => item.method == that.state.paymentMethod)
                 }) //Filter data by payment method
                .then(that.SetPaymentsData)
                .catch(that.ErrorHandler);
        } else {
            this.addNotification({msg: "Please select a valid payment method to filter", level: "warning"})
        }
    }

    AddPaymentHandler() {
        this.setState({
            showInputForm: true,
        })
    }

    cancelAddPayment() {
        this.setState({
            showInputForm: false,
        })
    }

    PaymentMethodChangeHandler(e) {
        var value = e.target.value;
        this.setState({
            paymentMethod: value,
        });
    }

    submitNewPayment(e) {
        e.preventDefault();

        var doc = {};
        doc.amount = this.refs.amount.value * 100;
        doc.currency = this.refs.currency.value;
        doc.method = this.refs.method.value;
        doc.merchant = this.refs.merchant.value;
        doc.status = this.refs.status.value;

        var successNotification = {
            msg: "New payment submitted successfully", 
            level: "success"
        };
        PaymentsAPI.sendNewPayment(doc, (r) => this.addNotification(successNotification), this.ErrorHandler);
    }


    getPaymentsTableComp() {
        var PaymentsTableComp;
        var PaymentsTableCompInner;
        if (this.state.payments && this.state.payments.length) {
            PaymentsTableCompInner = this.state.payments.map(function(v, i) {
                return (
                    <tr key={i}>
                        <td>{i+1}</td>
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
                <table className="payment-table">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Transaction ID</th>
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

    getInputForm() {
        return (
            <section className="flex-set flex--content-center main-section">
                <form onSubmit={this.submitNewPayment}>
                    <input type="number" placeholder="Amount(e.g. 25.04)" step="0.01" ref="amount"/>
                    <select ref="currency">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="AUD">AUD</option>
                    </select>
                    <select ref="method">
                        <option value="creditcard">Credit Card</option>
                        <option value="bank-transfer">Bank Transfer</option>
                        <option value="ideal">iDeal</option>
                    </select> <br/>
                    <input type="Merchant" placeholder="Merchant" ref="merchant"/>
                    <select ref="status">
                        <option value="accepted">ACCEPTED</option>
                        <option value="denied">DENIED</option>
                    </select> <br/>
                    <input type="reset" value="Cancel" onClick={this.cancelAddPayment}/>
                    <input type="submit" value="Submit" />
                </form>
            </section>
        );
    }

    addNotification(feedback) {
        this._notificationSystem.addNotification({
          message: feedback.msg,
          level: feedback.level
        });
    }

    componentDidMount() {
      this._notificationSystem = this.refs.notificationSystem;
    }

    render() {
        var mainComp;
        if (this.state.showInputForm) {
            mainComp = this.getInputForm();
        } else {
            mainComp = (
                <section className="flex-set flex--column main-section">
                    <form className="flex-set flex--content-center">
                        Payment Method Filter
                        <select type="option" onChange={this.PaymentMethodChangeHandler} className="no-margin">
                            <option value="">No Filter Selected</option>
                            <option value="creditcard">Credit Card</option>
                            <option value="bank-transfer">Bank Transfer</option>
                            <option value="ideal">iDeal</option>
                        </select>
                    </form>
                    {this.getPaymentsTableComp()}
                </section>
            );
        }

        return (
            <main>
                <aside>
                    <button onClick={this.CallbackHandler}>Callback</button>
                    <button onClick={this.PromiseHandler}>Promise</button>
                    <button onClick={this.FilterPaymentHandler}>Filter Payment-Method</button>
                    <button onClick={this.AddPaymentHandler}>Add payment</button>
                </aside>
                {mainComp}
                <NotificationSystem ref="notificationSystem" />
            </main>
        );
    }
}