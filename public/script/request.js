

const getData = (method, url,callback) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            let data = JSON.parse(xhr.responseText)
            callback(data);
        }
    }

    xhr.open(method, url, true)
    xhr.send()
};

