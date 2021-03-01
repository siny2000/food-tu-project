<template>
  <div class="store">
      <!--วางไว้ก่อนเดี๋ยวมาเขียนระบบ-ลิสต์ของออเดอร์ -->
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
img {
  border-radius: 50%;
  float: right;
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
