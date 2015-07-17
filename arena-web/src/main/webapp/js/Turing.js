/**
 * Created by tsotne on 5/25/15.
 */

Turing = (function(){
    var turing = {
        state : "1000000",
        code : 'W1',
        run: function (state, code) {
            if(tape) this.state = state;
            if(code) this.code = code;
            return "get";
        }
    };
    return turing;
}());