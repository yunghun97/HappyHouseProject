<template>
  <div class="nav_container">
    <nav class="navigation">
      <ul class="menu">
        <li class="menu__item">
          <router-link :to="{ name: 'Main' }" class="menu__link" id="mainImg">
            <span class="menu__title">
              <img
                src="../../assets/logo.png"
                alt="logo"
                style="height: 60px"
              />
            </span>
          </router-link>
        </li>
        <li class="menu__item">
          <router-link :to="{ name: 'House' }" class="menu__link">
            <span class="menu__title">
              <span class="menu__first-word" data-hover="아파트"> 아파트 </span>
              <span class="menu__second-word" data-hover="매매정보">
                매매정보
              </span>
            </span>
          </router-link>
        </li>

        <li class="menu__item">
          <router-link :to="{name: 'Calculator'}" class="menu__link">
            <span class="menu__title">
              <span class="menu__first-word" data-hover="Finance"> Finance </span>
              <span class="menu__second-word" data-hover="Calculator">
                Calculator
              </span>
            </span>
          </router-link>
        </li>

        <li class="menu__item">
          <router-link :to="{ name: 'Notice' }" class="menu__link">
            <span class="menu__title">
              <span class="menu__first-word" data-hover="Not"> Not </span>
              <span class="menu__second-word" data-hover="ice"> ice </span>
            </span>
          </router-link>
        </li>

        <li class="menu__item">
          <router-link :to="{ name: 'Board' }" class="menu__link">
            <span class="menu__title">
              <span class="menu__first-word" data-hover="Bo"> Bo</span>
              <span class="menu__second-word" data-hover="ard"> ard </span>
            </span>
          </router-link>
        </li>

        <li class="menu__item">
          <router-link :to="{ name: 'QnA' }" class="menu__link">
            <span class="menu__title">
              <span class="menu__first-word" data-hover="Qn"> Qn </span>
              <span class="menu__second-word" data-hover="A"> A </span>
            </span>
          </router-link>
        </li>
        <li class="menu__item" v-if="userInfo">
          <div class="btn-group">
            
            <b-dropdown style="margin-top: 10px;" variant="outline-info" right :text="userInfo.name+`님`">
              <b-dropdown-item @click="checkUser">MyPage</b-dropdown-item>
              <b-dropdown-item @click.prevent="onClickLogout">Sign Out</b-dropdown-item>
            </b-dropdown>
            <!-- <span class="menu__title" data-toggle="dropdown">
              <button
                type="button"
                class="btn menu__title"                
              >
                <b-avatar variant="light"></b-avatar>
                {{ userInfo.name }}
              </button>
            </span>
            <div class="dropdown-menu">
              <b-dropdown-item @click="checkUser">MyPage</b-dropdown-item>
              <b-dropdown-item @click.prevent="onClickLogout">Sign Out</b-dropdown-item>
            </div> -->
          </div>
        </li>
        <li class="menu__item" id="login" v-else>
          <router-link :to="{ name: 'Login' }" class="menu__link">
            <b-button variant="outline-success">Sign In</b-button>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const userStore = "userStore";

export default {
  name: "Header",
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Main" });
    },
    checkUser() {
      if (this.userInfo.userid == "admin") {
        this.$router.push({ name: "AdminPage" });
      } else {
        this.$router.push({ name: "MyPage" });
      }
    },
  },
};
</script>

<style scoped>
/* body {
  display: flex;
  align-items: center;
  height: 100vh;
  background: #fefefe;
} */

.btn-group:hover .dropdown-menu {
  display: block;
}

router-link {
  outline: 0;
  text-decoration: none;
}

.nav_container {
  margin-bottom: 20px;
}

.navigation {
  width: 100%;
  height: 100px;
  /* border-bottom: 3px solid #ccd7d7; */
  font-family: "Pathway Gothic One", sans-serif;
  font-size: 22px;
  padding: 30px;
  background-color: white;
}

.menu {
  display: flex;
  justify-content: center;
  max-width: 1150px;
  margin: 0 auto;
  padding-left: 0;
}

.menu__item {
  display: inline-block;
  white-space: nowrap;
}
/* @media screen and (max-width: 480px) {
  .menu__item:nth-child(n+3) {
@media screen and (max-width: 480px) {
  .menu__item:nth-child(n + 3) {
    display: none;
  }
  .menu__item:nth-child(2) .menu__link {
    border-right: 0;
  }
}
@media screen and (max-width: 768px) {
  .menu__item:nth-child(n + 4) {
    display: none;
  }
  .menu__item:nth-child(3) .menu__link {
    border-right: 0;
  }
}
@media screen and (max-width: 992px) {
  .menu__item:nth-child(n + 5) {
    display: none;
  }
  .menu__item:nth-child(4) .menu__link {
    border-right: 0;
  }
}
.menu__item:last-child .menu__link {
  border-right: 0;
} */

.menu__link {
  display: block;
  padding: 6px 30px 3px;
  /* border-right: 2px dotted #ccd7d7; */
}
.menu__link:hover .menu__first-word,
.menu__link:focus .menu__first-word {
  transform: translate3d(0, -105%, 0);
}
.menu__link:hover .menu__second-word,
.menu__link:focus .menu__second-word {
  transform: translate3d(0, 105%, 0);
}
@media screen and (min-width: 768px) {
  .menu__link {
    padding: 6px 40px 3px;
  }
}

.menu__title {
  display: inline-block;
  overflow: hidden;
  font-size: 17pt;
  font-weight: bold;
}

.menu__first-word,
.menu__second-word {
  display: inline-block;
  position: relative;
  transition: transform 0.3s;
}
.menu__first-word::before,
.menu__second-word::before {
  position: absolute;
  content: attr(data-hover);
}

.menu__first-word {
  color: #28282b;
}
.menu__first-word::before {
  top: 105%;
  color: #00c89e;
}

.menu__second-word {
  color: #00c89e;
}
.menu__second-word::before {
  bottom: 105%;
  color: #28282b;
}
</style>
