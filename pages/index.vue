<template>
  <section class="py-20">
    <div class="flex flex-col bg-[#FAFBFB] rounded-md shadow-lg">
      <input
        class="w-full p-3 transition-all ease-linear delay-75 border-2 rounded-md outline-none  focus:outline-none focus:border-primary-200 focus:border-dashed"
        @keyup.enter="generateScreenshot"
        placeholder="https://github.com/flowko..."
        type="url"
        v-model="params.url"
      />

      <div class="flex items-center justify-center my-4 space-x-10">
        <div
          class="flex flex-col items-center justify-center w-32 h-32 text-center transition-all ease-linear delay-150 bg-gray-200 cursor-pointer  rounded-2xl hover:bg-gray-300"
          :class="{
            'border-primary-200 border-dashed border-2 shadow-md ':
              selectedType == type.value,
          }"
          @click="selectedType = type.value"
          v-for="(type, index) in types"
          :key="index"
        >
          <span class="text-xl font-bold">
            {{ type.label }}
          </span>
          <img
            :src="require(`../assets/icons/${type.icon}.svg`)"
            class="block w-8 mt-2"
          />
        </div>
      </div>

      <div class="s-grid">
        <div class="s-row">
          <div class="s-grid-item">
            <b-field label="Resolutions:">
              <template #label>
                Resolutions:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Resolution in which the screenshot will be<br />
                      taken in. [width x height] format.
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
                    icon="information-outline"
                    size="is-small"
                  >
                  </b-icon>
                </b-tooltip>
              </template>
              <b-select
                v-model="params.size"
                expanded
                placeholder="Select a resolution"
              >
                <optgroup
                  v-for="(res, index) in resolutions"
                  :key="index"
                  :label="res.label"
                >
                  <option
                    v-for="(resolution, index2) in res.resolutions"
                    :value="resolution.value"
                    :key="index2"
                  >
                    {{ resolution.value }} ({{ resolution.label }})
                  </option>
                </optgroup>
              </b-select>
            </b-field>
          </div>
          <div class="s-grid-item">
            <label class="label"
              >Width:
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Width of the screenshot in pixels.
                  </div>
                </template>
                <b-icon
                  type="is-success"
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
                    type="is-info"
                    v-model="params.width"
                    :max="8000"
                    :min="240"
                    lazy
                  ></b-slider>
                </b-field>
              </div>
              <b-input class="column is-4" v-model="params.width"></b-input>
            </div>
          </div>
          <div class="s-grid-item">
            <label class="label"
              >Height:
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Height of the screenshot in pixels.
                  </div>
                </template>
                <b-icon
                  type="is-success"
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
                    type="is-info"
                    v-model="params.height"
                    :max="8000"
                    :min="240"
                    lazy
                  ></b-slider>
                </b-field>
              </div>
              <b-input class="column is-4" v-model="params.height"></b-input>
            </div>
          </div>
        </div>
        <div class="s-row">
          <div class="s-grid-item">
            <b-field>
              <b-switch v-model="params.fullPage" type="is-info">
                FullSize
              </b-switch>
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    <b>Unchecked:</b> Crop the screenshot to the viewport size
                    <br />
                    <b>Checked:</b> Takes screenshot of the entire page
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </b-field>
          </div>
          <div class="s-grid-item">
            <b-field>
              <b-switch v-model="params.darkMode" type="is-info">
                DarkMode
              </b-switch>
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    <b>Unchecked:</b> Light mode
                    <br />
                    <b>Checked:</b> Dark mode
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </b-field>
          </div>
          <div class="s-grid-item">
            <b-field>
              <b-switch v-model="params.save" type="is-info">
                Save content
              </b-switch>
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    <b>Unchecked:</b> Doesn't save to server
                    <br />
                    <b>Checked:</b> Save to server
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </b-field>
          </div>
        </div>
        <div class="s-row">
          <div class="s-grid-item">
            <div class="flex items-center">
              <label
                >Delay in seconds:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Delay capturing the screenshot.<br />
                      Useful when the site does things after<br />
                      load that you want to capture.
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
                    icon="information-outline"
                    size="is-small"
                  >
                  </b-icon> </b-tooltip
              ></label>
              <b-input
                class="column is-4"
                type="number"
                min="1"
                max="15"
                v-model="params.delay"
              ></b-input>
            </div>
          </div>
          <div class="s-grid-item">
            <label class="label"
              >Scale:
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Scale of the screenshot. [10% - 100%]<br />
                    (default: 100%).
                  </div>
                </template>
                <b-icon
                  type="is-success"
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
                    type="is-info"
                    v-model="params.scale"
                    :max="100"
                    :min="10"
                  ></b-slider>
                </b-field>
              </div>
              <b-input
                class="column is-4"
                rounded
                v-model="params.scale"
              ></b-input>
            </div>
          </div>
          <div class="s-grid-item" v-if="selectedType == 'img'">
            <b-field label="Format:">
              <template #label>
                Format:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Format of the screenshot (PNG | JPEG | WEBP).<br />
                      (default: PNG)
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
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
                  .{{ option }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="s-grid-item" v-if="selectedType == 'pdf'">
            <b-field label="PDF Formats:">
              <template #label>
                PDF Formats:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Paper Format in which the pdf will be genrated<br />
                      based on. select Resolution for [width x height] format.
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
                    icon="information-outline"
                    size="is-small"
                  >
                  </b-icon>
                </b-tooltip>
              </template>
              <b-select
                v-model="params.pdf.format"
                expanded
                placeholder="Select a character"
              >
                <option
                  :value="format"
                  v-for="(format, index) in pdfFormats"
                  :key="index"
                >
                  {{ format }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
      </div>

      <div class="s-grid" v-if="loadStyleScript">
        <div class="col-span-6 p-4">
          <label class="label column"
            >Script:
            <b-tooltip type="is-success is-dark" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Loads the script in the browser before taking<br />
                  screenshot of the page content, (Note: if the<br />
                  script doesnt do anything, add some delay)
                </div>
              </template>
              <b-icon
                type="is-success"
                icon="information-outline"
                size="is-small"
              >
              </b-icon> </b-tooltip
          ></label>
          <client-only>
            <CodeEditor
              theme="light"
              class="border rounded-lg border-border"
              :wrap_code="true"
              max_width="auto"
              width="auto"
              :copy_code="false"
              v-model="params.script"
              height="250px"
            ></CodeEditor>
          </client-only>
        </div>
        <div class="col-span-6 p-4">
          <label class="label column"
            >Style:
            <b-tooltip type="is-success is-dark" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Loads the style in the browser before taking<br />
                  screenshot of the page content, (Note: if the<br />
                  style doesnt do anything, add some delay)
                </div>
              </template>
              <b-icon
                type="is-success"
                icon="information-outline"
                size="is-small"
              >
              </b-icon> </b-tooltip
          ></label>
          <client-only>
            <CodeEditor
              theme="light"
              class="border rounded-lg border-border"
              :languages="[['css', 'CSS']]"
              :wrap_code="true"
              max_width="auto"
              width="auto"
              :copy_code="false"
              v-model="params.style"
              height="250px"
            ></CodeEditor>
          </client-only>
        </div>
      </div>

      <div class="flex items-center justify-end m-4 space-x-4">
        <b-button
          v-if="result.url"
          icon-left="download-outline"
          @click="download"
          type="is-success is-light"
          class="border !border-lime-500 !border-dashed"
          :disabled="loading || !params.url"
          >Dowload Content</b-button
        >

        <b-button
          icon-left="palette-swatch"
          @click="loadStyleScript = !loadStyleScript"
          type="is-info is-light"
          class="border !border-primary-100"
          >Add Scripts/Styles</b-button
        >

        <b-button
          icon-left="camera-iris"
          @click="generateScreenshot"
          type="is-info"
          class="border !border-primary-100"
          :disabled="loading || !params.url"
          >Capture Screenshot</b-button
        >
      </div>

      <div class="h-full overflow-y-auto box bg-blueGray-900">
        <p class="title is-5">Website Screenshot</p>
        <div v-if="!result.url" class="mb-3">
          <p class="title is-4">Capture a website screenshot online</p>
          <p class="mt-4 text-white subtitle is-6">
            Generate a full web-page screenshot with our service Site-Shot: Web
            page screenshot service, that provides rich interface to make any
            kind of web screenshots online for free with no limits. The simplest
            way to take a full page screenshot, we support a long pages up to
            20000 pixels
          </p>
        </div>
        <b-progress v-if="loading" type="is-info"></b-progress>

        <embed
          v-if="result.url"
          :src="result.url"
          width="100%"
          style="height: 50vh"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      types: [
        {
          value: "img",
          name: "image",
          label: "Image",
          icon: "image",
        },
        {
          value: "pdf",
          name: "pdf",
          label: "PDF",
          icon: "pdf",
        },
      ],
      selectedType: "img",
      loadStyleScript: false,
      params: {
        url: "https://github.com/Flowko",
        size: "1920x1080",
        fullPage: true,
        darkMode: false,
        format: "png",
        delay: 1,
        width: 1920,
        height: 1080,
        scale: 100,
        save: false,
        pdf: {
          format: "resolution",
          landscape: false,
        },
        script: `//console.log('hello world');`,
        style: `/* .test {
          color: #000;
        } */`,
      },
      imageFormats: ["png", "jpeg", "webp"],
      pdfFile: null,
      result: {
        url: null,
        filename: null,
      },
      loading: false,
      resolutions: [
        {
          label: "Desktop",
          resolutions: [
            {
              label: "QVGA",
              value: "320x240",
            },
            {
              label: "VGA",
              value: "640x480",
            },
            {
              label: "SVGA",
              value: "800x600",
            },
            {
              label: "HD",
              value: "1280x720",
            },
            {
              label: "SXGA",
              value: "1280x1024",
            },
            {
              label: "HD+",
              value: "1600x900",
            },
            {
              label: "FHD",
              value: "1920x1080",
            },
            {
              label: "2K",
              value: "2048x1080",
            },
            {
              label: "4K UHD",
              value: "3840x2160",
            },
          ],
        },
        {
          label: "Android Devices",
          resolutions: [
            {
              label: "Galaxy S7/S7edge/S6",
              value: "320x240",
            },
            {
              label: "Galaxy S8/S8+/Note8/S9",
              value: "360x740",
            },
            {
              label: "Galaxy S10",
              value: "360x760",
            },
            {
              label: "Google Pixel, Pixel 2",
              value: "411x731",
            },
            {
              label: "Google Glass",
              value: "427x240",
            },
            {
              label: "Kindle Fire",
              value: "800x1280",
            },
          ],
        },
        {
          label: "iOS Devices",
          resolutions: [
            {
              label: "iPhone X, XS",
              value: "375x812",
            },
            {
              label: "iPhone 6+, 6s+, 7+, 8+",
              value: "414x736",
            },
            {
              label: "iPhone XR, iPhone XS Max",
              value: "414x896",
            },
            {
              label: "iPad 3, 4, Air, Air2, Pro 9.7",
              value: "768x1024",
            },
            {
              label: "iPad Pro 12.9",
              value: "1024x1366",
            },
          ],
        },
      ],
      pdfFormats: [
        "resolution",
        "A4",
        "A3",
        "A2",
        "A1",
        "A0",
        "Letter",
        "Legal",
      ],
    };
  },
  mounted() {},
  methods: {
    async generateScreenshot() {
      if (!this.loading && this.params.url !== null) {
        this.loading = true;
        this.result = {
          url: null,
          filename: null,
        };
        this.pdfFile = null;
        const selectedType = this.selectedType;
        let mimeType = "";
        const format = this.params.format;
        if (selectedType === "img") {
          mimeType = `image/${format}`;
        } else if (selectedType === "pdf") {
          mimeType = `application/pdf`;
        }

        await this.$axios
          .post(
            "/api/screenshot",
            {
              ...this.params,
              scale: this.params.scale / 100,
              size: [this.params.size],
              type: selectedType,
              mimeType,
            },
            {
              responseType: "blob",
            }
          )
          .then((response) => {
            let blob = new window.Blob([response.data], {
              type: mimeType,
            });

            let headerLine = response.headers["content-disposition"];
            let startFileNameIndex = headerLine.indexOf('"') + 1;
            let endFileNameIndex = headerLine.lastIndexOf('"');
            let filename = headerLine.substring(
              startFileNameIndex,
              endFileNameIndex
            );

            this.result.url = window.URL.createObjectURL(blob);
            this.result.filename = filename;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }
    },
    download() {
      if (this.result) {
        const link = document.createElement("a");
        link.href = this.result.url;
        link.download = this.result.filename;
        link.click();
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
