new Vue({
    el: '#app',
    data() {
        return {
            id: "-1",
            lineUp: "-1",
            maps: []
        }
    },
    methods: {
        async setMaps(){
            var self = this;
            let res = undefined;
            fetch("https://valorant-api.com/v1/maps")
            .then(response => response.json())
            .then(data => res = data)
            .then(function() {
                console.log(res);
                let count = 0;
                for (let item in res['data']) {
                    if (res['data'][item]['uuid'] !== "ee613ee9-28b7-4beb-9666-08db13bb2244"){
                        let map = res['data'][item];
                        map['ID'] = count;
                        self.maps.push(map);
                        console.log(count);
                        count += 1;
                    }
                }
                console.log(self.maps);
            });
        },  
        getParams(params) {
            var params = {};
            var prmarr = window.location.search.replace('?', '').split("&");
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        },
    },
    created(){
        var self = this; 
        let params = self.getParams(document.location.search);   
        if (self.getParams(document.location.search)['id'] !== undefined){
            self.id = params['id'];
        }
        self.setMaps();
   }
})