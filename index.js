
const SerialPort = require('serialport');
const ModbusMaster = require('modbus-rtu').ModbusMaster;
 
//create serail port with params. Refer to node-serialport for documentation


//const serialPort = new SerialPort("COM3",{autoOpen: false, baudRate:9600,dataBits: 8,stopBits: 1, parity: "none"},
//function(err){});

var ser_port = require('serialport');
 
// list serial ports:

ser_port.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});

   
//var serialport = require('serialport');// include the library
// get port name from the command line:

var portName = process.argv[2];

//Then you open the port using new() like so:

var myPort = new SerialPort("COM3", {baudRate:115200,stopBits: 2},function(err){console.log("------------------------");
console.log(err); 
console.log("------------------------")});

const master = new ModbusMaster(myPort);

console.log(master);

for(i = 0; i < 10; i++){
master.readHoldingRegisters(2, 0, 4).then((data) => {
  //promise will be fulfilled with parsed data
  console.log(data); 
  //output will be [10, 100, 110, 50] (numbers just for example)
}, (err) => {
  console.log("------------------------");
  console.log(err); 
  console.log("------------------------")
});
}

