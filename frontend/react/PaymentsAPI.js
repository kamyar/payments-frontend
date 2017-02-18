
import request from 'superagent';

const API_ADDR = 'http://localhost:3000';

export default class PaymentsAPI {

	constructor() {

	}

	static constructURL(path) {
		return `${API_ADDR}${path}`
	}

	static getHighestPayments(N, callback) {
		var doc = {};
		doc._sort = 'amount';
		doc._order = 'DESC';
		if (N) {
			doc._limit = N;
			doc._page = 1;
		}
		request
		  .get(this.constructURL('/payments')).query(doc)
		  .end(function(err, resp){
		    console.log('Got data', resp.body);
		  });
	}

}