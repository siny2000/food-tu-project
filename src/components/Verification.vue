<template>
  <div id="wrapper">
  <div id="dialog">
    <h3>Please enter verification code <br> we sent via email:</h3>
    <!--กรอบสีเหลี่ยมมี6ช่อง-->
    <div id="form">
      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
      <button class="btn btn-primary btn-embossed">Verify</button>
    </div>
    
    <div id = "msg">
      Didn't receive the code?<br />
      <a href="#">Send code again</a><br />
      <a href="#">Change phone number</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'Verification'
}
</script>

<style scoped>
#wrapper {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: #333;  
}
#dialog {
    border: solid 1px #ccc;
    margin: 10px auto;
    padding: 20px 30px;
    display: inline-block;
    box-shadow: 0 0 4px #ccc;
    background-color: #FAF8F8;
    overflow: hidden;
    position: relative;
    max-width: 450px;
}

h3 {
    font-size: 20px;
    margin: 0 0 10px;
    padding: 0;
    line-height: 1.25;
    }

#form {
      max-width: 240px;
      max-height: 200px;
      margin: 15px auto 0;
}

input {
        margin: 0 5px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        border: solid 1px #ccc;
        box-shadow: 0 0 5px #ccc inset;
        outline: none;
        width: 10%;
        transition: all .2s ease-in-out;
        border-radius: 3px;
}
:focus {
          border-color: rgb(240, 169, 240);
          box-shadow: 0 0 5px rgb(212, 103, 127) inset;
        }
::selection {
          background: transparent;
        }
button {
        margin:  10px 0 50px;
        width: 50%;
        padding: 10px;
        background-color: #b1b9ff;
        border: none;
        text-transform: uppercase;
      }

#msg{
    font-size: 15px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
   
}
</style>