class PromiseWebsocket extends WebSocket {
  constructor(url) {
    super(url)

    //this tries to keep track of if the onmessage was set using wb.onmessage = instead of set_onmessagemethod
    this.onmessage_set_modified = false
  }

  set_onmessage(fn) {
    this.onmessage = fn
    this.onmessage_custom = null
  }


  send(msg) {
    var when_open = new Promise((resolve, reject) => {
      this.onopen = () => resolve()
      this.onclose = () => reject()
      this.onerror = () => reject()
    })
    
    var prom = null

    return when_open.then(() => {
      // console.log(msg)
      super.send(msg)
      var prom = new Promise((resolve, reject) => {
        if (this.onmessage === null) {
          this.onmessage = (msg) => {
            // console.log(msg)
            resolve({ "onmessage_return": null, "msg": msg })
          }
        } else if ((this.onmessage + "").replace("/\s\g,''") !== '(msg)=>{resolve({"onmessage_return":null,"msg":msg})}') {
          if (this.onmessage_custom === null) {
            this.onmessage_custom = eval(this.onmessage + "")
          }
          this.onmessage = (msg) => {
            resolve({ "onmessage_return": this.onmessage_custom(msg), "msg": msg })
          }
        }
        this.onerror = (err) => reject(err)
      })
    })    
  }
}