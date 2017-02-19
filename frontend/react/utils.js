

// Inspired by http://stackoverflow.com/a/11792417/1329429
export function getMaxNOfArray(arr, N, key){
    if (arr.length < N) {
    	return arr.sort((lhs, rhs) => rhs[key] - lhs[key]);
    }
    var initialObj = {};
    initialObj[key] = Number.NEGATIVE_INFINITY;
    var result = Array(N).fill(initialObj);

    for (var i = 0; i < arr.length; i++){
    	var currentMin = Number.POSITIVE_INFINITY;
    	var currentMinIndex = -1;
        for (var j = 0; j < result.length; j++){
            if (result[j][key] < currentMin){
            	currentMin = result[j][key];
            	currentMinIndex = j;
            }
        }
        if (currentMin < arr[i][key]) {
            result[currentMinIndex] = arr[i];
        }
    }
    return result.sort((lhs, rhs) => rhs[key] - lhs[key]); 
}
