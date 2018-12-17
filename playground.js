function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});

/*._____________________________________*/

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  console.log('loaded');
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});

/*._____________________________________*/

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  callback();
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});

/*._____________________________________*/

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});

/*._____________________________________*/


function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js')

alert(`Cool, the ${script.src} is loaded`);
alert( _ ); // function declared in the loaded script



function loadScript1(script,callback){
		callback(script);
}

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',function(script){
		setTimeout(()=>{alert('first alert')},1000)
		//alert('first alert');
		loadScript1(script,function(script){
				//alert('second alert');
				setTimeout(()=>{alert('second alert')},1000)
				loadScript1(script,function(script){
					alert('third alert');
					alert(`Cool, the ${script} is loaded`);
				});
				alert('@second');
		});
		alert('@third');
});

let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(function(value){alert(value)}); // shows "done!" after 1 second


function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('One more handler to do something else!'));

