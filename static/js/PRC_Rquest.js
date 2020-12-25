
import("jquery-3.1.1(1)");

function RpcPost() {
    var commit =  $("div#commit input").attr("value",undefined).val();
    var params =  $("div#params input").attr("value",undefined).val();
    if(commit==""){
        return
    }
    Write_Maessge("$User=>",commit+" " +params,"red","yellow");  //打印的对话框中
    post("http://127.0.0.1:8080/RPC",commit,params)
}

var running = 0;

function post(request_url,commit,params) {
    if(!running) {
        running=1;   //防止重复运行
        var request = new XMLHttpRequest();
        request.open('POST', request_url);
        request.setRequestHeader("Content-type", "application/json");
        var send_data = {'url': request_url, 'commit': commit, 'params': params};
        request.send(JSON.stringify(send_data));
        request.onload = function (e) {
            if (request.status === 200) {
                var result =  JSON.parse(request.response)
                if((result!=null)) {
                    if ((result["error"] != 0)) {
                        alert(result["ErrorCode"])
                    } else {
                        Write_Maessge("$Server=>", JSON.stringify(result["result"]), "blue", "gray")
                    }
                }else{
                    alert("服务器 json 解析错误")
                }
            } else {
                alert('服务器请求失败，请重试！');
            }
        }
    }
    running = 0
}

