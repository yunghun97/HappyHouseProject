<template>
  <div>
    <section>
      <div>
        <b-carousel
          id="carousel-1"
          :interval="3000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="400"
          style="text-shadow: 1px 1px 2px #333"
        >
          <b-carousel-slide
            caption="HappyHouse"
            text="HappyHouse를 통해 다양한 정보를 얻어 가요!"
            img-src="https://technext.github.io/homeland/images/hero_bg_1.jpg"
            img-alt="image"
            style="width: 100%; height: 800px"
          ></b-carousel-slide>

          <b-carousel-slide
            text="아파트매매정보를 통해 알고 싶은 정보를 검색하세요!"
            img-src="https://images.squarespace-cdn.com/content/v1/5601f71ce4b0948fe5a4fcb0/1618855915041-D1IYMI2YY7EW7M2WAZ3D/GetMedia.jpg?format=1500w"
            img-alt="image"
            style="width: 100%; height: 800px"
          >
          </b-carousel-slide>

          <b-carousel-slide
            text="자유롭게 이야기를 하고 싶다면 Board를 이용해주세요!"
            img-src="http://www.plafam.eu/wp-content/uploads/2020/07/Rectangle-23-1-1.png"
            img-alt="image"
            style="width: 100%; height: 800px"
          ></b-carousel-slide>

          <b-carousel-slide
            text="궁금한 점이 있다면 QnA를 이용해주세요!"
            img-src="https://www.lodgify.com/blog/wp-content/uploads/2020/08/Que-son-los-alquileres-a-medio-plazo.jpg"
            img-alt="image"
            style="width: 100%; height: 800px"
          >
          </b-carousel-slide>

          <b-carousel-slide
            text="궁금한 점이 있다면 QnA를 이용해주세요!"
            img-src="https://thumbs.rynekpierwotny.pl/2fafa89d:9MK17-ymUoZdMRp4EuC_cNttrrw/1160x638/filters:upscale():format(jpg)/articles/gallery/image/445/ee0a71.jpg"
            img-alt="image"
            style="width: 100%; height: 800px"
          >
          </b-carousel-slide>
        </b-carousel>
      </div>
    </section>
    <!-- 뉴스 -->
    <section id="newsSection">
      <h3 id="newsHeader">부동산 최신 뉴스</h3>
      <b-card-group deck>
        <b-card
          v-for="(value, index) in news"
          :key="index"
          :title="value.title"
          :img-src="value.imgLink"
          img-alt="Image"
          img-top
          img-height="150rem"
          class="mb-2 card"
        >
          <b-card-text>
            {{ value.content }}
          </b-card-text>

          <b-button
            class="newsBtn"
            :href="value.link"
            target="_blank"
            variant="primary"
            >기사보러가기</b-button
          >
        </b-card>
      </b-card-group>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";
export default {
  name: "Main",
  data() {
    return {
      fields: ["title"],
      news: [],
      imgLink: null,
    };
  },

  mounted() {
    axios.get("http://localhost:9999/happyhouse/news/list").then((response) => {
      const $ = cheerio.load(response.data); // html 코드 뽑기
      this.news = []; // news 배열 초기화
      const result = $(
        ".list_partnews > li > .cont > .tit > .link_txt"
      ).toArray();
      const content = $(
        ".list_partnews > li > .cont > .article > .link_txt"
      ).toArray();
      for (let i = 0; i < 5; i++) {
        // 5개만
        let url = "https://realestate.daum.net" + $(result[i]).attr("href");
        let imgLink = "";
        axios
          .post("http://localhost:9999/happyhouse/news/img", null, {
            params: {
              url: url,
            },
          }) // 이미지 링크 가져오기
          .then((response2) => {
            const $2 = cheerio.load(response2.data);
            imgLink = $2(
              "#bMain > #mCenter > .wrap_content > .wrap_newsbody > #dmcfContents > section > figure > img"
            ).attr("src");
            let link = {
              link: "https://realestate.daum.net" + $(result[i]).attr("href"),
              title: $(result[i]).text(),
              imgLink: imgLink,
              content: $(content[i]).text(),
            };
            this.news.push(link); // 넣어주기
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  },
};
</script>

<style scoped>
#mainSection {
  height: 99vh;
  /* background-image: url("../assets/mainImg.jpg"), */
  background-image: url("../assets/mainImg.jpg");
  background-size: cover;
}
#imgSection {
  display: inline-block;
}
#noticeSection {
  display: inline-block;
}
#newsSection {
  position: relative;
  /* margin-top: 10px; */
  padding: 30px;
}
b-card-group {
  background-color: antiquewhite;
  opacity: 0;
}
b-card {
  opacity: 0;
}
#newsHeader {
  text-align: center;
  margin: 50px;
}
.newsBtn {
  position: absolute;
  bottom: 0px;
  background-color: #00c89e;
  border: 1px solid white;
  right: 20px;
}
</style>
