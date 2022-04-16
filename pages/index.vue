<template>
  <section class="section">
    <b-field>
      <b-input
        @keyup.native.enter="generateScreenshot"
        placeholder="https://github.com/flowko..."
        type="url"
        v-model="params.url"
        expanded
      ></b-input>
      <p class="control">
        <b-button
          @click="generateScreenshot"
          icon-left="camera"
          type="is-danger"
          class="button is-danger"
          :disabled="loading || !params.url"
          >SHOT</b-button
        >
      </p>
    </b-field>

    <div class="columns">
      <div class="column is-5">
        <div class="box bg-blueGray-900">
          <p class="title is-5">⚛️ Browser options</p>

          <b-field>
            <b-switch v-model="params.fullPage" type="is-danger">
              FullSize
            </b-switch>
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  <b>✅ Unchecked:</b> Crop the screenshot to the viewport size
                  <br />
                  <b>❌ Checked:</b> Takes screenshot of the entire page
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </b-field>
          <b-field>
            <b-switch v-model="params.darkMode" type="is-danger">
              DarkMode
            </b-switch>
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  <b>✅ Unchecked:</b> Light mode
                  <br />
                  <b>❌ Checked:</b> Dark mode
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </b-field>

          <b-field v-if="!$config.runningHeroku">
            <b-switch v-model="params.save" type="is-danger">
              Save to server
            </b-switch>
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  <b>✅ Unchecked:</b> Doesn't save to server
                  <br />
                  <b>❌ Checked:</b> Save to server
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </b-field>

          <b-field label="Resolutions:">
            <template #label>
              Resolutions:
              <b-tooltip type="is-success is-light" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Resolution in which the screenshot will be<br />
                    taken in. [width x height] format.
                  </div>
                </template>
                <b-icon
                  type="is-white"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </template>
            <b-select
              v-model="params.size"
              expanded
              placeholder="Select a character"
            >
              <optgroup
                v-for="(res, index) in resolutions"
                :key="index"
                :label="res.label"
              >
                <option
                  :value="resolution"
                  v-for="(resolution, index2) in res.resolutions"
                  :key="index2"
                >
                  {{ resolution }}
                </option>
              </optgroup>
            </b-select>
          </b-field>

          <div class="mt-4 columns">
            <label class="label column"
              >Delay in seconds:
              <b-tooltip type="is-success is-light" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Delay capturing the screenshot.<br />
                    Useful when the site does things after<br />
                    load that you want to capture.
                  </div>
                </template>
                <b-icon
                  type="is-white"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon> </b-tooltip
            ></label>
            <b-input
              class="column is-4"
              rounded
              type="number"
              min="1"
              max="15"
              v-model="params.delay"
            ></b-input>
          </div>

          <label class="label"
            >Width:
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">Width of the screenshot in pixels.</div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </label>
          <div class="columns">
            <div class="column">
              <b-field>
                <b-slider
                  type="is-danger"
                  v-model="params.width"
                  :max="8000"
                  :min="240"
                  lazy
                  size="is-medium"
                ></b-slider>
              </b-field>
            </div>
            <b-input
              class="column is-4"
              rounded
              v-model="params.width"
            ></b-input>
          </div>

          <label class="label"
            >Height:
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">Height of the screenshot in pixels.</div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </label>
          <div class="columns">
            <div class="column">
              <b-field>
                <b-slider
                  type="is-danger"
                  v-model="params.height"
                  :max="8000"
                  :min="240"
                  lazy
                  size="is-medium"
                ></b-slider>
              </b-field>
            </div>
            <b-input
              class="column is-4"
              rounded
              v-model="params.height"
            ></b-input>
          </div>

          <label class="label"
            >Browser size:

            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Size of the browser window in pixels. [width x height]
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </label>
          <p class="text-lg font-semibold text-center text-white">
            {{ params.width }} x {{ params.height }} px
          </p>

          <p class="mt-4 title is-5">⚙️ Image options</p>

          <b-field label="Format:">
            <template #label>
              Format:
              <b-tooltip type="is-success is-light" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Format of the screenshot (PNG | JPEG | WEBP).<br />
                    (default: PNG)
                  </div>
                </template>
                <b-icon
                  type="is-white"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </template>
            <b-select
              expanded
              placeholder="Select a format"
              v-model="params.format"
            >
              <option
                v-for="option in imageFormats"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>

          <label class="label"
            >Scale:
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Scale of the screenshot. [10% - 100%]<br />
                  (default: 100%).
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </label>
          <div class="columns">
            <div class="column">
              <b-field>
                <b-slider
                  type="is-danger"
                  v-model="params.scale"
                  :max="100"
                  :min="10"
                  size="is-medium"
                ></b-slider>
              </b-field>
            </div>
            <b-input
              class="column is-4"
              rounded
              v-model="params.scale"
            ></b-input>
          </div>

          <label class="label"
            >image size:
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Size of the image in pixels. [width x height]<br />
                  (default: original size)
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon> </b-tooltip
          ></label>
          <p class="text-lg font-semibold text-center text-white">
            {{ (params.scale * params.width) / 100 }} x
            {{ (params.scale * params.height) / 100 }} px
          </p>
        </div>
      </div>
      <div class="column" style="height: 910px">
        <div class="h-full overflow-y-auto box bg-blueGray-900">
          <p class="title is-5">Website Screenshot</p>
          <div v-if="!result" class="mb-3">
            <p class="title is-4">Capture a website screenshot online</p>
            <p class="mt-4 text-white subtitle is-6">
              Generate a full web-page screenshot with our service Site-Shot:
              Web page screenshot service, that provides rich interface to make
              any kind of web screenshots online for free with no limits. The
              simplest way to take a full page screenshot, we support a long
              pages up to 20000 pixels
            </p>
          </div>
          <b-progress v-if="loading" type="is-danger"></b-progress>

          <img
            class="cursor-pointer"
            v-if="result && !loading"
            :src="result.image"
            :alt="result.filename"
            @click="openImage(result)"
          />
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="box bg-blueGray-900">
          <label class="label column"
            >Script:
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Loads the script in the browser before taking<br />
                  screenshot of the page content, (Note: if the<br />
                  script doesnt do anything, add some delay)
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon> </b-tooltip
          ></label>
          <CodeEditor
            :wrap_code="true"
            max_width="auto"
            width="auto"
            :copy_code="false"
            v-model="params.script"
            height="250px"
          ></CodeEditor>
        </div>
      </div>
      <div class="column">
        <div class="box bg-blueGray-900">
          <label class="label column"
            >Style:
            <b-tooltip type="is-success is-light" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Loads the style in the browser before taking<br />
                  screenshot of the page content, (Note: if the<br />
                  style doesnt do anything, add some delay)
                </div>
              </template>
              <b-icon
                type="is-white"
                icon="information-outline"
                size="is-small"
              >
              </b-icon> </b-tooltip
          ></label>
          <CodeEditor
            :languages="[['css', 'CSS']]"
            :wrap_code="true"
            max_width="auto"
            width="auto"
            :copy_code="false"
            v-model="params.style"
            height="250px"
          ></CodeEditor>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CodeEditor from "simple-code-editor";

