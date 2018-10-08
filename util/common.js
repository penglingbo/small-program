const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const random = function (n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.floor(Math.random() * chars.length);
        res += chars[id];
    }
    return res;
}