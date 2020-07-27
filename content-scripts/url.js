// setting up the all storage
let links = {};

// if data is available in storage 
let gettingItem = browser.storage.local.get();
gettingItem.then(onGot, onError);

function onGot(item) {
    // console.log(item);
    links = item || {};
}

function onError(error) {
    console.log(`Error: ${error}`);
    links = {};
}

// send url
const send_url = async (url) => {

    // put url in a json 
    let data = { "url": url };
    // console.log(data);

    let options = {
        mode: 'cors',
        cache: 'no-cache',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    let res = await fetch("https://link-viewer.herokuapp.com/api", options);
    let d = JSON.stringify(await res.json());
    // console.log(d);
    return d;
}

// get preview function
const get_data = async (url) => {
    // show loading while content loads

    // get the necessary elements
    let title = document.getElementsByClassName("tool-title")[0];
    let description = document.getElementsByClassName("tool-description")[0];
    let url2 = document.getElementsByClassName("tool-url")[0];

    //assign
    title.innerText = "Loading...";
    description.innerText = "Almost there";
    url2.innerText = "Just a sec...!";

    // place tool before loading
    // show not found while loading
    document.getElementById("image").src = "https://raw.githubusercontent.com/jhamadhav/link-preview/master/public/images/dummy.svg";
    place_tool(x, y);

    // if it already exists then don't send request to the server
    let t = new Date().getTime();
    if (!links.hasOwnProperty(url)) {

        let data = await send_url(url);
        // console.log(data);

        links[url] = JSON.parse(data);
    } else if (links[url].time < t) {

        // if time has expired then delete the item
        delete links[url];

        let data = await send_url(url);
        // console.log(data);

        links[url] = JSON.parse(data);
    }

    // irrespective of the action save the new set of array into the browser storage
    browser.storage.local.set(links);

    // call function to make changes in the dom elements
    show_preview(links[url]);
}

// make changes to the link preview tab
const show_preview = async (data) => {

    // wait for the data to come
    let obj = await data;
    // console.log(obj);

    // get the necessary elements
    let title = document.getElementsByClassName("tool-title")[0];
    let description = document.getElementsByClassName("tool-description")[0];
    let url = document.getElementsByClassName("tool-url")[0];
    let image = document.getElementById("image");

    // set property only if the data we received is not undefined

    // setup title
    if (obj["title"] !== undefined) {
        title.innerText = obj["title"];
    } else {
        title.innerText = "Title";
    }

    // the description
    obj["description"].trim();
    if (obj["description"] !== undefined && obj["description"].length > 10) {
        description.innerText = obj["description"];
    } else {
        description.innerText = "Description : not found";
    }

    // create a new image for the image and assign only when loaded
    let new_img = new Image();
    new_img.onload = () => {
        // get the tooltip
        let tt = document.getElementsByClassName("tooltip")[0];

        // move the position of image and data as per the image size
        if (new_img.height < new_img.width) {
            tt.style.flexDirection = "column-reverse";
            tt.style.maxWidth = "300px";
        } else {
            tt.style.flexDirection = "initial";
            tt.style.maxWidth = "440px";
        }
        // assign the url
        image.src = new_img.src;

        // place after loading
        place_tool(x, y);
    }

    // check if url is correct
    let tool_img = document.getElementsByClassName("tool-img")[0];
    if (obj["image"] !== undefined) {
        // console.log(obj["image"]);
        tool_img.style.display = "block";
        new_img.src = obj["image"];
    } else {
        // console.log("image not found");
        tool_img.style.display = "none";
    }

    // assign url to the whole tooltip too
    url.innerText = obj["url"];

    let tool_tip = document.getElementsByClassName("tooltip")[0];
    if (obj["url"] !== undefined) {

        tool_tip.addEventListener("click", () => {
            window.open(obj["url"]);
        });
    }


}

