new Vue({
    el: '#app',
    data() {
        return {
            id: "-1",
            lineUp: "-1",
            maps: [
                {
                    "name":"Poisen Cloud",
                    "id":"0"
                },
                {
                    "name":"Snake Bite",
                    "id":"1"
                }
            ],
            mapSelected: "-1",
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
    },
    created(){
        var self = this; 
        let params = self.getParams(document.location.search);   
        if (self.getParams(document.location.search)['id'] !== undefined){
            self.id = params['id'];
            self.mapSelected = params['map']
        }
   }
})