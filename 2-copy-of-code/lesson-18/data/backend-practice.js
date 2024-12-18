const xhr = new XMLHttpRequest(); /* new HTTPS message we will send to backend */

console.log("fwefwe");
xhr.addEventListener('load', () => {
  console.log(xhr.response);
}); /* for asynch code */

/* on webpage->netwwok tab shows all the http messages
coming in or out of our computer */


//xhr.open('GET', 'https://supersimplebackend.dev/documentation');
xhr.open('GET', 'https://supersimplebackend.dev'); /* Hypertext transfer protocol secure */
/* open(what type of message, where to send(to URL unfirm resource locator)) */
/* the second parameter is the BACKEND */
xhr.send();  /* send the message to the backend */
/* send is asynch code it does not wait for response */
xhr.response