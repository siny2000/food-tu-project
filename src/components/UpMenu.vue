<template>
  <div class="main">
    <div class ="topnav">
      <a class="active" id="storename">Store Name</a>
      <img src="img_avatar.png" alt="Avatar">
    </div>
    <div class="container">
      <div class="row">
      <!--ไว้ติ้กว่าเมนูไหนมี และขอแปะไว้ก่อนเดี๋ยวมาเขียนระบบ-->
        <div class ="col-md-6">
          <h1>Menu List</h1>
          <div class="menulist">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Order Number</th>
                  <th scope="col">Order Name</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--ไว้ติ้กว่าของไว้เพิ่มอันไหนมี และขอแปะไว้ก่อนเดี๋ยวมาเขียนระบบ-->
        <div class ="col-md-6">
          <h1>Add-on List</h1>
          <div class="addonlist">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Order Number</th>
                  <th scope="col">Order Name</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--ปุ่มกลับละก็ปุ่มยืนยัน-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UpdateMenu'
  }
</script>

<style scoped>
  .topnav {
    overflow: hidden;
    background-color: #333;
  }

  .topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    padding: 20px 16px;
  }

  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }

  .topnav a.active {
    background-color: #4CAF50;
    color: white;
  }

  img {
    border-radius: 50%;
    float: right;
  }
  .container{
    margin: 50px;
  }
</style>