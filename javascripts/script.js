// English reading
function numberToWordsEn(n) {
  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million", "Billion"];

  if (n === 0) return "Zero";

  function helper(num) {
    if (num === 0) return "";
    else if (num < 20) return belowTwenty[num] + " ";
    else if (num < 100)
      return tens[Math.floor(num / 10)] + " " + helper(num % 10);
    else
      return (
        belowTwenty[Math.floor(num / 100)] +
        " Hundred " +
        helper(num % 100)
      );
  }

  let word = "";
  let i = 0;
  while (n > 0) {
    if (n % 1000 !== 0) {
      word = helper(n % 1000) + thousands[i] + " " + word;
    }
    n = Math.floor(n / 1000);
    i++;
  }

  return word.trim();
}

// Khmer reading
const khmerDigits = [
  "សូន្យ",
  "មួយ",
  "ពីរ",
  "បី",
  "បួន",
  "ប្រាំ",
  "ប្រាំមួយ",
  "ប្រាំពីរ",
  "ប្រាំបី",
  "ប្រាំបួន",
];
const khmerTens = [
  "",
  "ដប់",
  "ម្ភៃ",
  "សាមសិប",
  "សែសិប",
  "ហាសិប",
  "ហុកសិប",
  "ចិតសិប",
  "ប៉ែតសិប",
  "កៅសិប",
];
const khmerScales = ["", "ពាន់", "លាន", "ប៊ីលាន"];

function numberToKhmerWords(num) {
  if (num === 0) return khmerDigits[0];

  let result = "";
  let scaleIndex = 0;

  while (num > 0) {
    const part = num % 1000;
    if (part > 0) {
      const partWord = convertUnderThousandKhmer(part);
      result =
        partWord +
        (khmerScales[scaleIndex] ? " " + khmerScales[scaleIndex] : "") +
        " " +
        result;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return result.trim();
}

function convertUnderThousandKhmer(n) {
  let result = "";
  const hundred = Math.floor(n / 100);
  const tenUnit = n % 100;
  const ten = Math.floor(tenUnit / 10);
  const unit = tenUnit % 10;

  if (hundred > 0) {
    result += khmerDigits[hundred] + " រយ ";
  }

  if (ten > 0) {
    result += (ten === 1 ? "ដប់" : khmerTens[ten]) + " ";
  }

  if (unit > 0) {
    result += khmerDigits[unit];
  }

  return result.trim();
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function convertNumber() {
  const input = document.getElementById("number").value;
  let riel = parseFloat(input);

  // Validate maximum input number (999,999,999)
  if (riel > 999999999) {
    riel = 999999999;
    document.getElementById("number").value = riel;
  }

  if (isNaN(riel) || riel <= 0) {
    document.getElementById("usdValue").textContent = "";
    document.getElementById("englishResult").textContent = "";
    document.getElementById("khmerResult").textContent = "";
    return;
  }

  // Get exchange rate base on input
  var exchangeRate = document.getElementById("custom_exchange_rate").value;
  if (!exchangeRate) {
    exchangeRate = 4000;
  }

  const usd = riel / exchangeRate;

  document.getElementById("usdValue").textContent =
    "USD: " + formatCurrency(usd.toFixed(2));
  document.getElementById("englishResult").textContent =
    "English: " +
    capitalizeFirstLetter(numberToWordsEn(Math.floor(riel)));
  document.getElementById("khmerResult").textContent =
    "Khmer: " + numberToKhmerWords(Math.floor(riel));
}

function convertAmountAsCustomExchangeRate() {
  convertNumber();
}

// Capitalize first letter of English word
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
