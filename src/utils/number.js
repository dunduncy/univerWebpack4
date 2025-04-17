export function formatChartNumber(num){
    if(num==0){
        return 0
    }else{
        return formatFixedLength(num)
    }
}
function formatFixedLength(number) {
    const largeSuffixes = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"];
    const smallSuffixes = ["m", "μ", "n", "p", "f", "a", "z", "y"];
    let absNum = Math.abs(number);
    let suffix = "";
    let fixedNum;
    
    let arr = (number+'').split('')
    if(arr.length<=5){
      return number
    }
    // Determine the suffix and the scaled number for large values
    if (absNum >= 1) {
      for (let i = 0; i < largeSuffixes.length; i++) {
        if (absNum < Math.pow(1000, i + 1)) {
          suffix = largeSuffixes[i];
          fixedNum = i > 0 ? number / Math.pow(1000, i) : number;
          break;
        }
      }
    }
    // Determine the suffix and the scaled number for small values
    else {
      for (let i = 0; i < smallSuffixes.length; i++) {
        if (absNum >= Math.pow(10, -3 * (i + 1))) {
          suffix = smallSuffixes[i];
          fixedNum = number * Math.pow(1000, i + 1);
          break;
        }
      }
    }

    // Format to ensure the length is 4 including the dot and suffix
    let precision = 3 - Math.floor(Math.log10(Math.abs(fixedNum) + 1));
    precision = fixedNum % 1 === 0 ? 0 : precision;
    fixedNum = fixedNum.toFixed(precision > 0 ? precision : 0);

    return `${fixedNum}${suffix}`;
  }