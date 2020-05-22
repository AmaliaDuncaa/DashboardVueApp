<template>
  <div class="chat continer">
    <div id="card" class="card mesage-card">
      <div class="card-header msg_head">
        <div class="d-flex bd-highlight">
          <div class="img_cont">
            <img src="../../static/customer-service.png" class="rounded-circle user_img">
            <span class="online_icon"></span>
          </div>
          <div class="user_info">
            <span>Custemer Service</span>
            <p>{{messages.length}} Messages</p>
          </div>
          <div class="video_cam">
            <span>
              <i class="fas fa-video"></i>
            </span>
            <span>
              <i class="fas fa-phone"></i>
            </span>
          </div>
        </div>
        <span id="action_menu_btn">
          <i class="fas fa-ellipsis-v"></i>
        </span>
      </div>
      <!--first Message-->
      <div class="card-body msg_card_body" v-chat-scroll>
        <div
          class="d-flex justify-content-start mb-4 mess-cont"
          v-for="message in messages"
          :key="message.id"
        >
          <div class="img_cont_msg">
            <img src="../../static/customer-service.png" class="rounded-circle user_img_msg">
            <span class="user">{{ message.name }}</span>
          </div>
          <div class="msg_cotainer">
            {{ message.content }}
            <span class="msg_time">{{ message.timestamp }}</span>
          </div>
        </div>
        <!--end-->
        <div class="d-flex justify-content-end mb-4" v-for="mym in mymessages" :key="mym.id">
          <div class="msg_cotainer_send">
            {{ mym.content }}
            <span class="msg_time">{{ mym.timestamp }}</span>
          </div>
          <div class="img_cont_msg">
            <img src="../../static/cat-meam.jpeg" class="rounded-circle user_img_msg">
            <span class="user">{{ mym.name }}</span>
          </div>
        </div>
        <!--ehere-->
      </div>

      <NewMessage :name="name"></NewMessage>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import NewMessage from "@/components/NewMessage";
import moment from "moment";

export default {
  name: "Chat",
  // props: ["name", "avatarPic"],
  components: {
    NewMessage
  },
  data() {
    return {
      messages: [],
      mymessages: [],
      name: null
    };
  },
  methods: {
    // passName(name) {
    //   console.log(name);
    //   this.name = name;
    // },
  },
  created() {
    this.name = this.$route.params.id;

    let ref = db
      .firestore()
      .collection("messages")
      .orderBy("timestamp");

    // subscribe to changes to the 'messages' collection
    ref.onSnapshot(snapshot => {
      console.log(snapshot.docChanges());
      snapshot.docChanges().forEach(change => {
        console.log(change);
        if (change.type == "added") {
          let doc = change.doc;
          if (doc.data().name == this.name) {
            this.mymessages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: moment(doc.data().timestamp).format("lll")
            });
          } else {
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: moment(doc.data().timestamp).format("lll")
            });
          }
        }
      });
    });
  }
};
</script>
<style scooped>
/* #card {
  margin-left: 0px;
} */
.mess-cont {
  margin-bottom: 1.7rem !important;
}
.continer {
  position: absolute;
  top: 100px;
  left: 500px;
  padding: 20px;
}

/* .chat {
  margin-top: auto;
  margin-bottom: auto;
} */
.mesage-card {
  height: 500px;
  border-radius: 15px !important;
  /* background-color: rgba(20, 33, 61, 0.5); */
  min-width: 27em;
  /* min-width: em; */
}
.contacts_body {
  padding: 0.75rem 0 !important;
  overflow-y: auto;
  white-space: nowrap;
}
.msg_card_body {
  overflow-y: auto;
}
.card-header {
  border-radius: 15px 15px 0 0 !important;
  border-bottom: 0 !important;
  background-color: black;
}
.card-footer {
  border-radius: 0 0 15px 15px !important;
  border-top: 0 !important;
}
.container {
  align-content: center;
}
/* type message */
.search:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.type_msg {
  /* background-color: rgba(0, 0, 0, 0.3) !important; */
  border: 0 !important;
  /* color: white !important; */
  height: 60px !important;
  overflow-y: auto;
}
.type_msg:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.attach_btn {
  border-radius: 15px 0 0 15px !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.send_btn {
  border-radius: 0 15px 15px 0 !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}

.user_img {
  height: 70px;
  width: 70px;
  border: 1.5px solid #f5f6fa;
}
.user_img_msg {
  height: 40px;
  width: 40px;
  border: 1.5px solid #f5f6fa;
}
.img_cont {
  position: relative;
  height: 70px;
  width: 70px;
}
.img_cont_msg {
  height: 40px;
  width: 40px;
}
.online_icon {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #4cd137;
  border-radius: 50%;
  bottom: 0.2em;
  right: 0.4em;
  border: 1.5px solid white;
}

.user_info {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 15px;
}
.user_info span {
  font-size: 20px;
  color: white;
}
.user_info p {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
}
.video_cam {
  margin-left: 50px;
  margin-top: 5px;
}
.video_cam span {
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
.msg_cotainer {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 25px;
  background-color: lightgrey;
  padding: 10px;
  position: relative;
  min-width: 7em;
}
.msg_cotainer_send {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 25px;
  background-color: #78e08f;
  padding: 10px;
  position: relative;
  min-width: 7em;
}
.msg_time {
  position: absolute;
  left: 1em;
  bottom: -15px;
  color: rgba(0, 0, 0, 0.434);
  font-size: 5px;
  margin-top: 10px;
}
.user {
  /* position: absolute; */
  /* right: 0; */
  /* bottom: 0px; */
  top: 0px;
  display: inline-block;
  margin-right: 1em;
  color: rgba(0, 0, 0, 0.742);
  font-size: 10px;
}
.msg_time_send {
  position: absolute;
  right: 0;
  bottom: -15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}
.msg_head {
  position: relative;
}
#action_menu_btn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  font-size: 20px;
}

@media (max-width: 576px) {
  .contacts_card {
    margin-bottom: 15px !important;
  }
}
</style>

