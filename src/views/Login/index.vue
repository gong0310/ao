<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
      label-width="50px"
    >
      <el-form-item>
        <div class="login-form-title">
          <h3 class="title">Login Form</h3>
        </div>
      </el-form-item>
      <el-form-item prop="username" label="账号">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        >
          <el-button slot="append" type="primary">获取验证码</el-button>
          <i
            @click="handleChangePwdIcon"
            slot="suffix"
            class="show-pwd"
            :class="
              passwordType === 'password' ? 'el-icon-lock' : 'el-icon-unlock'
            "
          />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loginLoading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/api/api";
import { CANEAL_TOCKEN_STATUS } from "@/utils/common-def";

export default {
  name: "Login",
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value != "zpgong") {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "zpgong",
        password: "12",
      },
      loginRules: {
        username: [
          { required: true, trigger: "change", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword },
        ],
      },
      loginLoading: false,
      passwordType: "password",
    };
  },
  mounted() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loginLoading = true;

          const req = {
            username: this.loginForm.username,
            password: this.loginForm.password,
          };
          let resp;

          try {
            resp = await login(req);
          } catch (error) {
            if (error.status !== CANEAL_TOCKEN_STATUS) {
              this.$message.error(error);
            }
            this.loginLoading = false;
            return;
          }
          console.log("login resp=>", resp);

          // 请求登录成功
          this.$store.commit("updateUserInfo", resp.user_info);
          this.$store.commit("updatetoken", resp.token);
          this.$router.push(this.$route.query.redirect || "/home");
          this.loginLoading = false;
        } else {
          return false;
        }
      });
    },
    handleChangePwdIcon() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .login-form-title {
      position: relative;

      .title {
        font-size: 26px;
        color: #eee;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 5px;
    top: 10px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
::v-deep .el-input__suffix {
  transition: none;
}
</style>
