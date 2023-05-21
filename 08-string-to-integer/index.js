/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let isPositive = true;
  let breakEarlyNonDigit = 0;
  const stringIntegers = [];

  for (let i = 0; i < s.length; i++) {
    if (breakEarlyNonDigit === 2) {
      defaultValue(stringIntegers);
      break;
    }

    if (/\s/.test(s[i])) {
      continue;
    }

    if (/-/.test(s[i])) {
      isPositive = false;
      breakEarlyNonDigit++;
      continue;
    } else if (/\+/.test(s[i])) {
      isPositive = true;
      breakEarlyNonDigit++;
      continue;
    }

    if (/[1-9]/.test(s[i])) {
      stringIntegers.push(s[i]);
      continue;
    }

    if (/\D/.test(s[i])) {
      defaultValue(stringIntegers);
      break;
    }
  }

  const stringValue = stringIntegers.join('');

  let parsedValue = parseInt(stringValue);

  if (Number.isNaN(parsedValue)) return 0;

  if (!isPositive) {
    parsedValue *= -1;
  }

  if (parsedValue > Math.pow(-2, 31) && parsedValue < Math.pow(2, 31) - 1) {
    return parsedValue;
  }

  if (isPositive) {
    return Math.pow(2, 31) - 1;
  }

  return Math.pow(-2, 31);
};

function defaultValue(stringIntegers) {
  if (!stringIntegers.length) {
    stringIntegers.push('0');
  }
}

const result = myAtoi('110');

console.log('result ', result);
