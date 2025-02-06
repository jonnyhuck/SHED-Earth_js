
/**
 * read input data into arrays
 */
function parseInputTable(input) {

    const names = [], lats = [], lngs = [], rValues = [];
    
    input.split('\n').forEach(line => {
        let data = line.trim().split('\t');
        names.push(data.shift());
        lats.push(parseFloat(data.shift()));
        lngs.push(parseFloat(data.shift()));
        rValues.push(data.map(Number));
    });
    
    return { names, lats, lngs, rValues };
}

/**
 * count the number of cells in the input data
 */
function getNumberCells(textAreaData) {
    return textAreaData.reduce((sum, row) => sum + row.length, 0);
}

/**
 * return rValueDiff / number of data cells
 */
function getDriftFactor(before, after) {
    return (before / after) * 100 - 100;
}

/**
 * apply the correction (drift) factor to each cell
 */
function applyDriftFactorToCells(driftFactor, cells) {
    const nCells = getNumberCells(cells);
    const f = driftFactor / nCells;
    let i = 1;
    return cells.map(row => row.map(d => (d / 100) * (100 + (f * i++))));
}

/**
 * get the mean of each row (sample)
 */
function getRowMean(row) {
    return row.reduce((sum, val) => sum + val, 0) / row.length;
}

/**
 * Calculate the MAD of each row (sample)
 * 
 * - Find the sum of the data values, and divide the sum by the number of data values.
 * - Find the absolute value of the difference between each data value and the mean: |data value – mean|. 
 * - Divide  the sum of the absolute values of the differences by the number of data values.
 */
function getRowMAD(row) {
    const mean = getRowMean(row);
    const absDiff = row.map(v => Math.abs(v - mean));
    return absDiff.reduce((sum, val) => sum + val, 0) / row.length;
}

/**
 * r - their input r value
 * v - hardness value derived from the boulder - from database (c. 48 for ours, 15 for Mars)
 */
function getAgeCalibration(v, r) {
    return v / r;
}

/**
 * multiply means by age calibration
 */
function getCalibratedValues(data, v, r) {
    const ac = getAgeCalibration(v, r);
    return data.map(row => row.map(d => d * ac));
}

/**
 * Log function for fitting using ODR coefficients
 */
function logFunc(beta, x) {
    return beta[0] * Math.log10(x) + beta[1];
}

/**
 * Linear function for fitting using ODR coefficients
 */
function linearFunc(beta, x) {
    return beta[0] * x + beta[1];
}

/**
 * Calculate Preduction Intervals
 *
 *  dfdp    : derivatives of that function (calculated using sympy.diff)
 *  n       : the number of samples in the original curve
 *  xn	   : the number of preductions being undertaken here
 *  y_err   : the maximum residual on the y axis
 *  signif  : the significance value (68., 95. and 99.7 for 1, 2 and 3 sigma respectively)
 *  popt    : the ODR parameters for the fit, calculated using scipy.odr.run()
 *  pcov    : the covariance matrix for the fit, calculated using scipy.odr.run()
 *
 * based on p.147 of Mathematical, Numerical, and Statistical Methods in Extraterrestrial Physics
 */
function predictionInterval(dfdp, n, xn, yerr, signif, popt, pcov) {
    const np = popt.length;
    const alpha = 1 - (1 - signif / 100) / 2;
    const tval = jStat.studentt.inv(alpha, n - np);  // Using jStat for t-distribution
    
    let d = new Array(xn).fill(0);
    for (let j = 0; j < np; j++) {
        for (let k = 0; k < np; k++) {
            d = d.map((val, idx) => val + dfdp[j][idx] * dfdp[k][idx] * pcov[j][k]);
        }
    }
    
    return d.map(val => tval * Math.sqrt(yerr ** 2 + val));
}

/**
 * return the predicted ages and errors
 */
function getAges(coefficients, xData) {
    let f, d;
    
    if (coefficients.model === "linear") {
        f = linearFunc;
        d = [xData, new Array(xData.length).fill(1)];
    } else if (coefficients.model === "log") {
        f = logFunc;
        d = [xData.map(Math.log10), new Array(xData.length).fill(1)];
    }
    
    const yPredictions = xData.map(x => f(coefficients.beta, x));
    const yPi = predictionInterval(d, coefficients.samples, xData.length, coefficients.eps, 68, coefficients.beta, coefficients.cov);
    
    return { yPredictions, yPi };
}
