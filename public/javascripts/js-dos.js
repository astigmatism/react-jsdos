!function i(r,a,l){function u(t,e){if(!a[t]){if(!r[t]){var o="function"==typeof require&&require;if(!e&&o)return o(t,!0);if(c)return c(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var s=a[t]={exports:{}};r[t][0].call(s.exports,function(e){return u(r[t][1][e]||e)},s,s.exports,i,r,a,l)}return a[t].exports}for(var c="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.Build={version:"6.22.36 (ae0ccc95b30d8b671c0fd81d1997a695)",jsVersion:"e458350f35a2c3a331959275d81894133a4cdcf5",jsSize:199660,wasmVersion:"eb83536935802be3c617c911dfce7e28",wasmSize:1809140}},{}],2:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function e(e,t,o){var n=this;if(this.storeName="files",this.db=null,this.version=e,this.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,this.indexedDB){var s=this.indexedDB.open("js-dos-cache ("+e+")",1);s.onerror=function(e){o("Can't open cache database")},s.onsuccess=function(e){n.db=s.result,t(n)},s.onupgradeneeded=function(e){try{n.db=s.result,n.db.onerror=function(e){o("Can't upgrade cache database")},n.db.createObjectStore(n.storeName)}catch(e){o("Can't upgrade cache database")}}}else o("Indexed db is not supported on this host")}return e.prototype.put=function(e,t,o){if(null!==this.db){var n=this.db.transaction(this.storeName,"readwrite");n.oncomplete=function(){return o()},n.objectStore(this.storeName).put(t,e)}else o()},e.prototype.get=function(e,t,o){if(null!==this.db){var n=this.db.transaction(this.storeName,"readonly").objectStore(this.storeName).get(e);n.onerror=function(){return o("Can't read value for key '"+e+"'")},n.onsuccess=function(){n.result?t(n.result):o("Result is empty for key '"+e+"', result: "+n.result)}}else o("db is not initalized")},e.prototype.forEach=function(o,n){if(null!==this.db){var e=this.db.transaction(this.storeName,"readonly").objectStore(this.storeName).openCursor();e.onerror=function(){return n()},e.onsuccess=function(e){var t=e.target.result;t?(o(t.key.toString(),t.value),t.continue()):n()}}else n()},e}();o.default=n},{}],3:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function e(){}return e.prototype.put=function(e,t,o){},e.prototype.get=function(e,t,o){o("Cache is not supported on this host")},e.prototype.forEach=function(e,t){t()},e}();o.default=n},{}],4:[function(e,t,o){"use strict";var n=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0});var s=n(e("./js-dos-cache-db")),i=n(e("./js-dos-cache-noop"));o.default=function(t,o){new s.default(t.version,o,function(e){void 0!==t.log&&t.log("ERR! Can't initalize cache, cause: "+e),o(new i.default)})}},{"./js-dos-cache-db":2,"./js-dos-cache-noop":3}],5:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function e(e,t){var n=this;this.shellInputQueue=[],this.shellInputClients=[],this.dos=e,this.em=e,this.api=e,this.api.ping=function(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];n.onping(e,t)},this.onready=t}return e.prototype.width=function(){return this.dos.canvas.width},e.prototype.height=function(){return this.dos.canvas.height},e.prototype.shell=function(){for(var i=this,r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];if(0!==r.length)return new Promise(function(e,t){i.shellInputClients.push(e);for(var o=0,n=r;o<n.length;o++){var s=n[o];i.shellInputQueue.push(s)}i.requestShellInput()})},e.prototype.screenshot=function(){var e=this;return new Promise(function(t){e.api.send("screenshot","",function(e){t(e)})})},e.prototype.exit=function(){try{this.dos.terminate(),this.api.send("exit")}catch(e){return 0}return this.dos.error("Runtime is still alive!"),-1},e.prototype.simulateKeyEvent=function(e,t){var o=t?"keydown":"keyup",n=document.createEvent("KeyboardEvent"),s={get:function(){return this.keyCodeVal}};Object.defineProperty(n,"keyCode",s),Object.defineProperty(n,"which",s),Object.defineProperty(n,"charCode",s),n.initKeyboardEvent?n.initKeyboardEvent(o,!0,!0,document.defaultView,!1,!1,!1,!1,e,e):n.initKeyEvent(o,!0,!0,document.defaultView,!1,!1,!1,!1,e,0),n.keyCodeVal=e,this.dos.canvas&&this.dos.canvas.dispatchEvent(n)},e.prototype.simulateKeyPress=function(e){var t=this;this.simulateKeyEvent(e,!0),setTimeout(function(){return t.simulateKeyEvent(e,!1)},100)},e.prototype.sendKeyPress=function(e){this.api.send("sdl_key_event",e+"")},e.prototype.requestShellInput=function(){this.sendKeyPress(13)},e.prototype.onping=function(e,t){switch(e){case"ready":this.onready(this);break;case"frame":this.onframe();break;case"shell_input":if(0===this.shellInputQueue.length)return;var o=t[0],n=t[1],s=this.shellInputQueue.shift(),i=this.em.lengthBytesUTF8(s)+1;if(n<i)return void(void 0!==this.dos.onerror&&this.dos.onerror("Can't execute cmd '"+s+"', because it's bigger then max cmd length "+n));if(this.em.stringToUTF8(s,o,i),0===this.shellInputQueue.length){for(var r=0,a=this.shellInputClients;r<a.length;r++){(0,a[r])()}this.shellInputClients=[]}else this.requestShellInput()}},e.prototype.onframe=function(){this.dos.tick()},e}();o.DosCommandInterface=n},{}],6:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var s=e("./js-dos-options");o.default=function(o){var n=i;return Object.keys(s.DosBoxConfigDefaults).forEach(function(e){return t=e,void(n=n.replace("%"+t+"%",(o[t]||s.DosBoxConfigDefaults[t])+""));var t}),n};var i="\n# This is the configurationfile for DOSBox 0.74. (Please use the latest version of DOSBox)\n# Lines starting with a # are commentlines and are ignored by DOSBox.\n# They are used to (briefly) document the effect of each option.\n\n[sdl]\n#       fullscreen: Start dosbox directly in fullscreen. (Press ALT-Enter to go back)\n#       fulldouble: Use double buffering in fullscreen. It can reduce screen flickering, but it can also result in a slow DOSBox.\n#   fullresolution: What resolution to use for fullscreen: original or fixed size (e.g. 1024x768).\n#                     Using your monitor's native resolution with aspect=true might give the best results.\n#                     If you end up with small window on a large screen, try an output different from surface.\n# windowresolution: Scale the window to this size IF the output device supports hardware scaling.\n#                     (output=surface does not!)\n#           output: What video system to use for output.\n#                   Possible values: surface, overlay, opengl, openglnb.\n#         autolock: Mouse will automatically lock, if you click on the screen. (Press CTRL-F10 to unlock)\n#      sensitivity: Mouse sensitivity.\n#      waitonerror: Wait before closing the console if dosbox has an error.\n#         priority: Priority levels for dosbox. Second entry behind the comma is for when dosbox is not focused/minimized.\n#                     pause is only valid for the second entry.\n#                   Possible values: lowest, lower, normal, higher, highest, pause.\n#       mapperfile: File used to load/save the key/event mappings from. Resetmapper only works with the defaul value.\n#     usescancodes: Avoid usage of symkeys, might not work on all operating systems.\n\nfullscreen=false\nfulldouble=false\nfullresolution=original\nwindowresolution=original\noutput=surface\nautolock=%autolock%\nsensitivity=100\nwaitonerror=true\npriority=higher,normal\nmapperfile=mapper-jsdos.map\nusescancodes=true\nvsync=false\n\n[dosbox]\n# language: Select another language file.\n#  machine: The type of machine tries to emulate.\n#           Possible values: hercules, cga, tandy, pcjr, ega, vgaonly, svga_s3, svga_et3000, svga_et4000, svga_paradise, vesa_nolfb, vesa_oldvbe.\n# captures: Directory where things like wave, midi, screenshot get captured.\n#  memsize: Amount of memory DOSBox has in megabytes.\n#             This value is best left at its default to avoid problems with some games,\n#             though few games might require a higher value.\n#             There is generally no speed advantage when raising this value.\n\nlanguage=\nmachine=svga_s3\ncaptures=capture\nmemsize=16\n\n[render]\n# frameskip: How many frames DOSBox skips before drawing one.\n#    aspect: Do aspect correction, if your output method doesn't support scaling this can slow things down!.\n#    scaler: Scaler used to enlarge/enhance low resolution modes.\n#              If 'forced' is appended, then the scaler will be used even if the result might not be desired.\n#            Possible values: none, normal2x, normal3x, advmame2x, advmame3x, advinterp2x, advinterp3x, hq2x, hq3x, 2xsai, super2xsai, supereagle, tv2x, tv3x, rgb2x, rgb3x, scan2x, scan3x.\n\nframeskip=0\naspect=false\nscaler=none\n\n[cpu]\n#      core: CPU Core used in emulation. auto will switch to dynamic if available and appropriate.\n#            Possible values: auto, dynamic, normal, simple.\n#   cputype: CPU Type used in emulation. auto is the fastest choice.\n#            Possible values: auto, 386, 386_slow, 486_slow, pentium_slow, 386_prefetch.\n#    cycles: Amount of instructions DOSBox tries to emulate each millisecond.\n#            Setting this value too high results in sound dropouts and lags.\n#            Cycles can be set in 3 ways:\n#              'auto'          tries to guess what a game needs.\n#                              It usually works, but can fail for certain games.\n#              'fixed #number' will set a fixed amount of cycles. This is what you usually need if 'auto' fails.\n#                              (Example: fixed 4000).\n#              'max'           will allocate as much cycles as your computer is able to handle.\n#\n#            Possible values: auto, fixed, max.\n#   cycleup: Amount of cycles to decrease/increase with keycombo.(CTRL-F11/CTRL-F12)\n# cycledown: Setting it lower than 100 will be a percentage.\n\ncore=auto\ncputype=auto\ncycles=%cycles%\ncycleup=10\ncycledown=20\n\n[mixer]\n#   nosound: Enable silent mode, sound is still emulated though.\n#      rate: Mixer sample rate, setting any device's rate higher than this will probably lower their sound quality.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n# blocksize: Mixer block size, larger blocks might help sound stuttering but sound will also be more lagged.\n#            Possible values: 1024, 2048, 4096, 8192, 512, 256.\n# prebuffer: How many milliseconds of data to keep on top of the blocksize.\n\nnosound=false\nrate=44100\nblocksize=1024\nprebuffer=20\n\n[midi]\n#     mpu401: Type of MPU-401 to emulate.\n#             Possible values: intelligent, uart, none.\n# mididevice: Device that will receive the MIDI data from MPU-401.\n#             Possible values: default, win32, alsa, oss, coreaudio, coremidi, none.\n# midiconfig: Special configuration options for the device driver. This is usually the id of the device you want to use.\n#               See the README/Manual for more details.\n\nmpu401=intelligent\nmididevice=default\nmidiconfig=\n\n[sblaster]\n#  sbtype: Type of Soundblaster to emulate. gb is Gameblaster.\n#          Possible values: sb1, sb2, sbpro1, sbpro2, sb16, gb, none.\n#  sbbase: The IO address of the soundblaster.\n#          Possible values: 220, 240, 260, 280, 2a0, 2c0, 2e0, 300.\n#     irq: The IRQ number of the soundblaster.\n#          Possible values: 7, 5, 3, 9, 10, 11, 12.\n#     dma: The DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n#    hdma: The High DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n# sbmixer: Allow the soundblaster mixer to modify the DOSBox mixer.\n# oplmode: Type of OPL emulation. On 'auto' the mode is determined by sblaster type. All OPL modes are Adlib-compatible, except for 'cms'.\n#          Possible values: auto, cms, opl2, dualopl2, opl3, none.\n#  oplemu: Provider for the OPL emulation. compat might provide better quality (see oplrate as well).\n#          Possible values: default, compat, fast.\n# oplrate: Sample rate of OPL music emulation. Use 49716 for highest quality (set the mixer rate accordingly).\n#          Possible values: 44100, 49716, 48000, 32000, 22050, 16000, 11025, 8000.\n\nsbtype=sb16\nsbbase=220\nirq=7\ndma=1\nhdma=5\nsbmixer=true\noplmode=auto\noplemu=default\noplrate=44100\n\n[gus]\n#      gus: Enable the Gravis Ultrasound emulation.\n#  gusrate: Sample rate of Ultrasound emulation.\n#           Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#  gusbase: The IO base address of the Gravis Ultrasound.\n#           Possible values: 240, 220, 260, 280, 2a0, 2c0, 2e0, 300.\n#   gusirq: The IRQ number of the Gravis Ultrasound.\n#           Possible values: 5, 3, 7, 9, 10, 11, 12.\n#   gusdma: The DMA channel of the Gravis Ultrasound.\n#           Possible values: 3, 0, 1, 5, 6, 7.\n# ultradir: Path to Ultrasound directory. In this directory\n#           there should be a MIDI directory that contains\n#           the patch files for GUS playback. Patch sets used\n#           with Timidity should work fine.\n\ngus=false\ngusrate=44100\ngusbase=240\ngusirq=5\ngusdma=3\nultradir=C:ULTRASND\n\n[speaker]\n# pcspeaker: Enable PC-Speaker emulation.\n#    pcrate: Sample rate of the PC-Speaker sound generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#     tandy: Enable Tandy Sound System emulation. For 'auto', emulation is present only if machine is set to 'tandy'.\n#            Possible values: auto, on, off.\n# tandyrate: Sample rate of the Tandy 3-Voice generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#    disney: Enable Disney Sound Source emulation. (Covox Voice Master and Speech Thing compatible).\n\npcspeaker=true\npcrate=44100\ntandy=auto\ntandyrate=44100\ndisney=true\n\n[joystick]\n# joysticktype: Type of joystick to emulate: auto (default), none,\n#               2axis (supports two joysticks),\n#               4axis (supports one joystick, first joystick used),\n#               4axis_2 (supports one joystick, second joystick used),\n#               fcs (Thrustmaster), ch (CH Flightstick).\n#               none disables joystick emulation.\n#               auto chooses emulation depending on real joystick(s).\n#               (Remember to reset dosbox's mapperfile if you saved it earlier)\n#               Possible values: auto, 2axis, 4axis, 4axis_2, fcs, ch, none.\n#        timed: enable timed intervals for axis. Experiment with this option, if your joystick drifts (away).\n#     autofire: continuously fires as long as you keep the button pressed.\n#       swap34: swap the 3rd and the 4th axis. can be useful for certain joysticks.\n#   buttonwrap: enable button wrapping at the number of emulated buttons.\n\njoysticktype=auto\ntimed=true\nautofire=false\nswap34=false\nbuttonwrap=false\n\n[serial]\n# serial1: set type of device connected to com port.\n#          Can be disabled, dummy, modem, nullmodem, directserial.\n#          Additional parameters must be in the same line in the form of\n#          parameter:value. Parameter for all types is irq (optional).\n#          for directserial: realport (required), rxdelay (optional).\n#                           (realport:COM1 realport:ttyS0).\n#          for modem: listenport (optional).\n#          for nullmodem: server, rxdelay, txdelay, telnet, usedtr,\n#                         transparent, port, inhsocket (all optional).\n#          Example: serial1=modem listenport:5000\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial2: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial3: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial4: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n\nserial1=dummy\nserial2=dummy\nserial3=disabled\nserial4=disabled\n\n[dos]\n#            xms: Enable XMS support.\n#            ems: Enable EMS support.\n#            umb: Enable UMB support.\n# keyboardlayout: Language code of the keyboard layout (or none).\n\nxms=true\nems=true\numb=true\nkeyboardlayout=auto\n\n[ipx]\n# ipx: Enable ipx over UDP/IP emulation.\n\nipx=false\n\n[autoexec]\n# Lines in this section will be run at startup.\n# You can put your MOUNT lines here.\n\n# https://js-dos.com\n# █▀▀▀▀▀█ █  ▄▄▄▀▀█ █▀▀▀▀▀█\n# █ ███ █ ██▄ █ ▀ ▄ █ ███ █\n# █ ▀▀▀ █ ▄██ ▀ ▀▀█ █ ▀▀▀ █\n# ▀▀▀▀▀▀▀ ▀ █▄▀▄▀ █ ▀▀▀▀▀▀▀\n# █▀▄▄█▀▀▄▄ ▀ ▀█▄▄▄▄ ▀▄█▀█▀\n# █▀ ▀ ▀▀▄ █▀ ▄ ▄▀▀▀▄ █▀█▄\n# ▄ ▄▄ █▀▀▄ ▄▀▄▀▀█  ▀▀▄▀▀█▀\n#   ▄▀▀█▀▀ █▀█▀█▀▀▄ ▀██▀█▄\n# ▀▀▀ ▀ ▀ █▄█ ▀█▄▄█▀▀▀█▀▀\n# █▀▀▀▀▀█ ▄▄▄ ▄ ▄ █ ▀ █▄▄▄▄\n# █ ███ █ ▀█▀▀▄▀▀▄████▀▀█▄█\n# █ ▀▀▀ █ ▄▀▀█▀█▀▄ ▀▀▄▄█▄█ \n# ▀▀▀▀▀▀▀ ▀   ▀▀ ▀  ▀   ▀▀▀\n"},{"./js-dos-options":11}],7:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.applyCss=function(e,t){if(null===document.getElementById(e)){var o=document.createElement("style");o.id=e,o.innerHTML=t,document.head.appendChild(o)}},o.createDiv=function(e){var t=document.createElement("div");return void 0!==e&&(t.className=e),t}},{}],8:[function(e,t,o){"use strict";var n=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0});var l=n(e("./js-dos-cache-noop")),u=e("./js-dos-xhr"),s=function(){function e(e){var t=this;this.syncingPromise=null,this.lastSyncTime=0,this.dos=e,this.em=e,this.fs=e.FS,this.dos.registerTickListener(function(){Date.now()-t.lastSyncTime<5e3||(t.lastSyncTime=Date.now(),t.syncFs())}),this.dos.registerPauseListener(function(){return t.syncFs()}),this.dos.registerTerminateListener(function(){return t.syncFs()})}return e.prototype.chdir=function(e){this.fs.chdir(e)},e.prototype.extract=function(o,r,e){var a=this;void 0===r&&(r="/"),void 0===e&&(e="zip");var t=(r=this.normalizePath(r)).split("/");this.createPath(t,0,t.length),this.chdir(r);var n=function(){return new Promise(function(s,i){"zip"===e?new u.Xhr(o,{cache:new l.default,responseType:"arraybuffer",fail:function(e){return i(e)},progress:function(e,t){void 0!==a.dos.onprogress&&a.dos.onprogress("Downloading "+o,e,t)},success:function(e){var t=new Uint8Array(e),o=a.em._malloc(t.length);a.em.HEAPU8.set(t,o);var n=a.em._extract_zip(o,t.length);a.em._free(o),0===n?(a.writeOk(r),a.syncFs().then(s).catch(i)):i("Can't extract zip, retcode "+n+", see more info in logs")}}):i("Only ZIP archive is supported")})};return"/"===r||0===r.length?n():new Promise(function(t,o){0<a.lastSyncTime?o("Can't create persistent mount point, after syncing process starts"):(a.fs.mount(a.fs.filesystems.IDBFS,{},r),a.fs.syncfs(!0,function(e){if(!e)return a.readOk(r)?void t():(a.dos.warn("Indexed db contains broken FS, resetting..."),void n().then(t).catch(o));o("Can't restore FS from indexed db, cause: "+e)}))})},e.prototype.createFile=function(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var o=(e=e.replace(new RegExp("^[a-zA-z]+:"),"").replace(new RegExp("\\\\","g"),"/")).split("/");if(0!==o.length){var n=o[o.length-1].trim();if(0!==n.length){var s=this.createPath(o,0,o.length-1);this.fs.createDataFile(s,n,t,!0,!0,!0)}else void 0!==this.dos.onerror&&this.dos.onerror("Can't create file '"+e+"', because file name is empty")}else void 0!==this.dos.onerror&&this.dos.onerror("Can't create file '"+e+"', because it's not valid file path")},e.prototype.createPath=function(e,t,o){for(var n="",s=t;s<o;++s){var i=e[s].trim();0!==i.length&&(this.fs.createPath(n,i,!0,!0),n=n+"/"+i)}return n},e.prototype.syncFs=function(){var n=this;return this.syncingPromise||(this.syncingPromise=new Promise(function(t,o){Date.now();n.fs.syncfs(!1,function(e){e&&(n.dos.error("Can't sync FS to indexed db, cause: "+e),o(e)),n.syncingPromise=null,n.lastSyncTime=Date.now(),t()})})),this.syncingPromise},e.prototype.normalizePath=function(e){return 0!==e.length&&"/"===e[0]||(e="/"+e),1<e.length&&e.endsWith("/")&&(e=e.substr(0,e.length-1)),e},e.prototype.readOk=function(e){try{var t=this.fs.readFile(e+"/state.fs");return 79===t[0]&&70===t[1]}catch(e){return!1}},e.prototype.writeOk=function(e){this.createFile(e+"/state.fs",new Uint8Array([79,70]))},e}();o.DosFS=s},{"./js-dos-cache-noop":3,"./js-dos-xhr":13}],9:[function(e,t,o){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(o,"__esModule",{value:!0});var d=e("./js-dos-build"),h=e("./js-dos-xhr"),s=function(){function e(){this.wasmSupported=!1,this.global=window,this.wdosboxPromise=null,this.global.exports={};try{if("object"===("undefined"==typeof WebAssembly?"undefined":n(WebAssembly))&&"function"==typeof WebAssembly.instantiate&&"function"==typeof WebAssembly.compile){var e=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));e instanceof WebAssembly.Module&&(this.wasmSupported=new WebAssembly.Instance(e)instanceof WebAssembly.Instance)}}catch(e){}this.polyfill()}return e.prototype.polyfill=function(){Math.imul&&-5===Math.imul(4294967295,5)||(Math.imul=function(e,t){var o=65535&e,n=65535&t;return o*n+((e>>>16)*n+o*(t>>>16)<<16)|0}),Math.imul=Math.imul,Math.fround||(Math.fround=function(e){return e}),Math.fround=Math.fround,Math.clz32||(Math.clz32=function(e){e>>>=0;for(var t=0;t<32;t++)if(e&1<<31-t)return t;return 32}),Math.clz32=Math.clz32,Math.trunc||(Math.trunc=function(e){return e<0?Math.ceil(e):Math.floor(e)}),Math.trunc=Math.trunc},e.prototype.resolveDosBox=function(e,t,o){var n=this;this.global.exports.WDOSBOX?o.ondosbox(this.global.exports.WDOSBOX,this.global.exports.instantiateWasm):this.wasmSupported?(null===this.wdosboxPromise&&(this.wdosboxPromise=this.compileDosBox(e,t,o)),this.wdosboxPromise.then(function(e){setTimeout(function(){n.wdosboxPromise=null,o.ondosbox(n.global.exports.WDOSBOX,n.global.exports.instantiateWasm)},1)},function(e){setTimeout(function(){n.wdosboxPromise=null,void 0!==o.onerror&&o.onerror(e)},1)})):void 0!==o.onerror&&o.onerror("WebAssembly is not supported, can't resolve wdosbox")},e.prototype.compileDosBox=function(r,a,l){var u=this,c=d.Build.wasmSize+d.Build.jsSize;return new Promise(function(s,i){var e=r.replace(".js",".wasm.js");new h.Xhr(e,{cache:a,responseType:"arraybuffer",progress:function(e,t){l.onprogress&&l.onprogress("Resolving DosBox",c,t)},fail:function(e,t,o){i("Can't download wasm, code: "+t+", message: "+o+", url: "+e)},success:function(e){var t=WebAssembly.compile(e),n=function(e){i(e+"")};t.catch(n),t.then(function(o){u.global.exports.instantiateWasm=function(e,t){return e.env.globalscall=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];l.onglobals&&l.onglobals.apply(null,e)},WebAssembly.instantiate(o,e).catch(n).then(function(e){t(e,o)})},new h.Xhr(r,{cache:a,progress:function(e,t){l.onprogress&&l.onprogress("Resolving DosBox",c,d.Build.wasmSize+t)},fail:function(e,t,o){i("Can't download wdosbox.js, code: "+t+", message: "+o+", url: "+e)},success:function(e){void 0!==l.onprogress&&l.onprogress("Resolving DosBox",c,c),e+=eval.call(window,e),s(u.global.exports.WDOSBOX)}})})}})})},e}();o.Host=new s},{"./js-dos-build":1,"./js-dos-xhr":13}],10:[function(e,t,o){"use strict";var n,s=(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0});var r=e("./js-dos-build"),a=e("./js-dos-ci"),l=i(e("./js-dos-conf")),u=e("./js-dos-fs"),c=e("./js-dos-options"),d=e("./js-dos-ui"),h=function(n){function e(e,t){var o=n.call(this)||this;return o.isValid=!1,o.version=r.Build.version,o.ci=null,o.fs=null,o.ui=null,o.tickListeners=[],o.pauseListeners=[],o.resumeListeners=[],o.terminateListeners=[],o.canvas=e,o.onready=t,o.registerDefaultListeners(),o}return s(e,n),e.prototype.registerDefaultListeners=function(){var e,t=this;void 0!==document.hidden?e="hidden":void 0!==document.mozHidden?e="mozHidden":void 0!==document.msHidden?e="msHidden":void 0!==document.webkitHidden&&(e="webkitHidden"),document.addEventListener("visibilityChange",function(){document[e]?t.pause():t.resume()},!1),window.addEventListener("beforeunload",function(){t.terminate()})},e.prototype.debug=function(e){void 0!==this.log&&this.log("[DEBUG] "+e)},e.prototype.info=function(e){void 0!==this.log&&this.log("[INFO] "+e)},e.prototype.warn=function(e){void 0!==this.log&&this.log("[WARN] "+e)},e.prototype.error=function(e){void 0!==this.log&&this.log("[ERROR] "+e)},e.prototype.ondosbox=function(e,t){this.info("DosBox resolved"),this.instantiateWasm=t,this.instance=new e(this)},e.prototype.resolve=function(){var n=this;this.wdosboxUrl||(this.wdosboxUrl="wdosbox.js"),this.log||(this.log=function(e){return console.log(e)}),this.canvas?(this.onprogress||(this.ui=new d.DosUi(this),this.onprogress=function(e,t,o){null!==n.ui&&n.ui.onprogress(e,t,o)}),this.SDL={defaults:{widht:320,height:200,copyOnLock:!1,discardOnLock:!0,opaqueFrontBuffer:!1}},this.isValid=!0):void 0!==this.onerror&&this.onerror("canvas field is required, but not set!")},e.prototype.onRuntimeInitialized=function(){var o=this;this.fs=new u.DosFS(this),this.onready({fs:this.fs,main:function(e){return null!==o.ui&&(o.ui.detach(),o.ui=null),e||(e=[]),null===o.fs?new Promise(function(e,t){t("IllegalState: fs is null")}):(o.fs.chdir("/"),o.fs.createFile("/home/web_user/.dosbox/dosbox-jsdos.conf",l.default(o)),e.unshift("-userconf","-c","mount c .","-c","c:"),o.callMain(e),new Promise(function(t){new a.DosCommandInterface(o,function(e){t(e)})}))}})},e.prototype.registerTickListener=function(e){this.tickListeners.push(e)},e.prototype.registerPauseListener=function(e){this.pauseListeners.push(e)},e.prototype.registerResumeListener=function(e){this.resumeListeners.push(e)},e.prototype.registerTerminateListener=function(e){this.terminateListeners.push(e)},e.prototype.tick=function(){for(var e=0,t=this.tickListeners;e<t.length;e++){(0,t[e])()}},e.prototype.pause=function(){for(var e=0,t=this.pauseListeners;e<t.length;e++){(0,t[e])()}},e.prototype.resume=function(){for(var e=0,t=this.resumeListeners;e<t.length;e++){(0,t[e])()}},e.prototype.terminate=function(){for(var e=0,t=this.terminateListeners;e<t.length;e++){(0,t[e])()}},e}(c.DosOptions);o.DosModule=h},{"./js-dos-build":1,"./js-dos-ci":5,"./js-dos-conf":6,"./js-dos-fs":8,"./js-dos-options":11,"./js-dos-ui":12}],11:[function(e,t,o){"use strict";var n,s=(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});Object.defineProperty(o,"__esModule",{value:!0});var i=function(){},r=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s(t,e),t}(o.DosBoxConfig=i);o.DosOptions=r,o.DosBoxConfigDefaults={cycles:"auto",autolock:!1}},{}],12:[function(e,t,o){"use strict";var n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t};Object.defineProperty(o,"__esModule",{value:!0});var s=n(e("./js-dos-dom")),i=function(){function e(e){this.overlay=null,this.loaderMessage=null,this.hidden=!0,this.css='\n    .dosbox-container { position: relative; min-width: 320px; min-height: 200px; display: inline-block; }\n    .dosbox-overlay, .dosbox-loader { position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: rgba(51, 51, 51, 0.7); }\n    .dosbox-start { text-align: center; position: absolute; left: 0; right: 0; bottom: 50%; color: #fff; font-size: 1.5em; text-decoration: underline; cursor: pointer; }\n    .dosbox-overlay a { color: #fff; }\n    .dosbox-powered { position: absolute; right: 1em; bottom: 1em; font-size: 0.8em; color: #9C9C9C; }\n    .dosbox-loader-message { text-align: center; position: absolute; left: 0; right: 0; bottom: 50%; margin: 0 0 -3em 0; box-sizing: border-box; color: #fff; font-size: 1.5em; }\n    @-moz-keyframes loading { 0% { left: 0; } 50% { left: 8.33333em; } 100% { left: 0; } } @-webkit-keyframes loading { 0% { left: 0; } 50% { left: 8.33333em; } 100% { left: 0; } } @keyframes loading { 0% { left: 0; } 50% { left: 8.33333em; } 100% { left: 0; } } .st-loader { width: 10em; height: 2.5em; position: absolute; top: 50%; left: 50%; margin: -1.25em 0 0 -5em; box-sizing: border-box; }\n    .st-loader:before, .st-loader:after { content: ""; display: block; position: absolute; top: 0; bottom: 0; width: 1.25em; box-sizing: border-box; border: 0.25em solid #fff; }\n    .st-loader:before { left: -0.76923em; border-right: 0; }\n    .st-loader:after { right: -0.76923em; border-left: 0; }\n    .st-loader .equal { display: block; position: absolute; top: 50%; margin-top: -0.5em; left: 4.16667em; height: 1em; width: 1.66667em; border: 0.25em solid #fff; box-sizing: border-box; border-width: 0.25em 0; -moz-animation: loading 1.5s infinite ease-in-out; -webkit-animation: loading 1.5s infinite ease-in-out; animation: loading 1.5s infinite ease-in-out; background: #fff; }\n    ',this.overlayHtml='\n        <div class="dosbox-loader">\n            <div class="st-loader">\n                <span class="equal"></span>\n            </div>\n            <div class="dosbox-loader-message"></div>\n        </div>\n        <div class="dosbox-powered">\n            Powered by &nbsp;<a href="https://js-dos.com">js-dos.com</a> (6.22)\n        </div>\n    ',this.dos=e,this.canvas=e.canvas;try{if(s.applyCss("js-dos-ui-css",this.css),null!==this.canvas.parentElement&&"dosbox-container"!==this.canvas.parentElement.className){var t=s.createDiv("dosbox-container");this.canvas.parentElement.replaceChild(t,this.canvas),t.appendChild(this.canvas);var o=s.createDiv("dosbox-overlay");t.appendChild(o),o.innerHTML=this.overlayHtml}var n=this.canvas.parentElement;if(null===n)throw new Error("Illegal state, container is null");if(this.overlay=this.childById(n,"dosbox-overlay"),null===this.overlay)throw new Error("Illegal state, overlay is null");this.loaderMessage=this.childById(this.overlay,"dosbox-loader-message"),this.hidden=!0,this.show()}catch(e){this.onprogress=this.onprogressFallback}}return e.prototype.onprogress=function(e,t,o){var n=e+" "+Math.round(100*o/t*10)/10+"%";null!==this.loaderMessage&&(this.loaderMessage.innerHTML=n),this.dos.info(n),t<=o?this.hide():this.show()},e.prototype.detach=function(){this.hide(),this.onprogress=this.onprogressFallback},e.prototype.hide=function(){this.hidden||(this.hidden=!0,null!==this.overlay&&this.overlay.setAttribute("style","display: none"))},e.prototype.show=function(){this.hidden&&(this.hidden=!1,null!==this.overlay&&this.overlay.setAttribute("style","display: block"))},e.prototype.onprogressFallback=function(e,t,o){this.dos.info(e+" "+100*o/t+"%")},e.prototype.childById=function(e,t){if(null===e)return null;for(var o=0;o<e.childElementCount;++o){var n=e.children[o];if(n.className===t)return n;if(null!==(n=this.childById(n,t)))return n}return null},e}();o.DosUi=i},{"./js-dos-dom":7}],13:[function(e,t,o){"use strict";var n=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0});var s=n(e("./js-dos-cache-noop")),i=function(){function e(e,t){var o=this;this.xhr=null,this.total=0,this.loaded=0,this.resource=e,this.options=t,this.options.method=t.method||"GET",this.cache=t.cache||new s.default,"GET"===this.options.method&&this.cache.get(this.resource,function(e){void 0!==o.options.success&&o.options.success(e)},function(){o.makeHttpRequest()})}return e.prototype.makeHttpRequest=function(){var e,t,o=this;this.xhr=new XMLHttpRequest,this.xhr.open(this.options.method||"GET",this.resource,!0),"POST"===this.options.method&&this.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),this.xhr.overrideMimeType("text/plain; charset=x-user-defined"),"function"==typeof(e=this.xhr).addEventListener&&e.addEventListener("progress",function(e){if(o.total=e.total,o.loaded=e.loaded,o.options.progress)return o.options.progress(e.total,e.loaded)}),"function"==typeof(t=this.xhr).addEventListener&&t.addEventListener("error",function(e){if(o.options.fail)return o.options.fail(o.resource,o.xhr.status,"connection problem"),delete o.options.fail}),this.xhr.onreadystatechange=function(){return o.onReadyStateChange()},this.options.responseType&&(this.xhr.responseType=this.options.responseType),this.xhr.send(this.options.data)},e.prototype.onReadyStateChange=function(){var e=this.xhr;if(4===e.readyState)if(200===e.status){if(this.options.success){var t=Math.max(this.total,this.loaded);return void 0!==this.options.progress&&this.options.progress(t,t),"GET"===this.options.method&&this.resource.indexOf("?")<0&&this.cache.put(this.resource,e.response,function(){}),this.options.success(e.response)}}else if(this.options.fail)return this.options.fail(this.resource,e.status,"connection problem"),delete this.options.fail},e}();o.Xhr=i},{"./js-dos-cache-noop":3}],14:[function(e,t,o){"use strict";var n=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0});var r=n(e("./js-dos-cache")),a=e("./js-dos-host"),l=e("./js-dos-module"),s=function(s,i){var e=new Promise(function(e,t){var o=new l.DosModule(s,e);i||(i={}),i.onerror||(i.onerror=function(e){console.error(e)}),Object.assign(o,i);var n=o.onerror;o.onerror=function(e){t(e);setTimeout(function(){o.onerror=n?(n(e),n):o.error},1)},o.resolve(),o.isValid&&r.default(o,function(e){a.Host.resolveDosBox(o.wdosboxUrl,e,o)})});return e.ready=function(t){return e.then(function(e){t(e.fs,e.main)}),e},e};o.default=s,window.Dos=s},{"./js-dos-cache":4,"./js-dos-host":9,"./js-dos-module":10}]},{},[14]);
//# sourceMappingURL=js-dos.js.map
