var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
portName = process.argv[2];

var myPort = new SerialPort(portName, {
    baudRate: 9600,
    parser: serialport.parsers.readline('\r\n')
}, false);

myPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    myPort.on('data', function(data) {
      console.log('data received: ' + data);
    });
    myPort.write("ls\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }
});