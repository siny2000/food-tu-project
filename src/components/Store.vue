<template>
  <div class="store">
      <!--แถบเมนู+โปรไฟล์ -->
      <div class ="topnav">
        <a class="active" id="storename">Store Name</a>
        <router-link to="/UpdateMenu">Update Menu</router-link>
        <img src="img_avatar.png" alt="Avatar">
      </div>
      <!--ลิสต์ของออเดอร์ -->
      <div class="listordermenu">
        <h1>Order List</h1>
        <div class="ordermenu">
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
</template>

<script>
export default {
  name: 'Store'
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
}

.listordermenu{
  float: center;
  text-align: center;
  margin: 50px 200px;
}

.ordermenu{
  margin: 50px;
}
</style>
