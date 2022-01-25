import CAvatar from '@/components/CAvatar';
import CPage from '@/components/CPage';
import CTabbar from '@/components/CTabbar';
import router from '@/router';
import { useStore } from '@/store';
import { Button, Col, Icon, Row } from 'vant';
import { computed, defineComponent, unref } from 'vue';
import styles from './my.module.less';
export default defineComponent({
  name: 'My',
  setup() {
    const store = useStore();
    const user = unref(computed(() => store.state.user.user));

    const isAuthor = () => user.role_key == 'author';

    const navigatePage = (type: string) => {
      if (type === 'follow') {
        router.push({ name: 'FollowList' });
      }
      if (type === 'msg') {
        router.push({ name: 'MsgList' });
      }
      if (type === 'profile') {
        router.push({ name: 'Profile' });
      }

      if (type === 'pwd') {
        router.push({ name: 'ModifyPwd' });
      }

      if (type === 'personalHome') {
        if (isAuthor()) {
          router.push({ name: 'PersonalHome' });
        }
      }
    };

    const userLogout = () => {
      store.dispatch({
        type: 'user/userLogout'
      });
    };

    const slots = {
      footer: () => <CTabbar />
    };

    return () => (
      <CPage v-slots={slots}>
        <div class={styles.myHeader}>
          <div
            class={`${styles.userBox} flex`}
            onClick={() => {
              navigatePage('personalHome');
            }}
          >
            <div class="flexItem">
              <CAvatar
                text={user.user_abbr}
                color={user.user_backcolor}
                size="60"
                src={user.avatar}
              />
              <span class="ml-3">{user.nick_name}</span>
            </div>
            {isAuthor() ? <Icon name="arrow" color="#fff" size="26" /> : null}
          </div>
          <Row class={styles.threePart}>
            <Col
              span="8"
              onClick={() => {
                navigatePage('follow');
              }}
            >
              <div class={styles.myCicle}>20</div>
              <div>关注</div>
            </Col>
            <Col
              span="8"
              onClick={() => {
                navigatePage('msg');
              }}
            >
              <div class={styles.myCicle}>20</div>
              <div>消息</div>
            </Col>
            <Col
              span="8"
              onClick={() => {
                navigatePage('profile');
              }}
            >
              <div class={styles.myCicle}>
                <Icon name="edit" size="20" />
              </div>
              <div>资料</div>
            </Col>
          </Row>
        </div>

        <div class="pa-4" style="margin-top: 40px">
          <div
            class={styles.modifyPwd}
            onClick={() => {
              navigatePage('pwd');
            }}
          >
            <div class="flexItem">修改密码</div>
            <Icon name="arrow" color="#ddd" />
          </div>
          <Button onClick={userLogout} plain type="default" block>
            退出登录
          </Button>
        </div>
      </CPage>
    );
  }
});
