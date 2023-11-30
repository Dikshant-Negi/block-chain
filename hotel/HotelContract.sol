// SPDX-License-Identifier:MIT
pragma solidity ^0.8.8;

contract HotelContract
{
    struct customer
    {
        string name;
        int phone_no;
        int room_no;
        uint256 amount;
        bool clear;

    }

    struct staff
    {
        address id;
        int128 phone_no;
        int128 salary;
        string name;
        string house_address;
    }

    struct service_taken
    {
        string [] _served;
        bool taken;
    }

    address  public manager;
    mapping(string =>address) cust_address;
    mapping(address=>customer) cust; //total customers
    mapping(string=>uint)services; // total services provided
    mapping(address=>service_taken)service_cus; // services taken by customer
    mapping(address=>staff)employe; // hotel staff list
    int128 i;

    constructor ()
    {
        manager=msg.sender;
    }

    function insert_employee (int128 _phone_no,int128 _salary,string memory _name,string memory _house_address ) public 
    {
        employe[msg.sender]=staff(msg.sender,_phone_no,_salary,_name,_house_address);
    }

    function insert_servicess(string memory serve,uint amount) external {
        services[serve]=amount;
    }

    function serviced(string memory _service) public {
        service_cus[msg.sender] = service_taken({ _served: new string[](0), taken: true });
        service_cus[msg.sender]._served.push(_service);
    }

    function insert_customers ( string memory _name,  int _phone_no, int _room_no,  uint256 _amount,bool _clear) public
    {
        require(msg.sender!=manager,"cannot register");
        if(service_cus[msg.sender].taken==true)
        {
            uint additional_amount;
            uint len=service_cus[msg.sender]._served.length;
            for(uint itr=0;itr<len;itr++)
            {
                string memory temp=service_cus[msg.sender]._served[itr];
                uint ans=services[temp];
                additional_amount+=ans;
            }
            cust[msg.sender]=customer(_name,_phone_no,_room_no,_amount+additional_amount * 1 ether,_clear);
        }
        else 
        {
            cust[msg.sender]=customer( _name,_phone_no,_room_no,_amount * 1 ether,_clear);
        }
        cust_address[_name]=msg.sender;
    } 

    function getcustomer(string memory _name) public view returns(customer memory)
    {
        address _address=cust_address[_name];
        customer memory result=cust[_address];
        return result;
    }

}