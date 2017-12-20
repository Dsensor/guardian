'use strict'
/**
* Bring Libp2p to life
*
* deals peer to peer network, tcp, udp, kbuckets etc.
* @class KAD
* @package    Dsensor opensource project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
*/
const util = require('util');
const fs = require('fs');
const events = require("events");
const getIP = require('external-ip')();
const listen = require('./ptop/listener.js')
const dialer = require('./ptop/dialer.js')

var lknPtoP = function(role) {
// bring to live listeners and Dialers
  if(role == 'listen')
  {
    this.listener = new listen();
console.log(this.listener);
    this.getpublicIP('listen');
  }
  else if(role = 'dialer')
  {
    this.dialer = new dialer();
console.log(this.dialer);
    this.getpublicIP('dialer');
  }


};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(lknPtoP, events.EventEmitter);

/**
*  get the Public IP address
* @method getpublicIP
*
*/
lknPtoP.prototype.getpublicIP = function(role) {

  var localthis = this;
  var ip = '';
  var setIP = getIP;
  setIP(function (err, ip) {
    if (err) {
        // every service in the list has failed
        throw err;
    }
console.log('extippp' + ip);
    localthis.ipPublic = ip;
    if(role == 'listen')
    {
      localthis.startDHT(ip);
    }
    else if(role == 'dialer')
    {
      localthis.startDailer(ip);
    }

  });

};

/**
*  Start up the DHT  (distributed hash table module)
* @method startDHT
*
*/
lknPtoP.prototype.startDHT = function(portIn) {

  var ipaddress =  this.ipPublic;
  // pass on to listener
    this.listener.startListening();

};

/**
*  Start up the Dailer
* @method startDailer
*
*/
lknPtoP.prototype.startDailer = function(portIn) {

  var ipaddress =  this.ipPublic;
  // pass on to listener
  this.dialer.startDialer();

};


module.exports = lknPtoP;
