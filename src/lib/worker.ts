const task = `
  onmessage = e => {
    console.log("From Main",e.data);
    setTimeout(()=>postMessage("worker says hello"), 3000);
  }
`

export default task;