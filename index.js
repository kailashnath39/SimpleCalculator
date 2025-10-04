const precedence = new Map([
	["**", 2],
	["*", 1],
	["/", 1],
	["+", 0],
	["-", 0],
]);

function validParanthesis(exp) {
	let paranStk = [];
	let top = -1;

	for (let sc of exp) {
		if (sc == "(") {
			paranStk.push(sc);
			top++;
		} else if (sc == ")") {
			if (top == -1) return NaN;
			else {
				paranStk.pop();
				top--;
			}
		}
	}

	return top == -1;
}

function miniExpSolver(opr, opd1, opd2) {
	opd1 = Number(opd1);
	opd2 = Number(opd2);
	
	// console.log(opd1, opd2, opr);
	switch (opr) {
		case "+":
			return opd1 + opd2;
		case "-":
			return opd1 - opd2;
		case "*":
			return opd1 * opd2;
		case "/":
			return opd1 / opd2;
		default: {
			if (opr == "**") {
				
				return Math.pow(opd1, opd2);
			} else return NaN;
		}
	}
}

function postFixExpBuilder(exp) {
	if (!validParanthesis(exp)) {
		return NaN;
	}
	let opdStk = [];
	let oprStk = [];
	let top = -1;
	let opd1, opd2;

	const numRegEx = /[0-9]/;
	const oprRegEx = /(\*\*|-|\+|\*|\/)/;

	const oprSplitRegEx = /(\(|\)|\*\*|-|\+|\*|\/)/g;

	let pexp = [];

	exp = exp.split(oprSplitRegEx);
	for (let sc of exp) {
		if (numRegEx.test(sc)) {
			opdStk.push(sc);
		} else if (sc == "(") {
			oprStk.push(sc);
			top++;
		} else if (sc == ")") {
			while (oprStk[top] != "(") {
				opd2 = opdStk.at(-1);
				opdStk.pop();
				opd1 = opdStk.at(-1);
				opdStk.pop();
				res = miniExpSolver(oprStk[top], opd1, opd2);
				if (res == NaN) return NaN;
				else opdStk.push(res);
				oprStk.pop();
				top--;
			}
			oprStk.pop();
			top--;
		} else if (oprRegEx.test(sc)) {
			if (top == -1) {
				oprStk.push(sc);
				top++;
			} else {
				if (sc.includes("**") && oprStk[top].includes("**")) {
					oprStk.push(sc);
					top++;
				} else {
					while (
						top != -1 &&
						precedence.get(sc) <= precedence.get(oprStk[top])
					) {
						opd2 = opdStk.at(-1);
						opdStk.pop();
						opd1 = opdStk.at(-1);
						opdStk.pop();
						res = miniExpSolver(oprStk[top], opd1, opd2);
						if (res == NaN) return NaN;
						else opdStk.push(res);
						oprStk.pop();
						top--;
					}
					oprStk.push(sc);
					top++;
				}
			}
		}
	}
	while (top != -1) {
		opd2 = opdStk.at(-1);
		opdStk.pop();
		opd1 = opdStk.at(-1);
		opdStk.pop();
		res = miniExpSolver(oprStk[top], opd1, opd2);
		if (res == NaN) return NaN;
		else opdStk.push(res);
		oprStk.pop();
		top--;
	}
	$(".Expression")[0].value = opdStk[0];
	return opdStk[0];
}

