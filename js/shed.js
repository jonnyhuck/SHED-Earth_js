/**
 * This script contains functions relating to the web page itself
 * 	- The specifics of the calculation are in `schmidt.js`
 * 	- The two are linked using the `calc` function on this page
 */


/**
 * Write a reference for today's date into the ref div
 */
function populateReference(){
	var d = new Date();
	document.getElementById('ref').innerHTML = ["<p>Tomkins, M., Huck, J. J., Dortch, J., Hughes P. D., Kirkbride, M. & Barr, I. (", d.getFullYear(),"). SHED Earth. <a href=\"http://www.shed.earth/shedcalc\">http://shed.earth</a>. <em>Accessed ", d.getDate(), "/", d.getMonth()+1, "/", d.getFullYear(), ".</em></p>"].join('');
}

/**
 * Populate the form with a sample dataset
 */
function loadDemoValues(){

	//load user inputs
	document.getElementById('tabdata').value = ["CLU-A	57.1044	-3.678	62.00126984	62.00253968	60.00380952	58.00507937	58.00634921	55.00761905	53.00888889	53.01015873	54.01142857	62.01269841	62.01396825	56.0152381	60.01650794	56.01777778	56.01904762	58.02031746	61.0215873	60.02285714	60.02412698	64.02539683	64.02666667	64.02793651	55.02920635	58.03047619	55.03174603	57.03301587	61.03428571	65.03555556	64.0368254	64.03809524","CLU-B	57.1036	-3.6796	62.11555556	62.1168254	58.11809524	60.11936508	62.12063492	60.12190476	58.1231746	60.12444444	60.12571429	62.12698413	62.12825397	58.12952381	60.13079365	56.13206349	66.13333333	60.13460317	62.13587302	55.13714286	56.1384127	59.13968254	58.14095238	64.14222222	61.14349206	54.1447619	56.14603175	56.14730159	67.14857143	60.14984127	60.15111111	59.15238095","CLU-C	57.1037	-3.6794	58.15365079	55.15492063	53.15619048	58.15746032	61.15873016	56.16	60.16126984	50.16253968	55.16380952	54.16507937	53.16634921	60.16761905	55.16888889	61.17015873	54.17142857	54.17269841	54.17396825	56.1752381	62.17650794	55.17777778	54.17904762	62.18031746	60.1815873	52.18285714	62.18412698	59.18539683	62.18666667	57.18793651	58.18920635	60.19047619","SRAM-A	56.63416	-4.77468	44.13374917	48.1460281	42.12787951	47.14322068	42.12808936	40.12208979	40.12218972	50.15286206	46.14074801	46.14086292	50.15323678	47.14415999	50.1534866	43.13210589	44.13528804	45.13847519	44.13550788	50.15411114	44.13572772	48.14818651	42.12976812	50.15461077	46.14235682	42.13008289	42.13018781	48.14890599	43.13350237	46.1429314	52.16170453	48.14938563","SRAM-B	56.63369	-4.77309	52.15027294	40.1156945	43.124479	42.12168907	44.1275937	42.12189891	44.12781354	48.13955286	48.13967278	46.13396799	47.13699775	44.12836314	42.12263337	48.14027234	42.12284322	46.13465749	46.1347724	46.13488732	45.1320674	45.13217982	40.1175931	47.1382893	49.14429637	44.12968217	50.14749101	50.14761591	45.13296674	45.13307916	48.14207101	47.13922861","SRAM-C	56.63368	-4.7734	40.11859236	50.14836536	49.14552047	46.13672596	50.14874009	44.1310012	43.12813132	43.12823874	46.13730054	50.14936463	44.13155079	40.11969156	45.13476542	48.14386969	43.12899068	46.13810495	43.12920553	52.15637845	45.13543992	40.12049097	44.13264998	48.14482898	52.15702797	42.12693521	50.15123825	45.13622684	50.15148807	40.12129038	48.14566837	47.14275102","BBC-A	56.62167	-4.78079	43.21772042	43.21782784	42.212867	50.25353801	43.21815011	38.19287875	54.27422575	50.25403764	40.20333004	48.24411596	38.1933534	44.2239928	39.1986365	40.20382967	44.22432256	46.23463395	37.18881974	40.20422938	36.18389637	40.20442923	45.2300953	48.2455549	46.23543836	48.24579472	40.20492886	52.26653743	36.18461584	44.22575151	46.23612785	44.22597134","BBC-B	56.62139	-4.77957	52.27887835	39.20925619	48.25766599	39.20945105	53.284771	42.22577251	38.2043653	48.25826555	42.22608728	38.20465009	40.21552107	50.26952625	42.22650697	40.21582085	40.21592078	45.24302329	46.24853873	40.21622056	44.23795253	36.19477837	36.1948683	42.22745128	52.28173625	47.25476364	40.21692004	40.21701997	46.24968788	52.28238577	40.21731975	46.25003263","BBC-C	56.62107	-4.78055	48.26102352	49.26658392	40.21771945	37.20148293	40.21791931	46.25072212	38.2072132	44.240041	43.23469294	50.27302368	36.19666698	50.27327349	36.19684685	47.25711191	44.24081043	50.27377312	48.26294211	41.22469881	39.21383532	51.27975821	42.23049404	40.21961806	46.25267568	40.21981791	43.23641168	42.23101865	40.22011769	40.22021762	53.29192075	44.24245922","CR-A	54.51355	-2.58822	35.40237451	41.83949372	42.9126334	30.03907589	32.18497328	34.33090388	32.18547151	39.6957221	35.40456671	35.40484073	30.04070343	39.69695106	43.98885379	36.47884401	45.06245018	38.62525623	39.69848725	30.04233097	40.77205043	34.33462398	32.18895909	32.18920821	37.55436687	31.11671622	27.89796147	40.77425924	40.77457478	40.77489032	36.48307893	35.41032122","CR-B	54.51476	-2.58823	36.60165689	32.29582872	36.60222155	40.9086808	37.67933874	36.60306853	30.143936	34.4504783	35.52732977	38.75738596	36.60448018	34.45154118	43.06475863	43.06509078	43.06542293	39.83582345	36.60617415	43.06641938	32.30006365	36.60702113	29.07050569	35.53089209	33.37776211	36.60815045	30.14812111	45.22253042	36.60899743	43.06974089	38.76306574	34.45632416","CR-C	54.51491	-2.58754	43.1444749	32.35860529	30.20159744	32.35910352	34.51664281	29.12364157	40.98914442	43.14679996	36.6750623	32.3605982	32.36084731	39.91201892	38.83361464	45.30623251	40.99166877	36.67703859	36.67732092	32.3625911	43.15045362	30.20555004	32.36333844	37.75751882	35.60022034	36.67929722	40.9948242	43.15277868	40.99545529	38.83809869	40.99608638	37.75984388","BF-A	55.13041	-8.28036	31.24670	38.30253	35.27875	30.23901	28.22316	23.18338	30.23928	40.31916	34.27139	23.18366	34.27159	26.20777	32.25581	42.33587	39.31200	31.24809	24.19214	21.16819	32.25638	28.22442	35.28063	24.19250	20.16048	34.27291	26.20878	29.23295	31.24911	41.32959	24.19300	22.17698","BF-B	55.13022	-8.28048	21.16900	30.24152	37.29799	24.19336	22.17731	20.16125	43.34682	33.26626	40.32286	18.14534	28.22617	20.16161	39.31526	24.19408	33.26695	34.27514	20.16191	22.17817	40.32406	31.25124	31.25133	22.17843	34.27585	37.30030	22.17863	34.27616	33.26813	45.36577	19.15449	30.24403","BF-C	55.13085	-8.28102	21.17088	34.27677	28.22801	26.21180	24.19558	20.16304	36.29359	33.26922	44.35909	30.24492	20.16334	35.28595	31.25336	26.21258	33.26991	25.20455	30.24555	40.32752	31.25392	40.32776	41.33607	33.27060	32.26249	24.19694	35.28731	24.19708	18.14787	34.27941	32.26307	20.16448"].join("\n");
	document.getElementById('before').value = "48";
	document.getElementById('after').value = "47.5";

	//set to gb
	document.getElementById('region').selectedIndex = 0;
	regionSelect(0);
}

