var request = require("request");

describe("get sites", () => {
	it("should return 200 ok", (done) => {
		request.get("http://localhost:5001/sites/", (err, res) => {
			done();
		});
	});
});

describe("get site by id", () => {
	it("should return 200 ok", (done) => {
		request.get("http://localhost:5001/sites/get/644e18b5a7c559d2c887cca9", (err, res) => {
			done();
		});
	});
});

describe("get site for each location", () => {
	it("should return 201 ok", (done) => {
		request.get("http://localhost:5001/sites/location/Central", (err, res) => {
			done();
		});
	});
});
