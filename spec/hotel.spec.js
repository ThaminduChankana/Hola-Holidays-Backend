var request = require("request");

describe("get hotel", () => {
	it("should return 200 ok", (done) => {
		request.get("http://localhost:5001/hotels/hotels", (err, res) => {
			done();
		});
	});
});

describe("get hotel by id", () => {
	it("should return 200 ok", (done) => {
		request.get("http://localhost:5001/hotels/hotels/64550b40202e2f797cba227b", (err, res) => {
			done();
		});
	});
});

describe("get rooms", () => {
	it("should return 200 ok", (done) => {
		request.get("http://localhost:5001/rooms/rooms/64550b40202e2f797cba227b", (err, res) => {
			done();
		});
	});
});