/**
 * Verify form values before submitting for calculation
 */
function validateForm(){

	//verify that there is some data
	if (document.getElementById('tabdata').value == "") {
		alert("Please paste some data into the R Values box");
		return false;
	}

	//get the number of columns and rows in the R-values data
	var cols = document.getElementById('tabdata').value.split(/\r?\n/)[0].split('\t').length
	var rows = document.getElementById('tabdata').value.split(/\r?\n/).length

	//verify that there are at least 4 columns
	if(cols < 5) {
		alert(["You need at least 4 tab-separated columns in the R Values box\nAt the moment I can see",rows.toString(),"rows and",cols.toString(),"columns"].join(' '));
		return false;
	}

	//verify that it all columns but the first are numeric
	for(var i = 0; i < rows; i++){

		//extract the rows
		rowData = document.getElementById('tabdata').value.split(/\r?\n/);

		//loop through columns: skip the first row as this CAN be a string
		for(var j = 1; j < cols; j++){

			// extract the columns from the current row
			colData = rowData[i].split('\t');

			if(colData.length == cols){

				//verify numeric
				if(isNaN(colData[j])){
					alert(["R-values need to be numeric\nNon-numeric value found at row", i+1, "column", j+1].join(' '));
					return false;
				}
			} else {
				alert(["Warning: row", i, "has", colData.length, "columns, expected", cols].join(" "));
				return false;
			}
		}
	}

	//verify that there is some data
	if (document.getElementById('before').value == "") {
		alert("Please enter some data into the Pre-Calibration Value box");
		return false;
	}
	//verify that it is numeric
	if (isNaN(document.getElementById('before').value)) {
		alert("The Pre-Calibration Value must be numeric");
		return false;
	}
	//verify that there is some data
	if (document.getElementById('after').value == "") {
		alert("Please enter some data into the Post-Calibration Value box");
		return false;
	}
	//verify that it is numeric
	if (isNaN(document.getElementById('after').value)) {
		alert("The Post-Calibration Value must be numeric");
		return false;
	}
	//verify that there is some data
	if (document.getElementById('boulder_r').value == "") {
		alert("please enter some data into the Mean R Value (Boulder) box");
		return false;
	}
	//verify that it is numeric
	if (isNaN(document.getElementById('boulder_r').value)) {
		alert("The Mean R Value (Boulder) must be numeric");
		return false;
	};
	return true;
}


