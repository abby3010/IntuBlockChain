/**
 * The main blockchain structure of the project
 */
 var blockchain = [
    {
        'index': 1,
        'data': "",
        'nonce': 94549,
        'prev_hash': "0000000000000000000000000000000000000000000000000000000000000000"
    }
];

/**
 * Adds a new block with user input data
 */
function add_block() {
    let new_data = document.getElementById("newdata").value;
    let block = {
        'index': blockchain.length + 1,
        'data': new_data,
        'nonce': 0,
        'prev_hash': SHA256(JSON.stringify(blockchain[blockchain.length - 1])),
    }
    var mined_block = mine_current_block(block);
    block["nonce"] = mined_block[0];
    blockchain.push(block);
    create_block_design(block, blockchain.length - 1);
}

/**
 * Proof of work Function
 * @param {block to find the proof of} block 
 */
function mine_current_block(block) {
    var new_proof = 1;
    var check_proof = false;
    var hash = null;
    while (check_proof == false) {
        var generate_hash_for = {
            'index': block["index"],
            'data': block["data"],
            'nonce': new_proof,
            'prev_hash': block["prev_hash"],
        };
        var encoded_block = JSON.stringify(generate_hash_for, sort_keys = true);
        hash = SHA256(encoded_block);
        if (hash.slice(0, 4) == '0000') {
            check_proof = true;
        }
        else {
            new_proof += 1;
        }
    }
    return [new_proof, hash];
}

/**
 * Mines the block at the current index
 * @param {index of the block to be mined} index 
 */
function mine(index) {
    var mined_block = mine_current_block(blockchain[index]);
    blockchain[index]["nonce"] = mined_block[0];
    document.getElementById("nonce" + index.toString()).value = mined_block[0];
    document.getElementById("hash" + index.toString()).innerText = mined_block[1];
    change_color(index, mined_block[1]);
    if (blockchain.length != index + 1) {
        var i;
        for (i = index; i < blockchain.length; i++) {
            // updated hash of next block
            let new_hash = SHA256(JSON.stringify(blockchain[i]));
            if (blockchain[i + 1] != undefined) {
                blockchain[i + 1]["prev_hash"] = new_hash;
                document.getElementById("prev_hash" + (i + 1).toString()).innerText = new_hash;
                let curr_hash = SHA256(JSON.stringify(blockchain[i + 1]));
                document.getElementById("hash" + (i + 1).toString()).innerText = curr_hash;
                change_color(i, new_hash);
                change_color(i + 1, curr_hash);
            }
            document.getElementById("hash" + (i).toString()).innerText = new_hash;
        }

    }
}

/**
 *  A function to create an d display the block in UI
 * @param {block to be created} block 
 * @param {index at which we want to create the block} index 
 */
