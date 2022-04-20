import { useStore } from '@/store';
import { Icon, Tabbar, TabbarItem } from 'vant';
import { defineComponent, ref, watchEffect } from 'vue';
export default defineComponent({
  name: 'CTabbar',
  setup() {
    const tokenRef = ref('');
    const store = useStore();

    watchEffect(() => {
      tokenRef.value = store.state.user.token;
    });
    return () => (
      <Tabbar route safeAreaInsetBottom fixed={false}>
        <TabbarItem to={{ name: 'Home' }} icon="wap-home-o">
          首页
        </TabbarItem>
        <TabbarItem to={{ name: 'ResourceList' }} icon="records">
          待办
        </TabbarItem>
        <TabbarItem to={{ name: 'myApplyList' }} icon="completed">
          我的申请
        </TabbarItem>
        <TabbarItem
          to={tokenRef.value ? { name: 'My' } : { name: 'Login' }}
          icon="user-o"
        >
          我的
        </TabbarItem>
      </Tabbar>
    );
  }
});
