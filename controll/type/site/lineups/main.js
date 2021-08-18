new Vue({
    el: '#app',
    data() {
        return {
            id: "-1",
            lineUp: "-1",
            maps: [],
            mapSelected: "-1",
            typeSelected: "-1",
            siteSelected: "-1",
        }
    },
    methods: {
        getParams(params) {
            var params = {};
            var prmarr = window.location.search.replace('?', '').split("&");
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        },
        getLineups(){
            var self = this;
            let data = new FormData();
            let xhr = new XMLHttpRequest();
            data.append("map", this.mapSelected);
            data.append("type", this.typeSelected);
            data.append("site", this.siteSelected);
            xhr.open("POST", "../../../../api/getLineups.php");
            xhr.send(data);
            xhr.onreadystatechange = function(e) {
                if (this.readyState === 4 && this.status === 200) {
                    let response = this.response;
                    for (let item in JSON.parse(response)) {
                        console.log(JSON.parse(JSON.parse(response)[item]))
                        self.maps.push(JSON.parse(JSON.parse(response)[item]));
                    }
                }   
            }
        },
        select(id){
            let data = new FormData();
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "../../../../api/setPage.php");
            data.append("userId", this.id);
            data.append("lineUp", id);
            xhr.send(data);
            alert("Selected");
        }
    },
    created(){
        var self = this; 
        let params = self.getParams(document.location.search);   
        if (self.getParams(document.location.search)['id'] !== undefined){
            self.id = params['id'];
            self.mapSelected = params['map']
            self.typeSelected = params['type']
            self.siteSelected = params['site']
        }
        self.getLineups();
   }
})