<template>
  <div class="main">
    <div class="container">
      <div class="row">
      <!--ไว้ติ้กว่าเมนูไหนมี และขอแปะไว้ก่อนเดี๋ยวมาเขียนระบบ-->
        <div class ="col-md-6">
          <h1>Menu List</h1>
          <div class="menulist">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" width ="500">Menu</th>
                  <th scope="col">Checkbox</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td><input type="checkbox" class="largecheck"></td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td><input type="checkbox" class="largecheck"></td>
                </tr>
                <tr>
                  <td>Larry</td>
                  <td><input type="checkbox" class="largecheck"></td>
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
                  <th scope="col" width ="400">Add-on</th>
                  <th scope="col">Checkbox</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Markkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</td>
                  <td><input type="checkbox" class="largecheck"></td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td><input type="checkbox" class="largecheck"></td>
                </tr>
                <tr>
                  <td>Larry</td>
                  <td><input type="checkbox" class="largecheck"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--ปุ่มกลับละก็ปุ่มยืนยัน-->
        <div class="col-md-6"><router-link to="/Store"><div class="buttons"><button type="button" class="btn btn-info" id="backbutton">BACK</button></div></router-link></div>
        <div class="col-md-6"><router-link to="/Store"><div class="buttons"><button type="button" class="btn btn-warning" id="savebutton">SAVE</button></div></router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UpdateMenu'
  }
</script>

<style scoped>
  .container{
    margin: auto;
    margin-top: 50px;
  }
  .addonlist{
    margin: 20px;
  }
  .menulist{
    margin: 20px;
  }
  .largecheck{
    width: 20px;
    height: 20px;
  }
  .buttons{
    width: 200px;
    margin: auto;
    margin-top: 100px;
  }
</style>