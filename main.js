new Vue({
    el: '#app',
    data() {
        return {
            id: "-1",
            qrCode: "-1",
            lineUp: "-1",
            page: 0,
            maxPage: 1,
            pageRel: "",
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
        createId() {
            var self = this;
            self.id = parseInt(Math.random() * 100000000000);
            self.qrCode = "https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=https://projektejwkk.de/valorantTracker/controll?id=" + self.id;
            let xhr = new XMLHttpRequest();
            let data = new FormData();
            data.append("userId", self.id);
            xhr.open("POST", "./api/createUser.php");
            xhr.send(data);
            xhr.onreadystatechange = function(e){
                if (this.readyState === 4 && this.status === 200) {
                    document.location.search = "?id=" + self.id;
                }
            }
            
        },
        addScrollListener() {
            var self = this;
            document.addEventListener("wheel", function(e){
                if (e.deltaY > 0) {
                    self.setPage(1);
                } else {
                    self.setPage(-1);
                }
            });
        },
        setPage(page) {
            console.log("test: " + page);
            if (this.page + page <= this.maxPage && this.page + page >= 0) { 
                this.page = this.page + page;
                console.log(this.pageRel);
            }
        }
    },
    watch: {
       page: function() {
            this.pageRel = "top: -" + (100 * this.page) + "vh";
       } 
    },
    created(){
        history.scrollRestoration = 'manual';
        var self = this; 
        let params = self.getParams(document.location.search);   
        if (self.getParams(document.location.search)['id'] !== undefined){
            self.id = params['id'];
        } else {
            self.createId();
        }
        self.qrCode = "https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=https://projektejwkk.de/valorantTracker/controll?id=" + self.id;
        setInterval(function() {
            console.log("Started");
            let formData = new FormData();
            formData.append("userId", self.id);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "./api/getPage.php");
            xhr.send(formData);
            xhr.onreadystatechange = function(e) {
                if (this.readyState === 4 && this.status === 200) {
                    let response = JSON.parse(this.response);
                    console.log(response);
                    console.log(response['LineUpID']);
                    if (response['LineUpID'] !== "-1"){
                        console.log("Selected: " + response['LineUpID']);
                        self.lineUp = response['LineUpID'];
                    }else {
                        console.log("Nothing Selected");
                    }
                }
            }
        }, 1000);
        self.addScrollListener();
        self.page = 0;
        self.pageRel = "top: -" + (100 * self.page) + "vh";
    }
})