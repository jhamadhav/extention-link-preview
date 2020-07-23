let links = {};

// send url
const send_url = async (url) => {

    // put url in a json 
    let data = { "url": url };
    console.log(data);

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
        console.log(data);

        links[url] = JSON.parse(data);
    }

    // irrespective of the action save the new set of array into the local storage
    // Store
    // localStorage.setItem("link_data", JSON.stringify(links));

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
    if (obj["title"] !== undefined) {
        title.innerText = obj["title"];
    } else {
        title.innerText = "Title";
    }

    if (obj["description"] !== undefined) {
        description.innerText = obj["description"];
    } else {
        description.innerText = "Description : not found";
    }

    if (obj["image"] !== undefined) {
        image.style.display = "inline-block";
        image.src = obj["image"];
    } else {
        image.style.display = "none";
        image.src = "https://raw.githubusercontent.com/jhamadhav/link-preview/master/public/images/dummy.svg";
    }

    url.innerText = obj["url"];

}