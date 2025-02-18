//tỷ giá tiền tệ quy đổi
const exchangeRates = {
    USD: { VND: 23500, EUR: 0.92, JPY: 152, THB: 33.67 },
    VND: { USD: 1 / 23500, EUR: 0.000039, JPY: 0.006, THB: 0.0013 },
    EUR: { USD: 1 / 0.92, VND: 23500 / 0.92, JPY: 159, THB: 35.25 },
    JPY: { USD: 1 / 0.92, VND: 23500 / 0.92, EUR: 0.006, THB: 0.2217},
    THB: { USD: 0.02971, VND: 758 , EUR: 0.028, JPY: 4.51 },
};
function convertCurrency() {
  // Định nghĩa tỷ giá hardcode
  let amount = Number(document.getElementById('input-amount').value.replaceAll(/[^\d]/g, ''))
  let fromCurrency = document.getElementById('in-cars').value
  let toCurrency = document.getElementById('out-cars').value
  // Tạo thẻ img
  var img = document.getElementById("top-nation");
  let topUrl = Object.values(currencies).find(item=>item?.value == fromCurrency)?.nation
  // Thiết lập thuộc tính src cho thẻ img
  img.src = topUrl;

  var imgBottom = document.getElementById("bottom-nation");
  let bottomUrl = Object.values(currencies).find(item=>item?.value == toCurrency)?.nation
  // Thiết lập thuộc tính src cho thẻ img
  imgBottom.src = bottomUrl;
  
  if(fromCurrency == toCurrency){
    document.getElementById("output-amount").value = number_to_price(amount)
    return
  }
  // Kiểm tra nếu tỷ giá có sẵn
  if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      document.getElementById("output-amount").value = number_to_price(amount * rate)
  } else {
    document.getElementById("output-amount").value = 0
    document.getElementById("error-mess").innerHTML = "Tỷ giá không hợp lệ hoặc không có hỗ trợ cho loại tiền tệ này!"
  }
}
function number_to_price(v){

  if (v === 0) { return '0'; }

  if (!v || v === "") {
    return v
  }
  v = v.toString();

  v = v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

  v = v.split(',').join('*').split('.').join(',').split('*').join('.');
  return v;
}
function formatNumber(value) {
  // Loại bỏ tất cả ký tự không phải số
  value = value.replace(/[^\d]/g, '');
  // Thêm dấu phân cách hàng nghìn
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Gán sự kiện input để xử lý khi người dùng nhập số
document.getElementById("input-amount").addEventListener("input", function() {
  // Lấy giá trị hiện tại và format lại với dấu phân cách
  this.value = formatNumber(this.value);
});
// Danh sách các loại tiền tệ
const currencies = {
  USD: { 
      value: "USD",
      icon: '$',
      nation:'https://eurotravel.com.vn/wp-content/uploads/2023/05/quoc-ky-dau-tien-cua-nuoc-my-voi-13-sao-dai-dien-cho-13-bang-ngay-so-khai.png'
  },
  VND: { 
      value: "VND",
      icon: 'Đ',
      nation:'https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png'
  },
  EUR: { 
      value: "EUR",
      icon: '€',
      nation:'https://cdn.pixabay.com/photo/2013/07/13/01/09/european-union-155207_960_720.png'
  },
  JPY: { 
      value: "JPY",
      icon: '¥',
      nation:'https://gojapan.vn/wp-content/uploads/2021/07/co-nhat-4795-1497173124.png'
  },
  THB: { 
    value: "THB",
    icon: '฿',
    nation:'https://cotcoinox.net/contents_tinta/images/la-co-thai-lan-gia-re-tai-hcm.png'
  }
};

// Lấy phần tử để hiển thị danh sách tiền tệ
const currencyList = document.getElementById("in-cars");

// Lặp qua từng đồng tiền trong mapping và tạo thẻ option
Object.keys(currencies).forEach(currency => {
    const currencyDiv = document.createElement("option");
    currencyDiv.classList.add("currency");
    const currencyInfo = currencies[currency];
    currencyDiv.value = currencyInfo.value
    currencyDiv.innerHTML = `
    <strong>${currencyInfo.value}</strong>
    ${currencyInfo.icon ? currencyInfo.icon : ''}
    `;
    currencyList.appendChild(currencyDiv);
  });
  currencyList.value='VND'

// Lấy phần tử để hiển thị danh sách tiền tệ
const currencyListOut = document.getElementById("out-cars");

// Lặp qua từng đồng tiền trong mapping và tạo thẻ option
Object.keys(currencies).forEach(currency => {
    const currencyDiv = document.createElement("option");
    currencyDiv.classList.add("currency");
    const currencyInfo = currencies[currency];
    currencyDiv.value = currencyInfo.value
    currencyDiv.innerHTML = `
    <strong>${currencyInfo.value}</strong>
    ${currencyInfo.icon ? currencyInfo.icon : ''}
    `;

    currencyListOut.appendChild(currencyDiv);
});