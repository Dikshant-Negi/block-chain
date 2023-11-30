const contractabi = 
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "getcustomer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "phone_no",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "room_no",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "clear",
						"type": "bool"
					}
				],
				"internalType": "struct hotel.customer",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_phone_no",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_room_no",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_clear",
				"type": "bool"
			}
		],
		"name": "insert_customers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int128",
				"name": "_phone_no",
				"type": "int128"
			},
			{
				"internalType": "int128",
				"name": "_salary",
				"type": "int128"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_house_address",
				"type": "string"
			}
		],
		"name": "insert_employee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "serve",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "insert_servicess",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_service",
				"type": "string"
			}
		],
		"name": "serviced",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	} 
];
const contractaddress = "0xcb7f9c464030eca914815c60194e6f5bafcc2724";



async function connectwallet() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        // myadd = await signer.getAddress();
        // console.log('Connected to wallet. Address:', myadd);
        // console.error('Error connecting to wallet:', error.message);
}

async function addcustomer() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    myadd = await signer.getAddress();
    console.log(myadd);

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const room = document.getElementById('room').value;
    const amount = document.getElementById('amount').value;
    const clear = document.getElementById('clear').value;

    const hotelcontract = new ethers.Contract(contractaddress, contractabi, signer);
    
    // Assuming the 'insert_customers' function takes parameters in this order
    const custome = await hotelcontract.insert_customers(name, phone,room, amount, clear);
    await custome.wait();
}

function insertinformationtable(name,phone_no,room_no,amount,clear) {
  const tableEL = document.getElementById('info');
 //   const healding1 = document.createElement('h1');
//   healding1.innerText = "Personal Information";
//   const head = document.getElementById('personal-information');
//   head.appendChild(healding1);
console.log(name+phone_no);
  info.innerHTML = 
      "<h2>Customer Details</h2>" +
        "<form>" +
        "<label for='displayFirstName'>First Name:</label>" +
        "<input type='text' id='displayFirstName' name='displayFirstName' value='" + name + "' readonly><br>" +
        "<label for='displayLastName'>Phone_no:</label>" +
        "<input type='text' id='displayLastName' name='displayLastName' value='" + phone_no + "' readonly><br>" +
        "<label for='displayEmail'>Room no:</label>" +
        "<input type='text' id='displayEmail' name='displayEmail' value='" + room_no + "' readonly><br>" +
        "<label for='displayEmail'>Amount:</label>" +
        "<input type='text' id='displayEmail' name='displayEmail' value='" + amount + "' readonly><br>" +
        "<label for='displayEmail'>Clear:</label>" +
        "<input type='text' id='displayEmail' name='displayEmail' value='" + clear + "' readonly><br>" 
      "</form>"
 

}

async function get_customer()
{
	
	const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
	const hotelcontract = new ethers.Contract(contractaddress, contractabi, signer);
	const name=document.getElementById('getcustomer').value;
	const result=await hotelcontract.getcustomer(name);
	insertinformationtable(result.name,result.phone_no,result.room_no,result.amount,result.clear);
	//input name 

}


// async function getCustomerInfo() {

//     const customerName = prompt('Enter the customer name:');

//     if (customerName) {
//         try {
//             const customer = await contract.methods.getcustomer(customerName).call();

//             // Display the result on the screen
//             document.getElementById('address').innerText = customer.id;
//             document.getElementById('name').innerText = customer.name;
//             document.getElementById('phone').innerText = customer.phone_no;
//             document.getElementById('room').innerText = customer.room_no;
//             document.getElementById('amount').innerText = customer.amount;
//             document.getElementById('clear').innerText = customer.clear;

//             document.getElementById('result').style.display = 'block';
//         } catch (error) {
//             console.error('Error fetching customer info:', error);
//         }
//     }
// }