
import React from 'react';

export default class PaymentsInspectionComp extends React.Component {
    _bind(methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    constructor(props) {
        super(props);
        this._bind([]);
    }

    render() {
        return (
            <main>
                <aside>
                    <button>Callback</button>
                    <button>Promise</button>
                    <button>Filter Payment-Method</button>
                    <button>Add payment</button>
                </aside>
                <section>
                {/* Payments Table Here */}
                </section>
            </main>
        );
    }
}