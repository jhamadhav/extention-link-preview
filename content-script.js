// check if the extension works
console.log("successfully injected a code");

// creation of the tool tip
const create_tool = () => {

    // create the container that holds everything
    let tooltip = document.createElement("div");
    tooltip.classList = "tooltip";

    // the first element that will hold title,description and url
    let tool_data = document.createElement("div");
    tool_data.classList = "tool-data";
    // title
    let tool_title = document.createElement("div");
    tool_title.classList = "tool-title";
    tool_title.innerText = "Here comes the title";

    // hr
    let hr = document.createElement("hr");

    // description
    let tool_desc = document.createElement("div");
    tool_desc.classList = "tool-description";
    tool_desc.innerText = "Here comes the description";

    // url
    let tool_url = document.createElement("div");
    tool_url.classList = "tool-url"
    tool_url.innerText = "Here comes the url";

    // add them all into the tool data
    tool_data.appendChild(tool_title);
    tool_data.appendChild(hr);
    tool_data.appendChild(tool_desc);
    tool_data.appendChild(tool_url);

    // next the 2nd container for the image
    let tool_img = document.createElement("div");
    tool_img.classList = "tool-img";
    let image = document.createElement("img");
    image.src = "https://raw.githubusercontent.com/jhamadhav/link-preview/master/public/images/dummy.svg";
    image.id = "image";

    // put image into 2nd container
    tool_img.appendChild(image);

    // put both container into tool tip
    tooltip.appendChild(tool_data);
    tooltip.appendChild(tool_img);

    // put tooltip into the body
    document.body.appendChild(tooltip);
}

// function to place tooltip
const place_tool = () => {
    //get the tool tip
    let tt = document.getElementsByClassName("tooltip")[0];

    //get its shape
    let tool_shape = tt.getClientRects()[0];
    // console.log(tool_shape);

    // then have it height and width
    let tool_h = tool_shape.height;
    let tool_w = tool_shape.width;

    let tt_x = 0, tt_y = 0;
    // conditions i.e the tool tip should show all the way 

    // for X co-ordinate
    if (W - x >= tool_w) {
        tt_x = x;
    } else {
        if (x >= tool_w) {
            tt_x = x - tool_w;
        } else {
            tt_x = W - tool_w;
        }
    }
    // for Y co-ordinate
    if (H - y > tool_h) {
        tt_y = y;
    } else {
        if (y >= tool_h) {
            tt_y = y - tool_h;
        } else {
            tt_y = 0;
        }
    }
    // tool_shape.x = tt_x;
    // tool_shape.y = tt_y
    tt.style.transform = "translate(" + tt_x + "px," + tt_y + "px)";
}

// create the tooltip
create_tool();

// get all anchor tags and add a event listener so the the link that they point to is console logged
const set_event = () => {
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener("mouseover", show);
        a[i].addEventListener("mouseout", () => {
            let tool = document.getElementsByClassName("tooltip")[0];
            // tool.style.visibility = "hidden";
        });
    }
}
set_event();

// the anchor tag and function to show it
let a = document.getElementsByTagName("a");
// show function
const show = (e) => {

    // for this instance alone place tooltip every time mouse move
    place_tool();

    // the url from anchor tab
    let url = e.target.href;
    console.log(e);
    // tool.style.visibility = "visible";

}