/**
 * Event handler for when the production rate select tool is changed
 */
function regionSelect(selectedIndex){

	// set to default production rate and update the chart
	if (selectedIndex == 0) {
		document.getElementById('prodrate').value = 0;
		document.getElementById("localchart").src="./images/british-curve.png";
		document.getElementById("cctext").innerHTML = '<small><p>This is the latest calibration curve for the British Isles and is based on 54 TCN dated surfaces from Scotland, NW England and Ireland.  These exposure ages are calculated using the time-dependent Lm scaling scheme<sup><a href="#3">3,4</a></sup>, the Rannoch Moor production rate<sup><a href="#5">5</a></sup> and assuming 0 mm ka<sup>-1</sup> erosion. For full details, see Tomkins et al. (2018a)<sup><a href="#2">2</a></sup>. It is anticipated that as new calibration curves are constructed in similar well-dated regions, they will be made available for use on this site.</p></small>';
		document.getElementById('boulder_v').selectedIndex = 0;
		setBoulder(0);
	} else if (selectedIndex == 1) {
		document.getElementById('prodrate').value = 0;
		document.getElementById("localchart").src="./images/pyrenees-curve.png";
		document.getElementById("cctext").innerHTML = '<small><p>This is the latest calibration curve for the Pyrenees and is based on 52 TCN dated surfaces from across the mountain range. These exposure ages are calculated using the time-dependent Lm scaling scheme<sup><a href="#3">3,4</a></sup>, the primary calibration dataset of Borchers et al. (2016)<sup><a href="#9">9</a></sup> and assuming 0 mm ka<sup>-1</sup> erosion. For full details, see Tomkins et al. (2018b)<sup><a href="#18">18</a></sup>. It is anticipated that as new calibration curves are constructed in similar well-dated regions, they will be made available for use on this site.</p></small>'
		document.getElementById('boulder_v').selectedIndex = 1;
		setBoulder(1);
	}
}

