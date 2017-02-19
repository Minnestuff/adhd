<script type="text/javascript">
    // Set API key here!
    var apiKey = 'b52eb0cf5ff01b160f17b789e332a599';

    // sample names for customer and account nickname
    var customerFirstName = "Missy";
    var customerLastName = "Elliot";

    $(function() {
      // set the modules being used
      require(['customer'], function (customer) {

        // initialize customer and account
        var cust = customer.initWithKey(apiKey);

        // make the API Calls
        //postCustomer(apiKey, cust);
        //getCustomer(apiKey, cust);
      });
    });

    function postCustomer (key, cust) {
      // build customer data
      var newCustDetails ="{ \"first_name\": \"" + customerFirstName + "\", \"last_name\": \"" + customerLastName + "\", \"address\": { \"street_number\": \"1\", \"street_name\": \"Capital One Dr.\", \"city\": \"McLean\", \"state\": \"VA\", \"zip\": \"22102\" } }";

      // make the API call, returns response code
      var responseCode = cust.createCustomer(newCustDetails);

      // console logging and update web page
      console.log("[Customer - Create Customer] Response Code: " + responseCode);
      $('#postCustomer').html("Create Customer: Response Code <b>" + responseCode + "</b>")
    }

    function getCustomer (key, cust) {
      var allCustomers = cust.getCustomers();
      var myCustomer = null;

      // loop through all customers and log their info
      console.log("[Customer - Get All Customers]");
      for (var i = 0; i < allCustomers.length; i++) {
        var firstName = allCustomers[i].first_name;
        var lastName = allCustomers[i].last_name;
        console.log("Customer[" + i + "]: " + firstName + " " + lastName);

        // take note of the customer we created
        if(firstName == customerFirstName && lastName == customerLastName) {
          myCustomer = allCustomers[i];
        }
      }

      // display the customer we created
      var fullName = myCustomer.first_name + " " + myCustomer.last_name
      console.log("[Customer - My Customer] " + fullName);
      $('#getCustomer').html("Results: <b>" + allCustomers.length + "</b>" + " customers retrieved, please see developer console for full list.<br/>");
      $('#getCustomer').append("My Customer: <b>" + fullName + "</b>");
    }
  </script>