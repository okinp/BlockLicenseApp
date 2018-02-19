<template>
  <div class="header">
    <div class="header-content">
      <div class="logo">
        <img src="../../assets/logo.png">
      </div>
      <div class="navbuttons">
        <ul>
          <li>
            <router-link :to="{ name: 'index' }">
              <i class="fa fa-file-o"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'transfer' }">
              <i class="fa fa-exchange"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'settings' }">
              <i class="fa fa-cog"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "header-nav",
}
</script>
<style lang="scss" scoped>
.header {
  height: 70px;
  width: 100%;
  padding: 0 24px;
  background: linear-gradient(to right, #301F66 , #316ECF);
  .header-content {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    .logo {
      width: 40%;
      img {
        height: 100%;
        width: auto;
        box-sizing: border-box;
        padding: 12px 0;
      }
    }
    .navbuttons{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      ul {
        list-style: none;
        li {
          display: inline-block;
          a {
            height: 44px;
            display: block;
            i.fa {
              font-size: 21px;
              color: rgba(255, 255, 255, 0.5);
              box-sizing: border-box;
              height: 44px;
              padding: 10px;
            }
            &.router-link-exact-active {
              border-bottom: 5px solid #fff;
              i.fa {
                color: white;
              }
            }
          }
        }
      }
    }
  }
}
</style>