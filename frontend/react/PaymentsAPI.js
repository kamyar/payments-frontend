
import request from 'superagent';

const API_ADDR = 'http://localhost:3000';

export default class PaymentsAPI {

	constructor() {

	}

	static constructURL(path) {
		return `${API_ADDR}${path}`
	}

	static get(path, params, SuccessCB, ErrorCB) {
		request
		  .get(this.constructURL('/payments')).query(params)
		  .end(function(err, resp){
		    if (err && ErrorCB) {
		    	ErrorCB(err);
		    } else if (SuccessCB) {
		    	SuccessCB(resp.body);
		    }
		  });
	}

	static post(path, data, SuccessCB, ErrorCB) {
		request
		  .post(this.constructURL('/payments')).send(data).set('Content-Type', 'application/json')
		  .end(function(err, resp){
		    if (err && ErrorCB) {
		    	ErrorCB(err);
		    } else if (SuccessCB) {
		    	SuccessCB(resp.body);
		    }
		  });
	}

	static getHighestPayments(N, SuccessCB, ErrorCB) {
		var doc = {};
		doc._sort = 'amount';
		doc._order = 'DESC';
		if (N) {
			doc._limit = N;
			doc._page = 1;
		}
		this.get(this.constructURL('/payments'), doc, SuccessCB, ErrorCB)
	}

	static getPaymentsBy(options, SuccessCB, ErrorCB) {
		this.get(this.constructURL('/payments'), options, SuccessCB, ErrorCB)
	}

	static sendNewPayment(data, SuccessCB, ErrorCB) {
		this.post(this.constructURL('/payments'), data, SuccessCB, ErrorCB)
	}

}
