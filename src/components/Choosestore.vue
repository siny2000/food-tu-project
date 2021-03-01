<template>  
    <body>
        <!--search bar(เผลอทำแต่มันไม่ได้ใช้)-->
        <div class = "Choosestore">
            <h1>Food</h1>
            <div id="searchWrapper">
                <center><img src="../assets/exlogofood.png" height = 75px weight = 75px></center>
                <br>
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    placeholder="search for a food"
                />
            </div>
            <ul id="foodList"></ul>
        </div>
        
        <div class="store">
      
            <div class="image"><img src="../assets/ร้านตามสั่ง.jpg" height="150cm" width="150cm"></div>
            <div class="image"><img src="../assets/ร้านยำยูป้า.jpg" height="150cm" width= "150cmcm"></div>
            <div class="image"><img src="../assets/ร้านไข่เจียว.jpg" height="150cm" width="150cm"></div>          
            <div class="image"><img src="../assets/ร้านข้าวแกง.jpg" height="150cm" width="150cm"></div>       
            <div class="image"><img src="../assets/ก๋วยเตี๋ยวต้มยำ.jpg" height="150cm" width="150cm"></div>
        </div>
    </body> 
</template>

<script>
export default {
    name:"Choosestore"
}

</script>

<style scoped>

.store{
    width:40%; 
    float:left; 
    display:table;   
}
.show{width:50%; float:left}
    
img{ 
  max-width: 100%;
  max-height: 100%;
  border-radius: 20px;
  border-style:dotted;
  color:rgb(252, 252, 252)}

.image{
    width:100%; 
    padding: 5%;
    margin: 0 5px;
    float: left;
    text-align: center;
    line-height: 50px;
    transition: all .2s ease-in-out;
}

.image img:hover{ 
  transform: scale(1.1);
  transition: 0.5s;
}


body {
    font-family: sans-serif;
    background-color: #111d4a;
}

* {
    box-sizing: border-box;
}
h1 {
    color: #eee;
    margin-bottom: 30px;
}
.Choosestore {
    padding: 40px;
    margin: 0 auto;
    max-width: 1000px;
    text-align: center;
}

#foodList {
    padding-inline-start: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 20px;
}



#searchBar {
    width: 100%;
    height: 32px;
    border-radius: 3px;
    border: 1px solid #eaeaea;
    padding: 5px 10px;
    font-size: 12px;
}

#searchWrapper {
    position: relative;
}

#searchWrapper::after {
    content: '🔍';
    position:absolute;
    top: 100px;
    right: 15px;
}

</style>