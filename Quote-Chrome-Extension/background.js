chrome.runtime.onInstalled.addListener(()=>{
    console.log("onInstalled ..")

    chrome.alarms.create("startRequest", {periodInMinutes: 5})
    startRequest()
})

chrome.alarms.onAlarm.addListener((alarm)=>{
    startRequest()
})
async function startRequest() {
    const response = await fetch("https://api.quotable.io/random")
    const newData = await response.json()
    const data = `${newData.content} -${newData.author}`
    console.log(data)


    var options = {
        title: "Random Quotes",
        message: data,
        iconUrl: "/images/favicon-16x16.png",
        type: "basic",
    };
    chrome.notifications.create("", options)
}