function create_block_design(block, index) {

    var item = document.createElement("li");
    item.className = "item";
    item.id = index.toString();

    // Block number Div
    var div_blocknum = document.createElement("div");
    div_blocknum.className = "text-input";

    var label_blocknum = document.createElement("label");
    label_blocknum.innerText = "Block No.";

    var input_blocknum = document.createElement("input");
    set_input_properties(input_blocknum, "text", "input-field", "block-num" + index.toString(), 35, block["index"], true);

    div_blocknum.appendChild(label_blocknum);
    div_blocknum.appendChild(input_blocknum);
    item.appendChild(div_blocknum);

    input_blocknum.addEventListener('input', function (event) {

        var nonce = document.getElementById("nonce" + index.toString());
        var data = document.getElementById("data" + index.toString());
        var prev_hash = "0000000000000000000000000000000000000000000000000000000000000000";
        if (prev_hash > 0) {
            prev_hash = SHA256(JSON.stringify(blockchain[index - 1]));
        }

        var finalString = JSON.stringify(
            {
                'index': event.target.value,
                'data': data.value,
                'nonce': nonce.value,
                'prev_hash': prev_hash
            }
        );
        var hash = SHA256(finalString);
        blockchain[index]["index"] = event.target.value
        document.getElementById("hash" + index.toString()).innerText = hash;
        if (blockchain.length != index + 1) {
            blockchain[index + 1]["prev_hash"] = hash;
            document.getElementById("prev_hash" + (index + 1).toString()).innerText = hash;

            var i;
            for (i = index; i < blockchain.length; i++) {
                let new_hash = SHA256(JSON.stringify(blockchain[i]));
                if (blockchain[i + 1] != undefined) {
                    blockchain[i + 1]["prev_hash"] = new_hash;
                    document.getElementById("prev_hash" + (i + 1).toString()).innerText = new_hash;
                    let curr_hash = SHA256(JSON.stringify(blockchain[i + 1]))
                    document.getElementById("hash" + (i + 1).toString()).innerText = curr_hash;
                    change_color(i, new_hash);
                    change_color(i + 1, curr_hash);
                }
                document.getElementById("hash" + (i).toString()).innerText = new_hash;
            }
        }
    });

    // Nonce value Div
    var div_nonce = document.createElement("div");
    div_nonce.className = "text-input";

    var label_nonce = document.createElement("label");
    label_nonce.innerText = "Nonce";

    var input_nonce = document.createElement("input");
    set_input_properties(input_nonce, "text", "input-field", "nonce" + index.toString(), 35, block["nonce"], false);

    div_nonce.appendChild(label_nonce);
    div_nonce.appendChild(input_nonce);
    item.appendChild(div_nonce);

    input_nonce.addEventListener('input', function (event) {

        var blockNum = document.getElementById("block-num" + index.toString());
        var data = document.getElementById("data" + index.toString());
        var prev_hash = "0000000000000000000000000000000000000000000000000000000000000000";
        if (prev_hash > 0) {
            prev_hash = SHA256(JSON.stringify(blockchain[index - 1]));
        }

        var finalString = JSON.stringify(
            {
                'index': blockNum.value,
                'data': data.value,
                'nonce': event.target.value,
                'prev_hash': prev_hash
            }
        );
        var hash = SHA256(finalString);
        blockchain[index]["nonce"] = event.target.value;
        document.getElementById("hash" + index.toString()).innerText = hash;
        if (blockchain.length != index + 1) {
            blockchain[index + 1]["prev_hash"] = hash;
            document.getElementById("prev_hash" + (index + 1).toString()).innerText = hash;

            var i;
            for (i = index; i < blockchain.length; i++) {
                let new_hash = SHA256(JSON.stringify(blockchain[i]));
                if (blockchain[i + 1] != undefined) {
                    blockchain[i + 1]["prev_hash"] = new_hash;
                    document.getElementById("prev_hash" + (i + 1).toString()).innerText = new_hash;
                    let curr_hash = SHA256(JSON.stringify(blockchain[i + 1]))
                    document.getElementById("hash" + (i + 1).toString()).innerText = curr_hash;
                    change_color(i, new_hash);
                    change_color(i + 1, curr_hash);
                }
                document.getElementById("hash" + (i).toString()).innerText = new_hash;
            }

        }
    });

    // Data value Div
    var div_data = document.createElement("div");
    div_data.className = "text-input";

    var label_data = document.createElement("label");
    label_data.innerText = "Data";

    var textarea_data = document.createElement("textarea");
    textarea_data.className = "input-field";
    textarea_data.id = "data" + index.toString();
    textarea_data.rows = 4;
    textarea_data.placeholder = "Data";
    textarea_data.value = block["data"]

    div_data.appendChild(label_data);
    div_data.appendChild(textarea_data);
    item.appendChild(div_data);

    textarea_data.addEventListener('input', function (event) {

        var blockNum = document.getElementById("block-num" + index.toString());
        var nonce = document.getElementById("nonce" + index.toString());
        var prev_hash = "0000000000000000000000000000000000000000000000000000000000000000";
        if (prev_hash > 0) {
            prev_hash = SHA256(JSON.stringify(blockchain[index - 1]));
        }

        var finalString = JSON.stringify(
            {
                'index': blockNum.value,
                'data': event.target.value,
                'nonce': nonce.value,
                'prev_hash': prev_hash
            }
        );
        var hash = SHA256(finalString);
        blockchain[index]["data"] = event.target.value
        document.getElementById("hash" + index.toString()).innerText = hash;
        change_color(index, hash);
        if (blockchain.length != index + 1) {
            blockchain[index + 1]["prev_hash"] = hash;
            document.getElementById("prev_hash" + (index + 1).toString()).innerText = hash;
            var i;
            for (i = index; i < blockchain.length; i++) {
                let new_hash = SHA256(JSON.stringify(blockchain[i]));
                if (blockchain[i + 1] != undefined) {
                    blockchain[i + 1]["prev_hash"] = new_hash;
                    document.getElementById("prev_hash" + (i + 1).toString()).innerText = new_hash;
                    let curr_hash = SHA256(JSON.stringify(blockchain[i + 1]))
                    document.getElementById("hash" + (i + 1).toString()).innerText = curr_hash;
                    change_color(i, new_hash);
                    change_color(i + 1, curr_hash);
                }
                document.getElementById("hash" + (i).toString()).innerText = new_hash;
            }
        }

    });

    // Previous Hash value Div
    var div_prev_hash = document.createElement("div");
    div_prev_hash.className = "text-input";

    var label_prev_hash = document.createElement("label");
    label_prev_hash.innerText = "Prev. Hash";

    var div_hash = document.createElement("div");
    div_hash.className = "input-field";
    div_hash.id = "prev_hash" + index.toString();
    div_hash.innerText = block["prev_hash"];

    div_prev_hash.appendChild(label_prev_hash);
    div_prev_hash.appendChild(div_hash);
    item.appendChild(div_prev_hash);

    // Current Hash value of Block Div
    var div_curr_hash = document.createElement("div");
    div_curr_hash.className = "text-input";

    var label_curr_hash = document.createElement("label");
    label_curr_hash.innerText = "Hash";

    var div_hash = document.createElement("div");
    div_hash.className = "input-field";
    div_hash.id = "hash" + index.toString();
    div_hash.innerText = SHA256(JSON.stringify(block));

    div_curr_hash.appendChild(label_curr_hash);
    div_curr_hash.appendChild(div_hash);
    item.appendChild(div_curr_hash);

    // Mine Button
    var button = document.createElement("button");
    button.type = "submit";
    button.className = "submit";
    button.innerText = "Mine"
    button.onclick = () => { mine(index) };
    item.appendChild(button);

    // Pushing the item(block) in the blockchain
    var hs = document.getElementById("blockchain");
    hs.appendChild(item);
}

/**
 * Sets the properties associated to a particular textfield(input field)
 * @param {the DOM element} element 
 * @param {input type} type 
 * @param {name of the class} className 
 * @param {name of the id} id 
 * @param {size of the textfield} size 
 * @param {value to be displayed} value 
 * @param {true if required otherwise false} required 
 */
function set_input_properties(element, type, className, id, size, value, required) {
    element.type = type;
    element.className = className;
    element.id = id;
    element.size = size;
    element.value = value;
    element.required = required;
}

/**
 *  Change background color 
 *  to red if hash is not under the target value and,
 *  to green if hash is under the target value
 * @param {index of the block} index
 * @param {hash of the block} hash
 */ 
function change_color(index, hash) {
    if (hash.slice(0, 4) != '0000') {
        document.getElementById("hash" + index.toString()).style.backgroundColor = "red";
        document.getElementById("hash" + index.toString()).style.color = "whitesmoke";
    }
    else{
        document.getElementById("hash" + index.toString()).style.backgroundColor = "#CFFED4";
        document.getElementById("hash" + index.toString()).style.color = "#424242";
    }
}


//Creating the initial block when screen is loaded
create_block_design(blockchain[0], 0);