// Making Default funtions
let btn = document.getElementById('hide-button');
let btn2 = document.getElementById('hide-button2');
let loan = document.getElementById('loan').innerHTML;
let totalloan = parseFloat(loan);
if(totalloan <= 0){
    btn.hidden = true;
    btn2.hidden = true
}else{
    btn.hidden = false
}



//  Get Loan function
function getloan(){
    let blnc = document.getElementById('blnc').innerHTML;
    let totalloan = document.getElementById('loan').innerHTML;
    let tloan = parseFloat(totalloan);
    let balance = parseFloat(blnc);
    if( tloan <= 0){
        let getloan = prompt("How much do you want?");
        let loan = parseFloat(getloan);
        if( loan < balance || loan <= balance*2){
            let oldbalance = document.getElementById('blnc');
            let oldloan = document.getElementById('loan');
            let oldloan2 = document.getElementById('loan2');
            totalblnc = loan+balance;
            totalloan = loan;
            oldbalance.innerHTML = totalblnc;
            oldloan.innerHTML = totalloan;
            oldloan2.innerHTML = totalloan;
            btn.hidden = false;
            btn2.hidden = false;
            
        }else{
            alert("You have choosen wrong amount you can take maximum up to $" + balance*2)
        }
    }else{
        alert('You already have avail the loan. Pay the previous loan first in order to get new loan');
    }
    
}
// Pay Loan from Bank
function payloan(){
    let totalloan = document.getElementById('loan').innerHTML;
    let blnc = document.getElementById('blnc').innerHTML;
    let tloan = parseFloat(totalloan);
    let balance = parseFloat(blnc);
    if(tloan > balance){
        alert('Insufficent Balance!')
    }else{
        let newblnc = balance - tloan;
        let blnc = document.getElementById('blnc');
        let totalloan = document.getElementById('loan');
        let totalloan2 = document.getElementById('loan2');
        blnc.innerHTML = newblnc;
        totalloan.innerHTML = 0;
        totalloan2.innerHTML = 0;
        btn.hidden = true;
        btn2.hidden = true;
    }
}

// Get more work function deposit $100 on each click
function work(){
    let ramount = document.getElementById('ramount');
    let totalamount = parseFloat(ramount.innerHTML);
    ramount.innerHTML = totalamount+100;
}

// transfer form work account to bank account
function transfer(){
    let ramount = document.getElementById('ramount');
    let totalamount = parseFloat(ramount.innerHTML);
    let totalloan = document.getElementById('loan').innerHTML;
    let blnc = document.getElementById('blnc').innerHTML;
    let tloan = parseFloat(totalloan);
    let balance = parseFloat(blnc);
    if(tloan <= 0 ){
        let blnc = document.getElementById('blnc');
        blnc.innerHTML = totalamount + balance;
        ramount.innerHTML = 0;
    }else{
        let pay = (totalamount*10) / 100;
        if(pay < tloan){
            let conf = confirm("You have outstanding loan amount. In case of bank of transfer your $"+ pay + " will be detucted. Do you want to proceed?")
            if(conf == true){
              let newloan = tloan - pay;
              let totalloan = document.getElementById('loan');
              let totalloan2 = document.getElementById('loan2');
              let blnc = document.getElementById('blnc');
              totalloan.innerHTML = newloan;
              totalloan2.innerHTML = newloan;
              blnc.innerHTML = totalamount + balance - pay;
              ramount.innerHTML = 0;
            }else{
                alert('Please pay your outstanding loan soon!')
            }
        }else{
            let conf = confirm("You have outstanding loan amount. In case of bank of transfer your $"+ tloan + " will be detucted. Do you want to proceed?")
            if(conf == true){
              let totalloan = document.getElementById('loan');
              let totalloan2 = document.getElementById('loan2');
              let blnc = document.getElementById('blnc');
              totalloan.innerHTML = 0;
              totalloan2.innerHTML = 0;
              blnc.innerHTML = totalamount + balance - tloan;
              ramount.innerHTML = 0;
            }
        }
        
    }
}


// Pay Loan from Salary

function payloanfromwork(){
    let blnc = document.getElementById('blnc').innerHTML;
    let totalloan = document.getElementById('loan2').innerHTML;
    let ramount = document.getElementById('ramount').innerHTML;
    let tloan = parseFloat(totalloan);
    let totalamount = parseFloat(ramount);
    let balance = parseFloat(blnc);
    if(tloan > totalamount){
        alert('Insufficent Balance!')
    }else{
        let newblnc = totalamount - tloan;
        let blnc = document.getElementById('blnc');
        let totalloan = document.getElementById('loan');
        let totalloan2 = document.getElementById('loan2');
        let ramount = document.getElementById('ramount')
        ramount.innerHTML = 0;        totalloan.innerHTML = 0;
        totalloan2.innerHTML = 0;
        blnc.innerHTML = newblnc + balance;
        btn.hidden = true;
        btn2.hidden = true
    }
}


// Computer Store Data Starts from Here
let lapi_title = document.getElementById('lapi-title');
let des = document.getElementById('lapi-des');
let price = document.getElementById('lapi-price');
const select = document.getElementById('select');
const display = document.getElementById('display');
const apiEndPoint = 'https://hickory-quilled-actress.glitch.me/computers';
let bigData;

function fetchJsonData() {
  return new Promise((resolve, reject) => {
    fetch(apiEndPoint)
      .then(response => response.json())
      .then(data => {
        resolve(data); // Resolve the promise with the fetched JSON data
      })
      .catch(error => {
        reject(error); // Reject the promise with the error
      });
  });
}

fetchJsonData()
  .then(jsonData => {
    bigData = jsonData;

    // Populate dropdown options
    bigData.forEach(item => {
      let option = document.createElement('option');
      option.setAttribute('value', item['title']);
      option.textContent = item['title'];
      select.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

select.addEventListener('change', () => {
  const selectedValue = select.value;
  
  // Filter the data based on the selected option value
  const filteredData = bigData.filter(item => {
    return item.title.toLowerCase() === selectedValue.toLowerCase();
  });

  if (filteredData.length > 0) {
    const selectedProduct = filteredData[0];
    lapi_title.innerHTML = selectedProduct['title'];
    des.innerHTML = selectedProduct['description']
    price.innerHTML = selectedProduct['price']
    display.innerHTML = `
      <h4><b>${selectedProduct['title']}</b></h4>
      <br>
       <b>Features</b>
      <p>${selectedProduct['specs']}</p>
      
    `;
  } else {
    display.innerHTML = '';
  }
});


// Buy Funtion start from Here
function buy(){
    let blnc = document.getElementById('blnc').innerHTML;
    let price = document.getElementById('lapi-price').innerHTML;
    let balance = parseFloat(blnc);
    let p = parseFloat(price);
    console.log(p)
    if(balance < p){
        alert('Low Balance!')
    }else{
       let newblnc = balance - p;
       let blnc = document.getElementById('blnc');
       blnc.innerHTML = newblnc;
       alert('Purchase Successfull')
    }
}