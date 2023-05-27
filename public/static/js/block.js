function mine_current_block(block) {
    var new_proof = 1;
    var check_proof = false;
    var hash = null;
    while (check_proof == false) {
        var generate_hash_for = {
            'index': block["index"],
            'data': block["data"],
            'proof': new_proof,
            'prev_hash': "0000000000000000000000000000000000000000000000000000000000000000",
        };
        var encoded_block = JSON.stringify(generate_hash_for, sort_keys = true);
        hash = SHA256(encoded_block);
        if (hash.slice(0, 4) == '0000') {
            console.log("Verified Hash " + hash);
            check_proof = true;
        }
        else {
            new_proof += 1;
        }
    }
    return [new_proof, hash];
}

// Check the hash of current block lies below the target
function check_hash(hash) {
    if (hash.slice(0, 4) == '0000') {
        document.getElementById("finalkey").style.backgroundColor = "#CFFED4";
        document.getElementById("finalkey").style.color = "#424242";
    }
    else {
        document.getElementById("finalkey").style.backgroundColor = "red";
        document.getElementById("finalkey").style.color = "whitesmoke";
    }
}

// Mine an individual block
function mine() {
    var no = document.getElementById("contactName").value;
    var data = document.getElementById("textarea").value;
    var block = {
        'index': no,
        'data': data
    }
    var mine_complete = mine_current_block(block);
    var hash = mine_complete[1];
    check_hash(hash);
    document.getElementById("contactEmail").value = mine_complete[0];
    document.getElementById("finalkey").innerText = mine_complete[1];
}

// Initialization
var data = document.getElementById("textarea");
var nonce = document.getElementById("contactEmail");
var blockNum = document.getElementById("contactName");
var prev_hash = "0000000000000000000000000000000000000000000000000000000000000000"

// Change the hash when Data is changed
data.addEventListener('input', function (event) {
    var finalString = JSON.stringify(
        {
            'index': blockNum.value,
            'data': event.target.value,
            'proof': nonce.value,
            'prev_hash': prev_hash
        }
    );
    var hash = SHA256(finalString);
    document.getElementById("finalkey").innerText = hash;
    check_hash(hash);
});

// Change the hash when Nonce is changed
nonce.addEventListener('input', function (event) {
    var finalString = JSON.stringify(
        {
            'index': blockNum.value,
            'data': data.value,
            'proof': event.target.value,
            'prev_hash': prev_hash
        }
    );
    var hash = SHA256(finalString);
    document.getElementById("finalkey").innerText = hash;
    check_hash(hash);
});

// Change the hash when BLock Number is changed
blockNum.addEventListener('input', function (event) {
    var finalString = JSON.stringify(
        {
            'index': event.target.value,
            'data': data.value,
            'proof': nonce.value,
            'prev_hash': prev_hash
        }
    );
    var hash = SHA256(finalString);
    document.getElementById("finalkey").innerText = hash;
    check_hash(hash);
});