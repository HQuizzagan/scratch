function maxpdr(input_array) {
  
  // Associate a rank to each element of the input_array
  var sorted = input_array.slice().sort(function(a,b){return a-b})
  var ranks = input_array.slice().map(function(v){ return sorted.indexOf(v)+1 });
  
  // Create a dictionary of % change : rank
  dict_ranks = {}
  
  for (var i = 0; i < input_array.length; i++) {
	var key = input_array[i]
	var value = ranks[i]
	dict_ranks[key] = value
  }
  
  // Generates bins for the % change (distance between each is 3 %)
  var initial = -0.35
  bins = [initial]
  var final = 0.5
  
  while (initial < final) {
        initial += 0.02
        bins.push(initial)
        }
  
  // For each bin, collate all % change qualified within this upper limit. These pairs were saved in a dictionary bins_dict where key:value pair is
  // bin_upper_limit : % change within the limit
  bins_dict = {}
  
  for (var i = 0; i < bins.length; i++) {
    bins_dict[bins[i]] = []
    
    for (var j = 0; j < sorted.length; j++) {
		if (i == 0) {
            if (sorted[j] < bins[i]) {
                bins_dict[bins[i]].push(sorted[j])
            }
        }

		else {
                if (sorted[j] > bins[i-1] && sorted[j] < bins[i]) {
                    bins_dict[bins[i]].push(sorted[j])
                }
        }
		
    }
}
  
  // Createb a frequency dictionary to summarize the number of % change qualified within each class interval
  // bin : frequency
  freq_dict = {}
  
  for (var i = 0; i < bins.length; i++) {
    var key = bins[i]
    var value = bins_dict[key].length
    freq_dict[key] = value
  }
  
  
  // Create a dictionary containing the max % change for each bin
  // bin : max % change
  max_dict = {}
  
  for (var i = 0; i < bins.length; i++) {
    var limit = bins[i]
    var max_change = Math.max.apply(null, bins_dict[limit])
    max_dict[bins[i]] = max_change
  }
  
  // Create a dictionary containing probability for each bin
  // bin: prob that x is within range
  prob_dict = {}
  
  for (var i = 0; i < bins.length; i++) {
    if (i == 0) {
        prob = dict_ranks[max_dict[bins[i]]]/sorted.length
        prob = prob || 0
        prob_dict[bins[i]] = prob
    }
    else {
        prob_cur = dict_ranks[max_dict[bins[i]]]
        prob_prev = dict_ranks[max_dict[bins[i-1]]]
        prob = (prob_cur - prob_prev)/sorted.length
        prob = prob || 0
        prob_dict[bins[i]] = prob
    }
  }
  
  // Extract now the range (a.k.a. bin/upper limit) with the highest probability
  // Step 1: Get the value from the prob_dict which is maximum (a.k.a. maximum probability)
  var arr = []
  
  for(var key in prob_dict) {
    if(prob_dict.hasOwnProperty(key)) {
        var value = prob_dict[key]
        }
    arr.push(value)
  }
  
  var max_prob = Math.max.apply(null, arr)

  // Step 2: Using the value, get the key (a.k.a. bin/upper limit) associated with this maximum probability
  Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
  }
  
  var highest_pdr = prob_dict.getKeyByValue(max_prob)
  
  return highest_pdr
}