/**
 * Populate the boulder box with a certain value
 */
function setRValue(r, u){
	document.getElementById('boulder_r').value = r.toString();
	document.getElementById('ref_boulder_r').value = r.toString();
	document.getElementById('boulder_u').value = u.toString();
}

/**
 * Update boulder R values to default on change of boulder
 */
function setBoulder(selectedIndex){

	//set the R Value for the default for the selected boulder
	var rVals = [48.08, 52.60, 44.14, 48.67];
	var uncertainties = [0.82, 0.74, 0.60, 0.65];
	setRValue(rVals[selectedIndex], uncertainties[selectedIndex]);

	//set the image for the selected boulder
	var imgs = ["manchester.png", "maladeta.png", "bassies.png", "carlit.png"];
	document.getElementById("boulderimg").src = "/static/shedcalc/images/" + imgs[selectedIndex];
}

/**
 * Calculates the result...
 */
function calc() {

	// extract data from the web page
	const region = parseInt(document.getElementById('region').value); 			// region
	const prodrate = parseInt(document.getElementById('prodrate').value); 		// production rate
	const before = parseFloat(document.getElementById('before').value); 		// R before sampling
	const after = parseFloat(document.getElementById('after').value); 			// R after sampling
	const boulderR = parseFloat(document.getElementById('boulder_r').value); 	// mean R for boulder
	const boulderU = parseFloat(document.getElementById('boulder_u').value); 	// R uncertainty for boulder
	const boulderV = parseFloat(document.getElementById('boulder_v').value); 	// calibration R for boulder

	// Import the posted table of data and parse into lists
	let { names, lats, lngs, rValues: data } = parseInputTable(document.getElementById('tabdata').value);

	// If the difference between value and reference is > uncertainty then perform instrument calibration and age calibration
	if (Math.abs(boulderV - boulderR) > boulderU) {
		data = getCalibratedValues(applyDriftFactorToCells(getDriftFactor(before, after, data), data), boulderV, boulderR);
	}
	// If the difference is < uncertainty, just perform instrument calibration
	else {
		data = applyDriftFactorToCells(getDriftFactor(before, after, data), data);
	}

	// Calculate the mean and MAD for each row
	const means = data.map(getRowMean);
	const mads = data.map(getRowMAD);

	// Calculate the ages and errors based upon selected region
	const regions = ['britain', 'pyrenees'];
	const prodrates = ['balco_age', 'cronus_age', 'lochlomond_age', 'rannoch_age', 'glenroy_age'];
	const { yPredictions: ages, yPi: error } = getAges(coefficients[regions[region]][prodrates[prodrate]], means);

	// Number of decimal places for results display
	const sf = 2;

	// Prepare table for the web template
	const outputs = names.map((name, i) => ({
		name,
		lat: lats[i],
		lng: lngs[i],
		mean: parseFloat(means[i].toFixed(sf)),
		mad: parseFloat(mads[i].toFixed(sf)),
		age: parseFloat(ages[i].toFixed(sf)),
		errors: parseFloat(error[i].toFixed(sf))
	}));

	// convert to JSON and return
	return JSON.stringify(outputs);
}

/**
 * This is the listener for the calulate button
 */
function runAnalysis(){
	
	// first, only submit if form passes validation
	if (validateForm()){
		
		// run calculation and load data into session cookie
		document.cookie = "data=" + calc();

		// move to results page
		location.href='results.html';
	}
}