export default {
  name: "IndexPage",
  components: {
    CodeEditor,
  },
  data() {
    return {
      params: {
        url: "https://noted.lol/self-hosted-weekly-roundup-2/",
        size: "1920x1080",
        fullPage: true,
        darkMode: false,
        format: "png",
        delay: 1,
        width: 1920,
        height: 1080,
        scale: 100,
        save: false,
        script: `//console.log('hello world');`,
        style: `/* .test {
          color: #000;
        } */`,
      },
      imageFormats: ["png", "jpeg", "webp"],
      result: null,
      loading: false,
      resolutions: [
        {
          label: "Large",
          resolutions: ["1920x1080", "1600x1200", "1440x1080", "1280x1024"],
        },
        {
          label: "Desktop",
          resolutions: [
            "1280x1280",
            "1024x1024",
            "800x800",
            "640x640",
            "512x512",
            "400x400",
            "320x320",
            "240x240",
          ],
        },
        {
          label: "Tablet",
          resolutions: ["1024x768", "800x600", "768x1024", "600x800"],
        },
        {
          label: "Mobile",
          resolutions: ["320x480", "480x320", "320x320", "480x480"],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    async generateScreenshot() {
      if (!this.loading && this.params.url !== null) {
        this.loading = true;
        this.result = null;

        await this.$axios
          .$post("/api/screenshot", {
            ...this.params,
            scale: this.params.scale / 100,
            size: [this.params.size],
          })
          .then((response) => {
            this.result = response;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }
    },
    openImage(result) {
      if (result) {
        let w = window.open("about:blank");
        let image = new Image();
        image.src = result.image;
        setTimeout(function () {
          w.document.write(image.outerHTML);
        }, 0);
      }
    },
  },
  watch: {
    "params.size"() {
      this.params.width = parseInt(this.params.size.split("x")[0]);
      this.params.height = parseInt(this.params.size.split("x")[1]);
    },
    "params.width"() {
      this.params.size = `${this.params.width}x${this.params.height}`;
    },
    "params.height"() {
      this.params.size = `${this.params.width}x${this.params.height}`;
    },
  },
};
</script>
