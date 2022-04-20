import CPage from '@/components/CPage';
import router from '@/router';
import store from '@/store';
import { md5Encryption } from '@/utils';
import { ConfigProvider, Button, Field, Form, NavBar } from 'vant';
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import styles from './login.module.less';
export default defineComponent({
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const isLoadingRef = ref(false);

    const onSubmit = (values: AnyObject) => {
      const pwd = md5Encryption(values.password);
      values.password = pwd;

      store.dispatch('user/loginPassword', values).then(() => {
        router.push({ name: 'Home' });
      });
    };

    const onClickLeft = () => {
      router.push('/');
    };
    const themeVars = {
      fieldIconSize: '20px'
    };
    return () => (
      <CPage>
        <NavBar
          leftText="欢迎来到北明移动办公"
          left-arrow
          onClick-left={onClickLeft}
        ></NavBar>
        <h1 class={styles.weclome}>
          <i class="iconfont icon-weixiao"></i>
          登录
        </h1>
        <div class="pa-5">
          {/* <div class="flex mt-8" style="color:var(--van-blue)">
            <div class={`${styles.accountLogin} flexItem`}>账号登录</div>
            <RouterLink to={{ name: 'Register' }}>注册</RouterLink>
          </div> */}
          <ConfigProvider theme-vars={themeVars}>
            <Form class="mt-8" onSubmit={onSubmit}>
              <Field
                class={styles.inputText}
                rules={[{ required: true, message: '请输入用户名' }]}
                v-model={username.value}
                name="username"
                left-icon="manager"
                placeholder="请输入用户名"
                autocomplete="off"
                clearable
              />
              <Field
                class={styles.inputText}
                rules={[{ required: true, message: '请输入密码' }]}
                v-model={password.value}
                name="password"
                left-icon="lock"
                type="password"
                placeholder="请输入密码"
                autocomplete="off"
                clearable
              />
              <Button
                disabled={isLoadingRef.value}
                class="mt-6"
                type="primary"
                block
                native-type="submit"
              >
                登&nbsp;录
              </Button>
            </Form>
          </ConfigProvider>
          {/* <div class="mt-8 flex">
            <div class="flexItem"></div>
            <RouterLink to={{ name: 'ForgetPwd' }}>忘记密码？</RouterLink>
          </div> */}
        </div>
      </CPage>
    );
  }
});
