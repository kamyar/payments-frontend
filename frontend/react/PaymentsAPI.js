
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
		  	console.log(resp);
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

	static getPaymentsBy(merchant, SuccessCB, ErrorCB) {
		console.log(SuccessCB, ErrorCB);
		var doc = {};
		if (merchant) {
			doc.merchant = merchant;
		}
		this.get(this.constructURL('/payments'), doc, SuccessCB, ErrorCB)
	}

}