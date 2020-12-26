const form = document.querySelector('form');

const getResults = async (from, to) => {
  const res = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${from.toUpperCase()}&symbols=${to.toUpperCase()}`
  );
  const data = await res.json();

  return data.rates;
};

const convert = async (from, to, amount) => {
  const rate = await getResults(from, to);

  return amount * rate[to.toUpperCase()];
};

const onSubmit = async (e) => {
  e.preventDefault();

  const from = form['currency-one'].value;
  const to = form['currency-two'].value;
  const amount = parseFloat(form['amount'].value);
  const result = form['result'];
  result.value = await convert(from, to, amount);
};

form.addEventListener('submit', onSubmit);
