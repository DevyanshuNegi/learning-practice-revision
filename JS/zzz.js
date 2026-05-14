console.log("start");

setTimeout(() => {
    console.log("timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("promise");
});

function test() {
    console.log("function");
}

test();

console.log("end of ");


//  Immidiate function invocation 

(function () {
    console.log("immidate");
}
)();

async function fetchdata() {
    console.log("It fetches and takes time");
}
await fetchdata()