/*
    Provide 3 unique implementations of the following function in JavaScript.

    **Input**: `n` - any integer

    *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

    **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

var sum_to_n_a = function (n) {
    return Array.from({ length: n }, (_v, k) => {
        return k + 1
    }
    ).reduce((acc, cur) => acc + cur, 0)
};

var sum_to_n_b = function (n) {
    if (n < 1) return 0;
    return n + sum_to_n_b(n - 1)
};

var sum_to_n_c = function (n) {
    return (n / 2) * (1 + n)
};

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))