function ExpSolver(exp) {
	if (!validParanthesis(exp)) {
		return NaN;
	}
	let opdStk = [];
	let oprStk = [];
	let oprTop = -1;
	let opdTop = -1;
	let opd1, opd2;

	const numRegEx = /[0-9]/;
	const oprRegEx = /(\*\*|-|\+|\*|\/)/;

	const oprSplitRegEx = /(\(|\)|\*\*|-|\+|\*|\/)/g;

	let pexp = [];

	exp = exp.split(oprSplitRegEx);
	for (let sc of exp) {
		if (numRegEx.test(sc)) {
			opdStk.push(sc);
			opdTop++;
		} else if (sc == "(") {
			oprStk.push(sc);
			oprTop++;
		} else if (sc == ")") {
			while (oprStk[oprTop] != "(") {
				opd2 = opdStk[opdTop--];
				opdStk.pop();
				opd1 = opdStk[opdTop--];
				opdStk.pop();
				res = miniExpSolver(oprStk[oprTop], opd1, opd2);
				if (res == NaN) return NaN;
				else {
					opdStk.push(res);
					opdTop++;
				}
				oprStk.pop();
				oprTop--;
			}
			oprStk.pop();
			oprTop--;
		} else if (oprRegEx.test(sc)) {
			if (oprTop == -1) {
				oprStk.push(sc);
				oprTop++;
			} else {
				if (sc.includes("**") && oprStk[oprTop].includes("**")) {
					oprStk.push(sc);
					oprTop++;
				} else {
					while (
						oprTop != -1 &&
						precedence.get(sc) <= precedence.get(oprStk[oprTop])
					) {
						opd2 = opdStk[opdTop--];
						opdStk.pop();
						opd1 = opdStk[opdTop--];
						opdStk.pop();
						res = miniExpSolver(oprStk[oprTop], opd1, opd2);
						if (res == NaN) return NaN;
						else {
							opdStk.push(res);
							opdTop++;
						}
						oprStk.pop();
						oprTop--;
					}
					oprStk.push(sc);
					oprTop++;
				}
			}
		}
	}
	while (oprTop != -1) {
		opd2 = opdStk[opdTop--];
		opdStk.pop();
		opd1 = opdStk[opdTop--];
		opdStk.pop();
		res = miniExpSolver(oprStk[oprTop], opd1, opd2);
		if (res == NaN) return NaN;
		else {
			opdStk.push(res);
			opdTop++;
		}
		oprStk.pop();
		oprTop--;
	}
	$(".Expression")[0].value = opdStk[0];
	return opdStk[0];
}

$(document).ready(() => {
	$(".Expression").keydown((event) => {
		const key = event.key;
		if (key >= "0" && key <= "9") {
			console.log("number");
		} else if (key == "+") {
			console.log("+");
		} else if (key == "-") {
			console.log("-");
		} else if (key == "*") {
			console.log("*");
		} else if (key == "/") {
			console.log("/");
		} else if (key == "**") {
			console.log("**");
		} else if (key == "(") {
			console.log("(");
		} else if (key == ")") {
			console.log(")");
		} else if (key == "c" || key == "C") {
			event.target.value = "";
			event.preventDefault();
		} else if (key == "Enter" || key == "=") {
			const exp = $(".Expression")[0].value;
			$(".Expression")[0].value = ExpSolver(exp);
		} else if (key == ".") {
			console.log(".");
		} else if (key === "Backspace") {
		} else if (/[a-zA-Z]/.test(key)) {
			event.preventDefault();
		}
	});

	$("#num0").mousedown(() => {
		$(".Expression")[0].value += "0";
	});
	$("#num1").mousedown(() => {
		$(".Expression")[0].value += "1";
	});
	$("#num2").mousedown(() => {
		$(".Expression")[0].value += "2";
	});
	$("#num3").mousedown(() => {
		$(".Expression")[0].value += "3";
	});
	$("#num4").mousedown(() => {
		$(".Expression")[0].value += "4";
	});
	$("#num5").mousedown(() => {
		$(".Expression")[0].value += "5";
	});
	$("#num6").mousedown(() => {
		$(".Expression")[0].value += "6";
	});
	$("#num7").mousedown(() => {
		$(".Expression")[0].value += "7";
	});
	$("#num8").mousedown(() => {
		$(".Expression")[0].value += "8";
	});
	$("#num9").mousedown(() => {
		$(".Expression")[0].value += "9";
	});
	$("#num00").mousedown(() => {
		$(".Expression")[0].value += "00";
	});
	$("#dot").mousedown(() => {
		$(".Expression")[0].value += ".";
	});

	$("#plus").mousedown(() => {
		$(".Expression")[0].value += "+";
	});
	$("#minus").mousedown(() => {
		$(".Expression")[0].value += "-";
	});
	$("#star").mousedown(() => {
		$(".Expression")[0].value += "*";
	});
	$("#divide").mousedown(() => {
		$(".Expression")[0].value += "/";
	});
	$("#power").mousedown(() => {
		$(".Expression")[0].value += "**";
	});
	$("#leftParanthesis").mousedown(() => {
		$(".Expression")[0].value += "(";
	});
	$("#rightParanthesis").mousedown(() => {
		$(".Expression")[0].value += ")";
	});

	$("#equalTo").mousedown(() => {
		const exp = $(".Expression")[0].value;
		$(".Expression")[0].value = ExpSolver(exp);
	});

	$("#clear").mousedown(() => {
		$(".Expression")[0].value = "";
	});
	


});

// console.log(ExpSolver("23**2+34-(24/2*5)+87"));
// console.log(ExpSolver("2**3**2"));
