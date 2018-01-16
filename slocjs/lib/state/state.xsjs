function saveState(state) {
	
	var conn = $.hdb.getConnection();
	var output = JSON.stringify(state);
	var fnCreateState = conn.loadProcedure("sloc.slocdb::createState");
	var result = fnCreateState({
		IM_STATE: state.code,
		IM_STATENAME: state.name
	});
	conn.commit();
	conn.close();
	
	if (result === null) {
		return output;
	} else {
		return result.EX_ERROR;
	}
}

var state = {
	code: $.request.parameters.get("code"),
	name: $.request.parameters.get("name")
};

// validate the inputs here!
var output = saveState(state);
$.response.contentType = "application/json";
$.response.setBody(output);