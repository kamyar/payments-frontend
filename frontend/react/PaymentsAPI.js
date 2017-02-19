
import request from 'superagent';
import dateFormat from 'dateformat';

import * as utils from './utils';

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
		this.get(this.constructURL('/payments'), {}, function(data) {
			// More maintainable but bad performance sort & slice
			// data = data.sort((lhs, rhs) => rhs.amount - lhs.amount).slice(0, 20);
			// Performant but harder to read get only the largest N
			data = utils.getMaxNOfArray(data, N, 'amount')
			SuccessCB(data);
		}, ErrorCB);
	}

	static getPaymentsBy(filters) {
		return request.get(this.constructURL('/payments')).query(filters).then(r => r.body);
	}

	static sendNewPayment(data, SuccessCB, ErrorCB) {
		var d = new Date();
		data.created = dateFormat(d, "ddd mmm dd yyyy HH:MM:ss Z");
		this.post(this.constructURL('/payments'), data, SuccessCB, ErrorCB);
	}

}
